function Flashcard ({content, onCardClick}){
    return(
        <div className="flashcard" onClick={onCardClick}>
            <p>{content}</p>
        </div>
    );
}

export default Flashcard;