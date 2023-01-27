import { useContext } from "react";
import classes from "./CheckoutForm.module.css";
import CartContext from "../../../context/cart-context";
import Frame from "../../../assets/frame.png";
import DeliveryImg from "../../../assets/delivery.png";

export default function CheckoutForm(props) {
  const cartCtx = useContext(CartContext);
  let customer = cartCtx.customerData;

  let paymentMethod = cartCtx.customerData.paymentMethod;

  if (paymentMethod === "Cash") {
    return (
      <div className={classes.checkoutForm}>
        <p>
          He, {customer.customerName}. Thank you for ordering at sushiyou.{" "}
          <br />
          Your total order cost will be <strong>{customer.totalAmount}</strong>
        </p>
        <img src={DeliveryImg} alt="delivery" />
        <p>We will prepair your order, estimated arrival 25 minutes.</p>
      </div>
    );
  }
  if (paymentMethod === "Gopay") {
    return (
      <div className={classes.checkoutForm}>
        <p>
          He, {customer.customerName}. Thank you for ordering at sushiyou.{" "}
          <br /> One last step and we will prepair your order for delivery.
        </p>
        <h2>{paymentMethod}</h2>
        <img src={Frame} alt="paymentMethod" />
        <h2>${customer.totalAmount.toFixed(2)}</h2>
      </div>
    );
  }
  if (paymentMethod === "Paylater") {
    return (
      <div className={classes.checkoutForm}>
        <p>
          He, {customer.customerName}. Thank you for ordering at sushiyou. One
          last step and we will prepair your order for delivery.
        </p>
      </div>
    );
  } else {
    <>
      <p>Seems something went wrong. try again later</p>
    </>;
  }
}
