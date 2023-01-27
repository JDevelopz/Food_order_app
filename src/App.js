import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";
import Welcome from "./components/UI/Welcome";

function App() {
  //Handles the status of the modal.js component
  const [cartStatus, setCardStatus] = useState(true);
  const [welcomeScreen, setWelcomeScreen] = useState(true);

  const cartStatusHandler = () => {
    if (cartStatus) {
      setCardStatus(false);
    }
    if (!cartStatus) {
      setCardStatus(true);
    }
  };

  return (
    <CartProvider>
      {welcomeScreen && <Welcome setWelcomeScreen={setWelcomeScreen} />}
      {!cartStatus && <Cart setCartStatus={cartStatusHandler} />}
      {!welcomeScreen && (
        <>
          <Header setCartStatus={cartStatusHandler} />
          <Meals />
        </>
      )}
    </CartProvider>
  );
}

export default App;
