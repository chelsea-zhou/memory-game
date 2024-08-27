import { useEffect, useState } from 'react'
import './styles/App.css'
import { Card } from './Components/Card';
import axios from 'axios';

const numberOfCards = 12;
const generateCards = (setCurrentClick, data) => {
  const cards = [];

  let i = 0;
  while (i<numberOfCards) {
    const character = data[i];
    cards.push(<Card number={i} key={i} setCurrentClick={setCurrentClick} character={character}/>);
    i +=1
  }
  return cards;
}

function randomizeCards(cards) {
  let i = 0;
  let generatedNumber = new Set([]);
  let shuffledCards = []

  while (i < numberOfCards) {
    let number = Math.floor(Math.random() * numberOfCards);
    while(generatedNumber.has(number)) {
      number = Math.floor(Math.random() * numberOfCards);
    }
    generatedNumber.add(number);
    shuffledCards.push(cards[number])
    i +=1
  }
  return shuffledCards;
}

function App() {
  const [currentClick, setCurrentClick] = useState(-1);
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (currentClick == -1) {
      return;
    }
    if (clickedCards.includes(currentClick)) {
      setCurrentScore(0);
      setCurrentClick(-1);
      setClickedCards([]);
    } else {
      setClickedCards([
        ...clickedCards,
        currentClick
      ]);
      setCurrentScore(currentScore+1);
      if (currentScore + 1 > bestScore) {
        setBestScore(bestScore+1)
      }
    }
  }, [currentClick])

  useEffect(()=> {
    async function fetchImage() {
      let i = 0;
      const urls =[];
      while (i < numberOfCards) {
        const url = `https://thronesapi.com/api/v2/Characters/${i}`;
        urls.push(url);
        i +=1;
      }
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const results = responses.map((res)=> {
          const {fullName, imageUrl, family, title} = res.data;
          return {
            fullName,
            imageUrl,
            family, 
            title 
          }
        });
        setData(results);
      } catch(err) {
        console.log(err);
      }
    }
    fetchImage();

  }, []);

    useEffect(()=> {
      if (data.length === numberOfCards) {
        const cards = generateCards(setCurrentClick, data);
        setCards(cards);
      }
    }, [data])

  return (
    <div className='page'>
      <div>
        <p>Memory Game</p>
      </div>

      <div>
        <p>Current score: {currentScore} </p>
        <p>Best score: {bestScore} </p>
      </div>

      <div className='cardsContainer'>
        {cards.length ==numberOfCards && randomizeCards(cards)}
      </div>
    </div>
  )
}

export default App
