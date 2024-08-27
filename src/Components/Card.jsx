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
            <p id="name">{character.fullName}</p>
            <img src={character.imageUrl}></img>
            {/* <p id="family">{character.family}</p> */}
            <p id="title">{character.title}</p>
        </div>
    )
}