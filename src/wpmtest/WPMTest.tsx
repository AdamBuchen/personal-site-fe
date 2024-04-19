import { useEffect, useCallback, MutableRefObject, useRef, useState, useMemo } from "react";
import './WPMTest.css';

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

    const testingPromptString = `Foxes vulpis, swift and agile, dart through the underbrush with vibrant energy. In the moonlit forests, their eyes gleam with a clever spark, scanning the terrain for any sign of movement. The rustle of leaves underfoot betrays the presence of nocturnal creatures, while overhead, the canopy whispers secrets of the ancient woodland. Red coats blend into the autumnal hues, the foxes' movements harmonious with the falling leaves.`;
    let promptString = testingPromptString;

    //State
    const [currentRoundStatus, setCurrentRoundStatus] = useState(RoundStatus.Unstarted);

    const [currentRoundPrompt, setCurrentRoundPrompt] = useState(promptString);
    const [numSuccessfulEntries, setNumSuccessfulEntries] = useState(0);
    const [numFailedEntries, setNumFailedEntries] = useState(0);

    //New
    const [currentRowIdx, setCurrentRowIdx] = useState(0);
    const [currentRowCharIdx, setCurrentRowCharIdx] = useState(0);
    const [currentStatusByRowByCharIdx, setCurrentStatusByRowByCharIdx] = useState<CharacterStatus[][]>([]);
    const [currentRoundCharByRowByIdx, setCurrentRoundCharByRowByIdx] = useState<string[][]>([]);


    let promptLines = getLinesFromPrompt(promptString);
    let charStatusByRowByIdx :CharacterStatus[][] = [];

    const promptDisplayDivRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        promptDisplayDivRef.current?.focus();
    });

    // Whenever the prompt changes, we should reset everything.
    useEffect(() => {
        setCurrentRoundStatus(RoundStatus.Unstarted);
        setCurrentRowIdx(0);
        setCurrentRowCharIdx(0);

        promptLines = getLinesFromPrompt(currentRoundPrompt);
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
            currentRowIdx, currentRoundCharByRowByIdx
        ]
        );

    /**
     * When user types something, we update the input value
     */
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLDivElement>) => {
            //alert(e.target.value);
        },
        []
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
        
        if (e.key.length !== 1 || e.key == "Alt" || e.key == "Control" 
            || e.key == "CapsLock" || e.key == "Fn" || e.key == "Meta" 
            || e.key == "Shift" || e.key == 'Tab' || e.key == 'ArrowUp'
            || e.key == 'ArrowDown' || e.key == 'Enter') {
                return;
        }

        if (currentStatusByRowByCharIdx.length == 0) {
            return;
        }

        if (currentRoundStatus == RoundStatus.Unstarted) {
            setCurrentRoundStatus(RoundStatus.InProgress);
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
                setNumSuccessfulEntries(numSuccessfulEntries + 1);
                statusRequiresChanging = true;
            } else { //They failed before and are getting it right this time.
                updatedStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] = CharacterStatus.Failed;
            }
            idxRequiresChanging = true;
        } else { //Incorrect key press
            if (isFirstAttempt) {
                updatedStatusByRowByCharIdx[currentRowIdx][currentRowCharIdx] = CharacterStatus.TryAgain;
                setNumFailedEntries(numFailedEntries + 1);
                statusRequiresChanging = true;
            }
        }



        if (idxRequiresChanging) {
            let newIdx = currentRowCharIdx + 1;
            if (newIdx >= currentStatusByRowByCharIdx[currentRowIdx].length) { //The last char of the line was just entered
                let newRowIdx = currentRowIdx + 1;
                if (newRowIdx >= currentStatusByRowByCharIdx.length) { //We finished the last row
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

    return (<>

        <div className="wpm__test__container">
            {currentRoundStatus == RoundStatus.Unstarted && 
                <span className="wpm__test__prompt__instructions">
                    Begin typing the text below when ready
                </span>
            }
            <div className="wpm__test__prompt__div" tabIndex={0}
                 ref={promptDisplayDivRef}
                 id='prompt_input_div'
                 onKeyDown={handleInputKeyDown}
                 onChange={handleInputChange}
                 style={{ display: 'flex', flexWrap: 'wrap', wordWrap: 'break-word' }}
            >


            {
                currentRoundCharByRowByIdx.map((charArray, rowIdx) => {
                    const isLastItem = rowIdx === currentRoundCharByRowByIdx.length - 1;
                    const lastSpace = isLastItem ? '' : '\u00a0'; // nonbreaking space

                    return (
                        <span className="wpm__test__prompt__row__span" key={rowIdx}>
                            {charArray.map((char, charIdx) => (
                                <span className={getCssClassForCharByLineByCharIdx(rowIdx, charIdx)}
                                    key={rowIdx + "_" + charIdx}>
                                    {char}
                                </span>
                            ))}
                            {/* lastSpace */}
                        </span>
                    );
                })
            }

            </div>
        </div>
 
    </>);

}