import './terminal.css';
import {ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {TerminalProps} from "./types";

export function TerminalFullScreenHandler(e: React.KeyboardEvent<HTMLInputElement>) {
  
}

export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      history = [],
      promptLabel = '>',
      commands = {},
      inputRef = useRef<HTMLInputElement>(),
    } = props;

    const [input, setInputValue] = useState<string>('');
    const [userCommandHistory, setUserCommandHistory] = useState<string[]>([]);
    const [currentHistoryOffset, setCurrentHistoryOffset] = useState(0); // history[maxIdx - currentHistoryOffset]
    const [tabbedItemIdx, setTabbedItemIdx] = useState(0);
    const [tabbedPartialString, setTabbedPartialString] = useState<string>('');

    const commandsList = Object.keys(commands);

    /**
     * Focus on the input whenever we render the terminal or click in the terminal
     */
    useEffect(() => {
      inputRef.current?.focus();
    });

    useEffect(() => {
      if (inputRef.current) {
        const cmdLen = input.length;
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cmdLen, cmdLen);
      }
    }, [input])

    function defaultTerminalFullScreenHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        // Reset the tab index on any keypress except tab
        if (e.key !== 'Tab' && (tabbedItemIdx !== 0 || tabbedPartialString != '')) {
          setTabbedItemIdx(0);
          setTabbedPartialString('');
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          
          let newHistoryOffset = currentHistoryOffset;
          let maxHistoryIdx = userCommandHistory.length - 1;

          if (e.key === 'ArrowDown') {
            // Decrement the offset
            if (currentHistoryOffset >= 0) {
              newHistoryOffset = currentHistoryOffset - 1;
            } else {
              newHistoryOffset = 0;
            }
          } else { //ArrowUp
            // Increment the offset
            newHistoryOffset = currentHistoryOffset + 1;
          }

          if (maxHistoryIdx < 0) {
            setInputValue('');
            setCurrentHistoryOffset(newHistoryOffset);
          } else {
            let newHistoryIdx = maxHistoryIdx - newHistoryOffset;
            if (newHistoryIdx < 0) { // User is at the beginning of the list. newHistoryIdx should remain zero. The offset should be equal to maxIdx
              newHistoryOffset = maxHistoryIdx;
            } else if (newHistoryIdx > maxHistoryIdx) { // User is at the end of the list. newHistoryIdx should be equal to maxIdx.
              newHistoryOffset = 0;
            }

            setCurrentHistoryOffset(newHistoryOffset);

            // Get the last element from the history array (minus offset)
            let commandHistoryIdx = maxHistoryIdx - currentHistoryOffset;
            if (commandHistoryIdx >= 0 && commandHistoryIdx < userCommandHistory.length) {
              setInputValue(userCommandHistory[commandHistoryIdx]);
            } else if (commandHistoryIdx < 0) {
              setInputValue('');
            }
          }

        } else if (e.key === 'Tab') {
          //TODO: Make this all way less sad
          e.preventDefault();
          var possibleCommands:string[] = [];
          let partialString = '';
          if (tabbedPartialString === '') {
            partialString = input.toLowerCase().trim();
            if (partialString !== null) {
              setTabbedPartialString(partialString);
              setTabbedItemIdx(0);
            }
          } else {
            partialString = tabbedPartialString;
          }

          if (partialString.length > 0) {
            for (let i = 0; i < commandsList.length; i++) {    
              const thisCommand = commandsList[i];
              var commandMatches = true;
              if (partialString.length > thisCommand.length) {
                continue;
              }
              for (let k = 0; k < thisCommand.length; k++) {
                if (thisCommand[k] != partialString[k] && partialString[k] !== undefined) {
                  commandMatches = false;
                  break;
                }
              }
              if (commandMatches) {
                possibleCommands.push(thisCommand);
              }
            }

            // Sort: shorter commands given precedence, then alphabetically
            possibleCommands = possibleCommands.sort((a, b) => a.length - b.length || a.localeCompare(b));

            if (tabbedItemIdx >= 0 && tabbedItemIdx < possibleCommands.length) {
              setInputValue(possibleCommands[tabbedItemIdx]);
              let newTabbedItemIdx = tabbedItemIdx + 1;
              if (newTabbedItemIdx >= possibleCommands.length) {
                newTabbedItemIdx = 0;
              }

              setTabbedItemIdx(newTabbedItemIdx);
            } else {
              setTabbedItemIdx(0);
              //setTabbedPartialString("");
              if ( possibleCommands.length > 0) {
                setInputValue(possibleCommands[0]);
              } else {
                setInputValue(tabbedPartialString);
              }
            }
          }
        } else if (e.key === 'Enter') {
          const inputLC = input.toLowerCase().trim();
          const commandToExecute = commands?.[inputLC];
          if (commandToExecute) {
            commandToExecute?.();
          } else if (inputLC !== '') {
            const errCmd = commands?.['error'];
            errCmd?.();
          }
          if (inputLC !== '') {
            setUserCommandHistory([...userCommandHistory, inputLC]);
          }
          setInputValue('');
          setCurrentHistoryOffset(0);
        }
    }

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);


    /**
     * When user types something, we update the input value
     */
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );

    /**
     * When user presses enter, we execute the command
     */
    const handleInputKeyDown = useCallback(
      defaultTerminalFullScreenHandler,
      [commands, input, userCommandHistory, setUserCommandHistory, 
      currentHistoryOffset, setCurrentHistoryOffset, 
      tabbedItemIdx, setTabbedItemIdx, tabbedPartialString, setTabbedPartialString]
    );

    return (<>
      {history.map((line, index) => (
        <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
          {line}
        </div>
      ))}
      <div id='prompt_root' className="terminal__prompt">
        <div id='prompt_label' className="terminal__prompt__label">{promptLabel}</div>
        <div id='prompt_input_div' className="terminal__prompt__input">
          <input
            id='prompt_input'
            type='text'
            spellCheck='false'
            value={input}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            // @ts-ignore
            ref={inputRef}
            autoComplete='off'
          />
        </div>
      </div>
  </>);
});