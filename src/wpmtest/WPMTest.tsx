import { useEffect, useCallback, MutableRefObject, useRef } from "react";
import './WPMTest.css';

export type WPMTestProps = {
    exitCommandCallback: () => void;
  };

export function WPMTest({exitCommandCallback}:WPMTestProps) {

    const promptDisplayDivRef = useRef<HTMLDivElement>(null);

    const testPrompt = `Foxes vulpis, swift and agile, dart through the underbrush with vibrant energy. In the moonlit forests, their eyes gleam with a clever spark, scanning the terrain for any sign of movement. The rustle of leaves underfoot betrays the presence of nocturnal creatures, while overhead, the canopy whispers secrets of the ancient woodland. Red coats blend into the autumnal hues, the foxes' movements harmonious with the falling leaves.`;

    useEffect(() => {
        promptDisplayDivRef.current?.focus();
    });

    /**
     * When user presses enter, we execute the command
     */
        const handleInputKeyDown = useCallback(
            wpmTestKeyboardHandler,
            [exitCommandCallback]
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

    function wpmTestKeyboardHandler(e: React.KeyboardEvent<HTMLDivElement>) {

        alert('key pressed');
        //e.preventDefault();

        if (e.key === 'q') {
            exitCommandCallback();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {

        } else if (e.key === 'Tab') {

        } else if (e.key === 'Enter') {

        }
    }    
    return (<>

        <div className="wpm__test__container">
            <span className="wpm__test__prompt__instructions">
                Begin typing the text below when ready
            </span>
            <div className="wpm__test__prompt__div" tabIndex={0}
                 ref={promptDisplayDivRef}
                 id='prompt_input_div'
                 onKeyDown={handleInputKeyDown}
                 onChange={handleInputChange}
            >

                {testPrompt}
            {/* <textarea
                className="wpm__test__prompt__input"
                id='prompt_input'
                type='text'
                spellCheck='false'
                value={testPrompt}
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
                // @ts-ignore
                ref={inputRef}
                autoComplete='off'
            /> */}

            </div>

        </div>
 
    </>);

}