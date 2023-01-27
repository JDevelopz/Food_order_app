import React, { useRef, useContext, useState } from "react";
import classes from "../Cart.module.css";
import CartContext from "../../../context/cart-context";

export default function CustomerInformationForm({
  stepTwoHandler,
  totalAmount,
  orderInformationHandler,
  checkOutform,
}) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  // Import Cart Context from the Context store.
  const cartContext = useContext(CartContext);
  // Standard payment options.
  const paymentOptions = ["Cash", "Gopay", "Paylater"];
  // Delivery times.
  const deliveryTimes = [
    "16:00",
    "16:15",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
  ];
  // Current date and time.
  const date = new Date();
  const currentTime =
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes();
  // Checks currenttime and filter the delivery times shown.
  const availableDeliveryTimes = deliveryTimes.filter(
    (time) => time > currentTime
  );

  const checkboxChangeHandler = (e) => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      if (checkbox !== e.target) {
        checkbox.checked = false;
      }
    });
  };

  const customerNameRef = useRef();
  const customerAddressRef = useRef();
  const deliveryTimeRef = useRef();
  const paymentMethodRefs = paymentOptions.map(() => React.createRef());

  let promoCode;
  let totalPricePromo = (cartContext.totalAmount / 100) * 90;
  const [promoSucces, setPromoSucces] = useState(false);
  const promoCodeHandler = (e) => {
    promoCode = e.target.value;
    if (promoCode.toUpperCase() === "SUSHINOW") {
      setPromoSucces(true);
    } else {
      setPromoSucces(false);
    }
  };
  const orderedItems = cartContext.items.map((item) => {
    return {
      name: item.name,
      price: item.price,
      amount: item.amount,
    };
  });

  const customerDetailSubmitHandler = (e) => {
    e.preventDefault();
    const customerName = customerNameRef.current.value;
    const customerAddress = customerAddressRef.current.value;
    const deliveryTime = deliveryTimeRef.current.value;
    const paymentMethodIndex = paymentOptions.findIndex(
      (_, index) => paymentMethodRefs[index].current.checked
    );
    const selectedPaymentMethod =
      paymentMethodRefs[paymentMethodIndex]?.current.value;
    //Validations
    if (customerName === "") {
      setError(true);
      setErrorMessage("Name is required");
      return;
    }
    if ((customerAddress === "") | (customerAddress.trim().length < 10)) {
      setError(true);
      setErrorMessage("Address is required");
      return;
    }
    if (!selectedPaymentMethod) {
      setError(true);
      setErrorMessage("Payment method required");
      return;
    }

    let orderInformation = {
      customerName,
      customerAddress,
      deliveryTime,
      paymentMethod: selectedPaymentMethod,
      orderedItems: orderedItems,
      totalAmount: promoSucces ? totalPricePromo : cartContext.totalAmount,
    };

    cartContext.addCustomerData(orderInformation);
    console.log(cartContext.customerData);
    checkOutform();
  };

  return (
    <>
      <form className={classes.adressForm}>
        <label>Name</label>
        <input type="text" placeholder="name" ref={customerNameRef}></input>
        <label>Address</label>
        <input
          type="text"
          placeholder="Full address"
          ref={customerAddressRef}
        ></input>
        <label>Delivery time</label>
        <select name="deliveryTime" ref={deliveryTimeRef}>
          {availableDeliveryTimes.map((time) => (
            <option>{time}</option>
          ))}
        </select>
        <label>Payment method</label>
        <div className={classes.row}>
          {paymentOptions.map((option, index) => {
            return (
              <>
                <input
                  key={option}
                  type="checkbox"
                  value={option}
                  ref={paymentMethodRefs[index]}
                  onChange={checkboxChangeHandler}
                />
                <label className={classes.label_payment}>{option}</label>
              </>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="PROMO CODE"
          onChange={promoCodeHandler}
        />
        <div className={classes.row}>
          <h3>Total amount:</h3>
          <strong>
            {promoSucces ? `$${totalPricePromo.toFixed(2)}` : `${totalAmount}`}
          </strong>
        </div>
        <p>{!error ? "" : errorMessage} </p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={stepTwoHandler}>
            cancel
          </button>
          <button
            className={classes.button}
            onClick={customerDetailSubmitHandler}
          >
            Checkout
          </button>
        </div>
      </form>
    </>
  );
}
