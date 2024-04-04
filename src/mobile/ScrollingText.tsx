import { useState, useEffect } from "react";

export type ScrollingTextProps = {
    fullText: string,
    typingSpeedMs: number,
    isStyledLink: boolean,
    href: string,
    target: string,

};

export function ScrollingText({fullText, typingSpeedMs, isStyledLink, href, target}:ScrollingTextProps) {

    const [displayedText, setDisplayedText] = useState('');
    const [isCursorVisible, setIsCursorVisible] = useState(true);

    useEffect(() => {
        if (displayedText.length < fullText.length) {
            const cursorBlinkInterval = setInterval(() => {
                setIsCursorVisible((visible) => !visible);
            }, typingSpeedMs);

            return () => clearInterval(cursorBlinkInterval);
        }
    }, [displayedText, fullText, typingSpeedMs]);

    useEffect(() => {
        if (displayedText.length < fullText.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(fullText.substring(0, displayedText.length + 1));
            }, typingSpeedMs);

            return () => clearTimeout(timeoutId);
        } else {
            // Stop the cursor from blinking once the text is fully typed
            setIsCursorVisible(false);
        }
    }, [displayedText, fullText, typingSpeedMs]);

    if (href != "") {
        return (
            <p>
                <a className="mobile-home-link" href={href} target={target}>
                    <span className="typed-text">
                            {displayedText}
                    </span>
                    {isCursorVisible && <span className="cursor">_</span>}
                </a>
            </p>
         );
    } else {
    return (
            <p>
                <span className="typed-text">{displayedText}</span>
                {isCursorVisible && <span className="cursor">_</span>}
            </p>
        );
    }
}