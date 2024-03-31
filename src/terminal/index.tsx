import './terminal.css';
import {ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {TerminalProps} from "./types";

export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      history = [],
      promptLabel = '>',
      commands = {},
    } = props;

    const inputRef = useRef<HTMLInputElement>();
    const [input, setInputValue] = useState<string>('');
    const [userCommandHistory, setUserCommandHistory] = useState<string[]>([]);
    const [currentHistoryOffset, setCurrentHistoryOffset] = useState(0); // history[maxIdx - currentHistoryOffset]

    const commandsList = Object.keys(commands);
    var tabbedItemIdx = 0;
    var userEnteredCommand = "";

    /**
     * Focus on the input whenever we render the terminal or click in the terminal
     */
    useEffect(() => {
      inputRef.current?.focus();
    });

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
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          // Get the last element from the history array (minus offset)
          let commandHistoryIdx = userCommandHistory.length - currentHistoryOffset - 1;
          if (commandHistoryIdx >= 0 && commandHistoryIdx < userCommandHistory.length) {
            setInputValue(userCommandHistory[commandHistoryIdx]);
          }
          
          if (e.key === 'ArrowDown') {
            // Decrement the offset
            setCurrentHistoryOffset(currentHistoryOffset - 1);
          } else {
            // Increment the offset
            setCurrentHistoryOffset(currentHistoryOffset + 1);
          }
        } else if (e.key === 'Tab') {
          e.preventDefault();
          var possibleCommands:string[] = [];
          const partialCommand = input.toLowerCase().trim();
          userEnteredCommand = partialCommand;
          if (partialCommand.length > 0) {
            for (let i = 0; i < commandsList.length; i++) {    
              const thisCommand = commandsList[i];
              var commandMatches = true;
              for (let k = 0; k < thisCommand.length; k++) {
                if (thisCommand[k] != partialCommand[k] && partialCommand[k] !== undefined) {
                  commandMatches = false;
                  break;
                }
              }
              if (commandMatches) {
                possibleCommands.push(thisCommand);
              }
            }
            if (possibleCommands[tabbedItemIdx] !== undefined) {
              setInputValue(possibleCommands[tabbedItemIdx]);
              tabbedItemIdx++;
            } else {
              tabbedItemIdx = 0;
              if (possibleCommands.length > 0) {
                setInputValue(possibleCommands[tabbedItemIdx]);
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
          setUserCommandHistory([...userCommandHistory, inputLC]);
          setInputValue('');
          setCurrentHistoryOffset(0);
        }
      },
      [commands, input, userCommandHistory, setUserCommandHistory, 
        currentHistoryOffset, setCurrentHistoryOffset]
    );

    return (<>
    <div id='terminal_root' className="terminal" ref={ref} onClick={focusInput}>
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
          />
        </div>
      </div>
    </div>
  </>);
});