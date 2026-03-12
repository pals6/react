const RecipeChoices = ({ handleChange, label, choices, checked }) => {
    return (
      <div className="radio-buttons">
  {choices &&
    choices.map((choice) => (
      <li key={choice}>
        <input
          id={`${label}-${choice}`}
          value={choice}
          name={label}
          type="radio"
          onChange={handleChange}
          checked={checked === choice}
        />
          {choice}
      </li>
    ))}
</div>
    );
};

export default RecipeChoices;
