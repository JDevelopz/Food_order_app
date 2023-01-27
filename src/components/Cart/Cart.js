import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import CustomerInformationForm from "./CartForms/CustomerInformationForm";
import CheckoutForm from "./CartForms/CheckoutForm";

const Cart = (props) => {
  // Overview of orders and option to proceed to step 2.
  const [ordering, setOrdering] = useState(true);
  // Step 2 - Order form with name, address and payment questions
  const [orderForm, setOrderForm] = useState(false);
  // Step 3 - checkout form, payment questions
  const [checkout, setCheckout] = useState(false);
  // Import Cart Context from the Context store.
  const cartContext = useContext(CartContext);
  // Show total amount fixed to 2 decimal places
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  // Check if the cart has items.
  const hasItems = cartContext.items.length > 0;
  // Add +1 to the amount of the selected product in the cart.
  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };
  // Removes -1 to the amount of the selected product in the cart.
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  // Map throught the items in the cart and returns JSX with the styled CartItem component.
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
  // If user clicks next we go to the user information form, on orderform if user clicks cancel we go back to the
  const stepTwoHandler = () => {
    setOrdering((prev) => !prev);
    setOrderForm((prev) => !prev);
  };

  // Collect data from CurstomerInformationForm.
  let orderInformation;
  const orderInformationHandler = (data) => {
    orderInformation = data;
  };

  const checkOutForm = () => {
    setCheckout(true);
    setOrderForm(false);
    setOrdering(false);
  };

  return (
    <Modal setCartStatus={props.setCartStatus}>
      {ordering && (
        <div className={classes["cart-items"]}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.setCartStatus}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={stepTwoHandler}>
                Order
              </button>
            )}
          </div>
        </div>
      )}
      {orderForm && (
        <CustomerInformationForm
          stepTwoHandler={stepTwoHandler}
          totalAmount={totalAmount}
          orderInformationHandler={orderInformationHandler}
          checkOutform={checkOutForm}
        />
      )}
      {checkout && <CheckoutForm paymentMethod={orderInformation} />}
    </Modal>
  );
};

export default Cart;
