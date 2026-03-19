import { useState } from "react";
import Flashcard from "./Flashcard";

const normalizeText = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");

const cards = [
  {
    question: "What is overfitting?",
    answer:
      "A model memorizes the training data and performs poorly on unseen data.",
    acceptedAnswers: [
      "memorizing training data",
      "learning training data too well",
      "poor generalization to new data",
      "performs poorly on unseen data"
    ]
  },
  {
    question: "What does RAG stand for?",
    answer: "Retrieval Augmented Generation.",
    acceptedAnswers: ["retrieval augmented generation"]
  },
  {
    question: "What is a neural network?",
    answer:
      "A machine learning model made of connected nodes inspired by the human brain.",
    acceptedAnswers: [
      "a machine learning model inspired by the human brain",
      "connected nodes inspired by the brain",
      "a model made of connected nodes"
    ]
  },
  {
    question: "What is a sliding window?",
    answer: "A moving subset used to process data efficiently.",
    acceptedAnswers: [
      "a moving subset",
      "a subset that moves across data",
      "processing data with a moving subset"
    ]
  },
  {
    question: "What is supervised learning?",
    answer: "Training a model on labeled data.",
    acceptedAnswers: [
      "training on labeled data",
      "learning from labeled data",
      "a model trained on labeled data"
    ]
  }
];

function Cards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null);

  const currentCard = cards[currentCardIndex];
  const canFlipCard = feedback !== null;

  const resetCardState = () => {
    setGuess("");
    setFeedback(null);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    if (!canFlipCard) return;
    setIsFlipped((prev) => !prev);
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value);

    if (feedback !== null) {
      setFeedback(null);
      setIsFlipped(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedGuess = normalizeText(guess);
    if (!normalizedGuess) return;

    const isCorrect = currentCard.acceptedAnswers.some(
      (acceptedAnswer) => normalizeText(acceptedAnswer) === normalizedGuess
    );

    setFeedback(isCorrect ? "correct" : "incorrect");
    setIsFlipped(false);
  };

  const handlePreviousCard = () => {
    if (currentCardIndex === 0) return;

    setCurrentCardIndex((prev) => prev - 1);
    resetCardState();
  };

  const handleNextCard = () => {
    if (currentCardIndex === cards.length - 1) return;

    setCurrentCardIndex((prev) => prev + 1);
    resetCardState();
  };

  return (
    <section className="cards-section">
      <div className="cards-meta">
        <p>Total Cards: {cards.length}</p>
        <p>
          Card {currentCardIndex + 1} of {cards.length}
        </p>
      </div>

      <Flashcard
        content={isFlipped ? currentCard.answer : currentCard.question}
        onCardClick={handleFlip}
        canFlip={canFlipCard}
        isFlipped={isFlipped}
      />

      <form className="guess-form" onSubmit={handleSubmit}>
        <label className="guess-label" htmlFor="guess-input">
          Enter your guess
        </label>

        <div className="guess-controls">
          <input
            id="guess-input"
            className="guess-input"
            type="text"
            value={guess}
            onChange={handleGuessChange}
            placeholder="Type your answer before flipping the card"
            autoComplete="off"
          />

          <button type="submit" disabled={!guess.trim()}>
            Submit
          </button>
        </div>
      </form>

      <p className={`feedback-message ${feedback ?? "pending"}`} aria-live="polite">
        {feedback === "correct" &&
          "Correct. Click the card to reveal the answer."}
        {feedback === "incorrect" &&
          "Not quite. Click the card to review the answer."}
        {feedback === null &&
          "Submit a guess first, then click the card to reveal the answer."}
      </p>

      <div className="card-navigation">
        <button
          type="button"
          onClick={handlePreviousCard}
          disabled={currentCardIndex === 0}
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNextCard}
          disabled={currentCardIndex === cards.length - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Cards;
