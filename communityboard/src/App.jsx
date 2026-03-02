import './App.css';
import FoodTruckBoard from './components/FoodTruckBoard';

const App = () => {
  return (
    <div className="app">
      <header className="hero">
        <h1>Campus Food Truck Favs</h1>
        <p>
          Discover student-loved trucks around campus, sorted into quick cards
          with menu links.
        </p>
      </header>
      <FoodTruckBoard />
    </div>
  );
};

export default App;
