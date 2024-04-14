import { MutableRefObject, useEffect, useRef } from 'react';
import './cat.css';

type CatProps = {
    inputRef: MutableRefObject<HTMLInputElement | undefined>;
}

export function Cat({ inputRef }:CatProps) {

    const captionRef = useRef<HTMLParagraphElement>(null);

    const maxImgNum = 40;
    function getRandomInt(n: number): number {
        return Math.floor(Math.random() * (n + 1));
      }

    let currentImageNumber = getRandomInt(maxImgNum);
    let imgSrc = "/img/cats/" + currentImageNumber.toString() + ".jpg";
    let caption = '';
    if (currentImageNumber <= 16) {
        caption = 'Gingerbread';
    } else if (currentImageNumber <= 33) {
        caption = 'Oreo';
    } else {
        caption = 'Gingerbread & Oreo';
    }

    return (<>
        <div className="cat__display__div">
            <img className="cat__display__img" src={imgSrc} onLoad={() => {
                if (inputRef && inputRef.current) {
                    setTimeout(() => {
                        if (inputRef && inputRef.current) {
                            inputRef.current.scrollIntoView({ block: 'end'});
                        }
                    }, 100);
                }
            }} alt={caption}></img>
            <p ref={captionRef} className="cat__caption">{caption}</p>
        </div>
    </>);


}