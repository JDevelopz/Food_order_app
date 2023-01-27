import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import {useContext} from 'react';
import CartContext from "../../../context/cart-context";

const MealsItem = (props) => {
  const cartContext = useContext(CartContext)
  const price = `$${props.price.toFixed(2)}`;

  const addItemToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name, 
      amount: amount, 
      price: props.price,
    })
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>
          <p>{props.description}</p>
        </div>
        <div className={classes.price}>
          <span>{price}</span>
        </div>
      </div>
      <MealsItemForm onAddToCart={addItemToCartHandler} id={props.id}/>
    </li>
  );
};

export default MealsItem;
