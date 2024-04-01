import { useEffect, useRef } from 'react';
import './cat.css';

type CatProps = {
    isVisible: boolean
}

export function Cat({ isVisible }:CatProps) {

    const captionRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (isVisible && captionRef.current) {
            captionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
        }
    }, [isVisible])

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
            <img className="cat__display__img" src={imgSrc}></img>
            <p ref={captionRef} className="cat__caption">{caption}</p>
        </div>
    </>);


}