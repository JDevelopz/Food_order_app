import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartBtn.module.css";
import CartIcon from "../../components/Cart/CartIcon";
import CartContext from "../../context/cart-context";

const HeaderCartBtn = (props) => {
  const cartContext = useContext(CartContext);
  const [btnIsHighlight, setBtnIsHighlight] = useState(false);

  const numberOfCartItems = cartContext.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const btnAnimationClasses = `${classes.button} ${
    btnIsHighlight ? classes.bump : " "
  }`;

  useEffect(() => {
    const indentifier = setTimeout(() => {
      console.log("Checking item added");
      if (cartContext.items.length > 0) {
        setBtnIsHighlight(true);
      }
    }, 100);

    return () => {
      console.log("clean-up");
      clearTimeout(indentifier);
      setBtnIsHighlight(false);
    };
  }, [cartContext.items]);

  return (
    <button className={btnAnimationClasses} onClick={props.setCartStatus}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.hidden}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;
