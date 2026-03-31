import { useState } from 'react';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_DOG_API_KEY;

function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const normalizeValue = (value) => value?.trim().toLowerCase();

  const isBanned = (dog, currentBanList) => {
    const valuesToCheck = [
      dog.name,
      ...dog.temperament,
      dog.lifeSpan,
      dog.origin,
      dog.bredFor,
    ]
      .filter(Boolean)
      .map((value) => normalizeValue(value));

    const normalizedBanList = currentBanList.map((item) =>
      normalizeValue(item)
    );

    return valuesToCheck.some((value) => normalizedBanList.includes(value));
  };

  const fetchDog = async () => {
    try {
      const response = await fetch('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': ACCESS_KEY,
        },
      });

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        alert('No dog data found.');
        return;
      }

      let foundValidDog = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!foundValidDog && attempts < maxAttempts) {
        attempts++;

        const randomIndex = Math.floor(Math.random() * data.length);
        const breed = data[randomIndex];

        const formattedDog = {
          image: breed.image?.url || '',
          name: breed.name || 'Unknown',
          temperament: breed.temperament
            ? breed.temperament.split(',').map((trait) => trait.trim())
            : [],
          lifeSpan: breed.life_span || 'Unknown',
          origin: breed.origin || breed.country_code || 'Unknown',
          bredFor: breed.bred_for || 'Unknown',
        };

        if (!formattedDog.image) continue;

        if (!isBanned(formattedDog, banList)) {
          setCurrentDog(formattedDog);
          setHistory((prev) => [formattedDog, ...prev]);
          foundValidDog = true;
        }
      }

      if (!foundValidDog) {
        alert(
          'Could not find a dog outside your ban list. Try removing some banned attributes.'
        );
      }
    } catch (error) {
      console.error('Error fetching dog:', error);
      alert('Something went wrong while fetching dog data.');
    }
  };

  const toggleBan = (value) => {
    if (!value || value === 'Unknown') return;

    setBanList((prevBanList) => {
      const normalizedValue = normalizeValue(value);

      const alreadyBanned = prevBanList.some(
        (item) => normalizeValue(item) === normalizedValue
      );

      if (alreadyBanned) {
        return prevBanList.filter(
          (item) => normalizeValue(item) !== normalizedValue
        );
      } else {
        return [...prevBanList, value.trim()];
      }
    });
  };

  return (
    <div className="app">
      <h1>Veni Vici!</h1>
      <p>Discover dogs from your wildest dreams!</p>

      {currentDog && (
        <div className="dog-card">
          <h2>{currentDog.name}</h2>

          <div className="attributes">
            {currentDog.temperament.slice(0, 4).map((trait, index) => (
              <button key={index} onClick={() => toggleBan(trait)}>
                {trait}
              </button>
            ))}

            <button onClick={() => toggleBan(currentDog.lifeSpan)}>
              {currentDog.lifeSpan}
            </button>

            <button onClick={() => toggleBan(currentDog.origin)}>
              {currentDog.origin}
            </button>
          </div>

          <img src={currentDog.image} alt={currentDog.name} />
        </div>
      )}

      <button onClick={fetchDog}>Discover!</button>

      <div className="ban-list">
        <h2>Ban List</h2>
        <p>Select an attribute in your listing to ban it</p>

        {banList.length === 0 ? (
          <p>No banned attributes yet.</p>
        ) : (
          banList.map((item, index) => (
            <button key={index} onClick={() => toggleBan(item)}>
              {item}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default App;