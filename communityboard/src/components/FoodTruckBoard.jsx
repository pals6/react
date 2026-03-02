import FoodTruckGrid from './FoodTruckGrid';

const foodTrucks = [
  {
    id: 1,
    name: 'Midnight Noodles',
    cuisine: 'Japanese Street Ramen',
    neighborhood: 'North Quad',
    menuUrl: 'https://example.com/midnight-noodles-menu',
  },
  {
    id: 2,
    name: 'The Taco Lab',
    cuisine: 'Mexican Fusion',
    neighborhood: 'Library Lawn',
    menuUrl: 'https://example.com/the-taco-lab-menu',
  },
  {
    id: 3,
    name: 'Sizzle & Seoul',
    cuisine: 'Korean BBQ Bowls',
    neighborhood: 'Engineering Plaza',
    menuUrl: 'https://example.com/sizzle-and-seoul-menu',
  },
  {
    id: 4,
    name: 'Green Spoon',
    cuisine: 'Mediterranean Wraps',
    neighborhood: 'Student Center',
    menuUrl: 'https://example.com/green-spoon-menu',
  },
  {
    id: 5,
    name: 'Bao Street',
    cuisine: 'Chinese Bao & Dumplings',
    neighborhood: 'South Commons',
    menuUrl: 'https://example.com/bao-street-menu',
  },
  {
    id: 6,
    name: 'Curry Corner',
    cuisine: 'Indian Comfort Plates',
    neighborhood: 'Arts Walk',
    menuUrl: 'https://example.com/curry-corner-menu',
  },
  {
    id: 7,
    name: 'Banh Mi Breeze',
    cuisine: 'Vietnamese Sandwiches',
    neighborhood: 'East Gate',
    menuUrl: 'https://example.com/banh-mi-breeze-menu',
  },
  {
    id: 8,
    name: 'Brick Oven Wheels',
    cuisine: 'Neapolitan Pizza',
    neighborhood: 'Athletics Lot',
    menuUrl: 'https://example.com/brick-oven-wheels-menu',
  },
  {
    id: 9,
    name: 'Arepa Avenue',
    cuisine: 'Venezuelan Street Food',
    neighborhood: 'Campus Green',
    menuUrl: 'https://example.com/arepa-avenue-menu',
  },
  {
    id: 10,
    name: 'Sweet Route',
    cuisine: 'Desserts & Bubble Tea',
    neighborhood: 'Dorm Circle',
    menuUrl: 'https://example.com/sweet-route-menu',
  },
];

const FoodTruckBoard = () => {
  return <FoodTruckGrid trucks={foodTrucks} />;
};

export default FoodTruckBoard;
