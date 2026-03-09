import { useState } from "react";
import Flashcard from "./Flashcard";

function Cards() {
  const cards = [
    {
      question: "What is overfitting?",
      answer: "When a model learns training data too well and performs poorly on new data."
    },
    {
      question: "What does RAG stand for?",
      answer: "Retrieval Augmented Generation."
    },
    {
      question: "What is a neural network?",
      answer: "A machine learning model inspired by the human brain."
    },
    {
      question: "What is a sliding window?",
      answer: "A technique that moves a subset across data to solve problems efficiently."
    },
    {
      question: "What is supervised learning?",
      answer: "A type of learning where the model trains on labeled data."
    }
  ];

  const [currentCardIndex, setCurrentCardIndex]= useState(0);
  const [isFlipped, setIsFlipped]=useState(false);

  const handleFlip=()=>{
    setIsFlipped(!isFlipped);
  };

  const handleNextCard=()=>{
    const randomIndex= Math.floor(Math.random()*cards.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false);
  };

  return(
    <div className="cards-section">
        <p>Total Cards: {cards.length}</p>

        <Flashcard content={
            isFlipped? cards[currentCardIndex].answer: cards[currentCardIndex].question
        }
        onCardClick={handleFlip}
        />

       <button onClick={handleNextCard}>Next</button>
    </div>
  );

}

export default Cards;