import classes from "./AvailableMeals.module.css";
import Card from "./../UI/Card";
import MealsItem from "./../Meals/MealItem/MealsItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Salmon Roll",
    description: "6 Pieces of salmon roll",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Snapper",
    description: "White fish with caviar, 2 pieces",
    price: 16.5,
  },
  {
    id: "m3",
    name: "California Roll",
    description: "3 Pieces",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
  {
    id: "m5",
    name: "Spicy Tuna",
    description: "6 Pieces of Spicy.. Tuna roll",
    price: 18.99,
  },
  {
    id: "m6",
    name: "Soft shell Crab",
    description: "3 Pieces of delicious soft shell crab with advocado",
    price: 18.99,
  },
  {
    id: "m7",
    name: "Seaweed Salade",
    description: "Healthy...and green seaweed Salade.",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return (
      <MealsItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;
