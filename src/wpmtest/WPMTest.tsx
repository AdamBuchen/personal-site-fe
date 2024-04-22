import { useEffect, useCallback, MutableRefObject, useRef, useState, useMemo } from "react";
import './WPMTest.css';
import { GetShuffledPromptList, RoundResult } from "./types";

enum RoundStatus {
    Unstarted = 1,
    InProgress,
    Completed
}

enum CharacterStatus {
    Unplayed = 1,
    Selected,
    Passed,
    Failed,
    TryAgain
  }

function getLinesFromPrompt(prompt :string) :string[] {

    const maxCharsPerLine = 60;
    //const words = prompt.split(/(\s+)/).filter(word => word.length > 0);
    const words = prompt.split(' ').filter(word => word.length > 0);

    let lines :string[] = [];

    let newLine :string[] = [];
    let currLineLen = 0;
    words.forEach(function (word) {
        let wordLen = word.length;
        let newLineLen = currLineLen + wordLen + 1;           
        if (newLineLen > maxCharsPerLine) {
            lines.push(newLine.join(' ') + '\u00a0'); //Adding nbsp to the end of lines
            newLine = [word];
            currLineLen = word.length + 1;
        } else {
            newLine.push(word);
            currLineLen = currLineLen + word.length + 1;
        }
    });

    if (newLine.length > 0) {
        lines.push(newLine.join(' ') + '\u00a0');
    }

    let lastIdx = lines.length - 1;
    if (lastIdx >= 0) {
        lines[lastIdx] = lines[lastIdx].trim();
    }

    return lines;
}

export type WPMTestProps = {
    exitCommandCallback: () => void;
  };

