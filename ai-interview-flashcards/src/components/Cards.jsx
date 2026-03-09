import { useState } from "react";
import Flashcard from "./Flashcard";

const getShuffledIndexesExcluding = (excludeIndex, totalCards) => {
  const indexes = [];

  for (let i = 0; i < totalCards; i += 1) {
    if (i !== excludeIndex) {
      indexes.push(i);
    }
  }

  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[swapIndex]] = [indexes[swapIndex], indexes[i]];
  }

  return indexes;
};

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

  const [cardState, setCardState] = useState(() => ({
    currentCardIndex: 0,
    remainingIndexes: getShuffledIndexesExcluding(0, cards.length)
  }));
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNextCard = () => {
    if (cards.length <= 1) return;

    setCardState((prevState) => {
      const { currentCardIndex, remainingIndexes } = prevState;
      const nextPool =
        remainingIndexes.length > 0
          ? remainingIndexes
          : getShuffledIndexesExcluding(currentCardIndex, cards.length);
      const [nextCardIndex, ...updatedRemainingIndexes] = nextPool;

      return {
        currentCardIndex: nextCardIndex,
        remainingIndexes: updatedRemainingIndexes
      };
    });

    setIsFlipped(false);
  };

  return(
    <div className="cards-section">
        <p>Total Cards: {cards.length}</p>

        <Flashcard
        content={
            isFlipped
              ? cards[cardState.currentCardIndex].answer
              : cards[cardState.currentCardIndex].question
        }
        onCardClick={handleFlip}
        />

       <button onClick={handleNextCard}>Next</button>
    </div>
  );

}

export default Cards;
