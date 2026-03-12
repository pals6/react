import { useEffect, useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";

const createEmptyInputs = () => ({
  temperature: "",
  milk: "",
  syrup: "",
  blended: "",
});

const createEmptyStatus = () => ({
  temperature: "",
  milk: "",
  syrup: "",
  blended: "",
});

const BaristaForm = () => {
  const [inputs, setInputs] = useState(createEmptyInputs);
  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState(createEmptyInputs);
  const [answerStatus, setAnswerStatus] = useState(createEmptyStatus);

  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  const getNextDrink = () => {
    const randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    const selectedDrink = drinksJson.drinks[randomDrinkIndex];

    setCurrentDrink(selectedDrink.name);
    setTrueRecipe({
      temperature: selectedDrink.ingredients.temp,
      milk: selectedDrink.ingredients.milk,
      syrup: selectedDrink.ingredients.syrup,
      blended: selectedDrink.ingredients.blended,
    });
  };

  useEffect(() => {
    getNextDrink();
  }, []);

  const onNewDrink = () => {
    setInputs(createEmptyInputs());
    setAnswerStatus(createEmptyStatus());
    getNextDrink();
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAnswerStatus((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const onCheckAnswer = (e) => {
    e.preventDefault();
    setAnswerStatus({
      temperature: inputs.temperature === trueRecipe.temperature ? "correct" : "wrong",
      milk: inputs.milk === trueRecipe.milk ? "correct" : "wrong",
      syrup: inputs.syrup === trueRecipe.syrup ? "correct" : "wrong",
      blended: inputs.blended === trueRecipe.blended ? "correct" : "wrong",
    });
  };

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button type="button" className="button newdrink" onClick={onNewDrink}>
          🔄
        </button>
      </div>

      <form onSubmit={onCheckAnswer}>
        <div className="container">
          <div className="mini-container">
            <h3>Temperature</h3>
            <div className={`answer-space ${answerStatus.temperature}`}>
              {inputs.temperature}
            </div>
            <RecipeChoices
              handleChange={onInputChange}
              label="temperature"
              choices={ingredients.temperature}
              checked={inputs.temperature}
            />
          </div>

          <div className="mini-container">
            <h3>Milk</h3>
            <div className={`answer-space ${answerStatus.milk}`}>{inputs.milk}</div>
            <RecipeChoices
              handleChange={onInputChange}
              label="milk"
              choices={ingredients.milk}
              checked={inputs.milk}
            />
          </div>

          <div className="mini-container">
            <h3>Syrup</h3>
            <div className={`answer-space ${answerStatus.syrup}`}>{inputs.syrup}</div>
            <RecipeChoices
              handleChange={onInputChange}
              label="syrup"
              choices={ingredients.syrup}
              checked={inputs.syrup}
            />
          </div>

          <div className="mini-container">
            <h3>Blended</h3>
            <div className={`answer-space ${answerStatus.blended}`}>
              {inputs.blended}
            </div>
            <RecipeChoices
              handleChange={onInputChange}
              label="blended"
              choices={ingredients.blended}
              checked={inputs.blended}
            />
          </div>
        </div>

        <button type="submit" className="button submit">
          Check Answer
        </button>
      </form>

      <button type="button" className="button newdrink" onClick={onNewDrink}>
        New Drink
      </button>
    </div>
  );
};

export default BaristaForm;
