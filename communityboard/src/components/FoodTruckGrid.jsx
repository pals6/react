import FoodTruckCard from './FoodTruckCard';

const FoodTruckGrid = ({ trucks }) => {
  return (
    <section className="menu-board" aria-label="Campus food truck favorites">
      {trucks.map((truck) => (
        <FoodTruckCard
          key={truck.id}
          name={truck.name}
          cuisine={truck.cuisine}
          neighborhood={truck.neighborhood}
          menuUrl={truck.menuUrl}
        />
      ))}
    </section>
  );
};

export default FoodTruckGrid;
