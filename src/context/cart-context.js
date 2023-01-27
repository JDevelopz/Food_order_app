import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  customerData: {},
  addItem: () => {},
  removeItem: () => {},
  addCustomerData: () => {},
});

export default CartContext;
