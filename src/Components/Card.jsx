import "../styles/App.css"
import { useState } from "react";

export function Card({number, setCurrentClick, character}) {
    const [myNumber, setMyNumber] = useState(number);

    function handleClick() {
        console.log(`set current click ${myNumber}`);
        setCurrentClick(myNumber);
    }
    return (
        <div className="card"  onClick={handleClick}>
            <img src={character.imageUrl}></img>
            <p>{character.fullName}</p>
            <p>{character.family}</p>
            <p>{character.title}</p>
        </div>
    )
}