export function WPMTest({exitCommandCallback}:WPMTestProps) {

    // const shuffledPromptList = GetShuffledPromptList();
    // let promptString = shuffledPromptList[0];

    const shuffledPromptList = GetShuffledPromptList();

    //Overall results
    const [promptList, setPromptList] = useState<string[]>(shuffledPromptList);
    const [byRoundResults, setByRoundResults] = useState<RoundResult[]>([]);
    const [inResultsScreen, setInResultsScreen] = useState(false);

    // Info about the current Round
    const [currentRoundIdx, setCurrentRoundIdx] = useState(0); //0-indexed round numbers
    const [currentRoundStatus, setCurrentRoundStatus] = useState(RoundStatus.Unstarted);
    const [currentRoundPrompt, setCurrentRoundPrompt] = useState(shuffledPromptList[0]);
    const [currentRoundPromptIdx, setCurrentRoundPromptIdx] = useState(0);

    // State for measurements
    const [numSuccessfulEntries, setNumSuccessfulEntries] = useState(0);
    const [numFailedEntries, setNumFailedEntries] = useState(0);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [roundEndTime, setRoundEndTime] = useState(0);
    const [roundDuration, setRoundDuration] = useState(0);
    const [roundWPM, setRoundWPM] = useState(0);
    const [roundAccuracyAsPercentage, setRoundAccuracyAsPercentage] = useState(0);

    // Prompt character location stuff
    const [currentRowIdx, setCurrentRowIdx] = useState(0);
    const [currentRowCharIdx, setCurrentRowCharIdx] = useState(0);
    const [currentStatusByRowByCharIdx, setCurrentStatusByRowByCharIdx] = useState<CharacterStatus[][]>([]);
    const [currentRoundCharByRowByIdx, setCurrentRoundCharByRowByIdx] = useState<string[][]>([]);

    const startTimer = () => {
        setRoundStartTime(new Date().getTime());
        setRoundEndTime(0);
    };

    const stopTimer = (logStatistics :boolean) => {
        const endTime = new Date().getTime();
        setRoundEndTime(endTime);
        if (!logStatistics) {
            return;
        }
 
        const duration = (endTime - roundStartTime) / 1000;
        setRoundDuration(duration);

        const wordsTyped = numSuccessfulEntries / 5;
        const minutes = duration / 60;
        let roundWPM = wordsTyped / minutes;
        setRoundWPM(roundWPM);

        let percentage = 0;
        let totalKeypresses = numFailedEntries + numSuccessfulEntries;
        if (totalKeypresses > 0) {
            percentage = (numSuccessfulEntries / totalKeypresses) * 100;
        }
        setRoundAccuracyAsPercentage(percentage);

        let roundResult :RoundResult = {
            duration: duration,
            numSuccessfulEntries: numSuccessfulEntries,
            numFailedEntries: numFailedEntries,
            wpm: roundWPM,
            prompt: currentRoundPrompt
        };

        setByRoundResults([...byRoundResults, roundResult]);
    };

    function roundFloat(num :number) {
        return parseFloat(num.toFixed(2));
    }

    function startNewRound() {
        //Update the round number, get the next prompt and set it.
        let newPromptIdx = currentRoundPromptIdx + 1;
        if (newPromptIdx >= promptList.length) {
            newPromptIdx = 0;
        }

        let newRoundIdx = currentRoundIdx + 1;
        setRoundStartTime(0);
        setRoundEndTime(0);
        setNumFailedEntries(0);
        setNumSuccessfulEntries(0);
        setCurrentRoundIdx(newRoundIdx);
        setCurrentRoundPromptIdx(newPromptIdx);
        setCurrentRoundPrompt(promptList[newPromptIdx]);
    }

    function restartRound() {

        if (currentRoundStatus == RoundStatus.InProgress) {
            stopTimer(false); //Stops the timer, doesn't log results
        }

        //1. Check round status - if it's finished, we should purge out the recent results first
        if (currentRoundStatus == RoundStatus.Completed) {
            if (byRoundResults.length > 0) {
                let newResults = Array.from(byRoundResults);
                newResults = newResults.slice(0, -1);
                setByRoundResults(newResults);
            }
        }

        setCurrentRoundStatus(RoundStatus.Unstarted);

        //2. Clean up everything else
        setRoundStartTime(0);
        setRoundEndTime(0);
        setNumFailedEntries(0);
        setNumSuccessfulEntries(0);
        setCurrentRowIdx(0);
        setCurrentRowCharIdx(0);

        //3. Reset our characters
        //TODO: This section is copied and pasted from the first useEffect that gets run. We should consolidate logic.
        let promptLines = getLinesFromPrompt(currentRoundPrompt);
        let charStatusByRowByIdx :CharacterStatus[][] = [];
        let charByRowByIdx :string[][] = [];

        for (let i = 0; i < promptLines.length; i++) {
            let charByIdx = Array.from(promptLines[i]); 
            let defaultCharVals = Array<CharacterStatus>(charByIdx.length).fill(CharacterStatus.Unplayed);
            charStatusByRowByIdx.push(defaultCharVals);
            charByRowByIdx.push(charByIdx);
        }

        if (charStatusByRowByIdx.length > 0 && charStatusByRowByIdx[0].length > 0) {
            charStatusByRowByIdx[0][0] = CharacterStatus.Selected;
        }

        setCurrentStatusByRowByCharIdx(charStatusByRowByIdx);
        setCurrentRoundCharByRowByIdx(charByRowByIdx);

    }

    const promptDisplayDivRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        promptDisplayDivRef.current?.focus();
    });

    const resultsFooterRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (resultsFooterRef.current) {
            setTimeout(() => {
                if (resultsFooterRef && resultsFooterRef.current) {
                    resultsFooterRef.current.scrollIntoView({ block: 'end'});
                    resultsFooterRef.current.focus();
                }
            }, 10);
        }
    });

    // Whenever the prompt changes, we should reset everything.
    useEffect(() => {
        setCurrentRoundStatus(RoundStatus.Unstarted);
        setCurrentRowIdx(0);
        setCurrentRowCharIdx(0);

        let promptLines = getLinesFromPrompt(currentRoundPrompt);
        let charStatusByRowByIdx :CharacterStatus[][] = [];
        let charByRowByIdx :string[][] = [];

        for (let i = 0; i < promptLines.length; i++) {
            let charByIdx = Array.from(promptLines[i]); 
            let defaultCharVals = Array<CharacterStatus>(charByIdx.length).fill(CharacterStatus.Unplayed);
            charStatusByRowByIdx.push(defaultCharVals);
            charByRowByIdx.push(charByIdx);
        }

        if (charStatusByRowByIdx.length > 0 && charStatusByRowByIdx[0].length > 0) {
            charStatusByRowByIdx[0][0] = CharacterStatus.Selected;
        }

        setCurrentStatusByRowByCharIdx(charStatusByRowByIdx);
        setCurrentRoundCharByRowByIdx(charByRowByIdx);

    }, [currentRoundPrompt]);

    /**
     * When user presses enter, we execute the command
     */
    const handleInputKeyDown = useCallback(
        wpmTestKeyboardHandler,
        [exitCommandCallback, currentStatusByRowByCharIdx, currentRoundStatus,
            numSuccessfulEntries, numFailedEntries, currentRowCharIdx,
            currentRowIdx, currentRoundCharByRowByIdx, setCurrentRoundStatus,
            setNumSuccessfulEntries, setNumFailedEntries, setCurrentRowIdx,
            setCurrentRowCharIdx, setCurrentStatusByRowByCharIdx, promptList,
            currentRoundPromptIdx, currentRoundIdx, setRoundStartTime, 
            setRoundEndTime, setCurrentRoundIdx, setCurrentRoundPromptIdx,
            setCurrentRoundPrompt, setRoundDuration, setRoundWPM, 
            setRoundAccuracyAsPercentage, setByRoundResults, inResultsScreen,
            setInResultsScreen
        ]
        );


    /**
     * When users click outside of the playable area, refocus.
     */
    const handlePromptDisplayBlur = useCallback(
        () => {
            promptDisplayDivRef.current?.focus();
        }, []
    );

    const handleResultsFooterBlur = useCallback(
        () => {
            resultsFooterRef.current?.focus();
        }, []
    );

    const getCssClassForCharByLineByCharIdx = useMemo(() => {
        return (lineIdx: number, charIdx: number) :string => {
        let charStatus = currentStatusByRowByCharIdx[lineIdx][charIdx];
        switch (charStatus) {
            case CharacterStatus.Selected:
                return "wpm__test__prompt__character__selected";
            case CharacterStatus.Passed:
                return "wpm__test__prompt__character__correct";
            case CharacterStatus.Failed:
                return "wpm__test__prompt__character__incorrect";
            case CharacterStatus.TryAgain:
                return "wpm__test__prompt__character__tryagain";
            default:
                return "wpm__test__prompt__character__default";
        }
    }
    }, [currentStatusByRowByCharIdx]);


    function wpmTestKeyboardHandler(e: React.KeyboardEvent<HTMLDivElement>) {
        
        e.preventDefault();

        // Bail out
        if (e.ctrlKey && e.key.toLowerCase() == 'c') {
            if (byRoundResults.length == 0) {
                exitCommandCallback();
                return;
            }
            setInResultsScreen(true);
            return;
        }

        if (e.ctrlKey && e.key == 'ArrowRight') {
            startNewRound();
            return;
        }

        if (e.ctrlKey && e.key.toLowerCase() == 'r') {
            restartRound();
            return;
        }

        if (e.key.length !== 1 || e.key == "Alt" || e.key == "Control" 
            || e.key == "CapsLock" || e.key == "Fn" || e.key == "Meta" 
            || e.key == "Shift" || e.key == 'Tab' || e.key == 'ArrowUp'
            || e.key == 'ArrowDown' || e.key == 'Enter') {
                return;
        }

        if (inResultsScreen) {
            exitCommandCallback();
            return;
        }

        if (currentRoundStatus == RoundStatus.Completed) { //Handling "Play Again? Y/N"
            if (e.key == 'Y' || e.key == 'y') {
                startNewRound();
            } else if (e.key == 'N' || e.key == 'n') {
                setInResultsScreen(true);
            } else {
                return;
            }
        }

        if (currentStatusByRowByCharIdx.length == 0) {
            return;
        }

        if (currentRoundStatus == RoundStatus.Unstarted) {
            setCurrentRoundStatus(RoundStatus.InProgress);
            startTimer();
        }

        let isFirstAttempt = (currentStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] == CharacterStatus.Unplayed
            || currentStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] == CharacterStatus.Selected)


        let correctKeyToPress = currentRoundCharByRowByIdx[currentRowIdx][currentRowCharIdx];
        if (correctKeyToPress == '\u00a0') { //Check against regular space key
            correctKeyToPress = ' ';
        }

        let updatedStatusByRowByCharIdx = currentStatusByRowByCharIdx;
        let statusRequiresChanging = false;
        let idxRequiresChanging = false;

        if (e.key == correctKeyToPress) {
            if (isFirstAttempt) {
                updatedStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] = CharacterStatus.Passed;
                statusRequiresChanging = true;
            } else { //They failed before and are getting it right this time.
                updatedStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] = CharacterStatus.Failed;
            }
            setNumSuccessfulEntries(numSuccessfulEntries + 1);
            idxRequiresChanging = true;
        } else { //Incorrect key press
            if (isFirstAttempt) {
                updatedStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] = CharacterStatus.TryAgain;
                statusRequiresChanging = true;
            }
            setNumFailedEntries(numFailedEntries + 1);
        }

        if (idxRequiresChanging) {
            let newIdx = currentRowCharIdx + 1;
            if (newIdx >= currentStatusByRowByCharIdx[currentRowIdx].length) { //The last char of the line was just entered
                let newRowIdx = currentRowIdx + 1;
                if (newRowIdx >= currentStatusByRowByCharIdx.length) { //We finished the last row
                    stopTimer(true);
                    setCurrentRoundStatus(RoundStatus.Completed);
                } else { //Progress to the next row
                    setCurrentRowIdx(newRowIdx);
                    setCurrentRowCharIdx(0);

                    //update the next char to show as ready
                    updatedStatusByRowByCharIdx[newRowIdx][0] = CharacterStatus.Selected;
                    statusRequiresChanging = true;
                }
            } else {
                setCurrentRowCharIdx(newIdx); //Progress to the next char in the line
                updatedStatusByRowByCharIdx[currentRowIdx][newIdx] = CharacterStatus.Selected;
                statusRequiresChanging = true;                
            }
        }
    
        if (statusRequiresChanging) {
            setCurrentStatusByRowByCharIdx(updatedStatusByRowByCharIdx);
        }
    
    }

    if (inResultsScreen) {
        let overallWPM = 0;
        let overallAccuracy = 0;
        let wpmSum = 0;
        let overallSuccess = 0;
        let overallFailure = 0;
        byRoundResults.map((result, roundIdx) => {
            wpmSum += result.wpm;
            overallSuccess += result.numSuccessfulEntries;
            overallFailure += result.numFailedEntries;
        });

        if (byRoundResults.length > 0) {
            overallWPM = wpmSum / byRoundResults.length;
        }

        let overallNumKeypresses = overallSuccess + overallFailure;
        if (overallNumKeypresses > 0) {
            overallAccuracy = overallSuccess / overallNumKeypresses;
        }

        return (
            <>
                <div className="wpm__results__container">
                    <span className="wpm__results__header">Results</span>
                    <div className="wpm__results__div>">
                        <table className="wpm__results__table">
                            <thead>
                                <tr>
                                    <th>
                                        Round
                                    </th>
                                    <th>
                                        Prompt
                                    </th>
                                    <th>
                                        WPM
                                    </th>
                                    <th>
                                        Accuracy
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    byRoundResults.map((roundResult, roundIdx) => {
                                        let totalNumKeypresses = roundResult.numFailedEntries + roundResult.numSuccessfulEntries;
                                        let accuracy = 0;
                                        if (totalNumKeypresses > 0) {
                                            accuracy = roundResult.numSuccessfulEntries / totalNumKeypresses;
                                        }
                                        return (
                                            <tr>
                                                <td>
                                                    {roundIdx + 1}
                                                </td>
                                                <td>
                                                    {roundResult.prompt.substring(0, 24).trim()}...
                                                </td>
                                                <td>
                                                    {roundFloat(roundResult.wpm)}
                                                </td>
                                                <td>
                                                    {roundFloat(accuracy) * 100 + '%'}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                                <tr>
                                    <td>
                                        Overall
                                    </td>
                                    <td>
                                        Summary of Results
                                    </td>
                                    <td>
                                        {roundFloat(overallWPM)}
                                    </td>
                                    <td>
                                        {roundFloat(overallAccuracy) * 100 + '%'}
                                    </td>
                                </tr>
          
                            </tbody>
                        </table>
                    </div>
                    <div 
                    className="wpm__results__instructions" 
                    ref={resultsFooterRef}
                    onKeyDown={wpmTestKeyboardHandler}
                    tabIndex={0}
                    onBlur={handleResultsFooterBlur}
                    >
                        Press any key to exit
                    </div>
                </div>
            </>
        )
    } else{

        return (<>

            <div className="wpm__test__container">
                {currentRoundStatus == RoundStatus.Unstarted && 
                    <span className="wpm__test__prompt__instructions">
                        Begin typing the text below when ready. Timer will start.
                    </span>
                }
                {currentRoundStatus == RoundStatus.InProgress && 
                    <span className="wpm__test__prompt__instructions">
                        Level in progress
                    </span>
                }
                {currentRoundStatus == RoundStatus.Completed && 
                    <span className="wpm__test__prompt__instructions">
                        Level complete
                    </span>
                }
                <div className="wpm__test__prompt__div" tabIndex={0}
                    ref={promptDisplayDivRef}
                    id='prompt_input_div'
                    onKeyDown={handleInputKeyDown}
                    onBlur={handlePromptDisplayBlur}
                    style={{ display: 'flex', flexWrap: 'wrap', wordWrap: 'break-word' }}
                >

                {
                    currentRoundCharByRowByIdx.map((charArray, rowIdx) => {
                        return (
                            <span className="wpm__test__prompt__row__span" key={rowIdx}>
                                {charArray.map((char, charIdx) => (
                                    <span className={getCssClassForCharByLineByCharIdx(rowIdx, charIdx)}
                                        key={rowIdx + "_" + charIdx}>
                                        {char}
                                    </span>
                                ))}
                            </span>
                        );
                    })
                }

                </div>
                {currentRoundStatus != RoundStatus.Completed && 
                    <span className="wpm__test__prompt__instructions">
                        [Ctrl] + [R] to restart level<br />
                        [Ctrl] + [→] to skip to next level<br />
                        [Ctrl] + [C] to quit
                    </span>
                }
                {currentRoundStatus == RoundStatus.Completed && 
                    roundWPM > 0 &&
                    <>
                        <span className="wpm__test__prompt__instructions">
                            Duration: {roundFloat(roundDuration)} seconds<br />
                            WPM: {roundFloat(roundWPM)}<br />
                            Accuracy: {roundFloat(roundAccuracyAsPercentage)}%<br />
                            <span className="wpm__test__prompt__cta">
                                Play a new level? Y/N<br />
                                [Ctrl] + [R] to replay level
                            </span>
                        </span>
                    </>
                }
            </div>
    
        </>);

    }
}