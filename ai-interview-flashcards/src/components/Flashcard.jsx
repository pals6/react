function Flashcard({ content, onCardClick, canFlip, isFlipped }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick();
    }
  };

  return (
    <div
      className={`flashcard ${canFlip ? "flashcard-ready" : "flashcard-locked"}`}
      onClick={onCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-disabled={!canFlip}
    >
      <span className="flashcard-hint">
        {canFlip
          ? isFlipped
            ? "Showing answer. Click to return to the question."
            : "Guess submitted. Click to reveal the answer."
          : "Submit a guess to unlock the answer."}
      </span>

      <p>{content}</p>
    </div>
  );
}

export default Flashcard;
