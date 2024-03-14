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
    const commandsList: string[] = Object.keys(commands);
    var tabbedItemIdx = 0;

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
        if (e.key === 'Tab') {
          e.preventDefault();
          var possibleCommands:string[] = [];
          const partialCommand = input.toLowerCase().trim();
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
              } else {
                setInputValue('');
              }
            }
          }
        } else if (e.key === 'Enter') {
          const commandToExecute = commands?.[input.toLowerCase()];
          if (commandToExecute) {
            commandToExecute?.();
          }
          setInputValue('');
        }
      },
      [commands, input]
    );

    return (
    <div className="terminal" ref={ref} onClick={focusInput}>
      {history.map((line, index) => (
        <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
          {line}
        </div>
      ))}
      <div className="terminal__prompt">
        <div className="terminal__prompt__label">{promptLabel}</div>
        <div className="terminal__prompt__input">
          <input
            type="text"
            value={input}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            // @ts-ignore
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
});