export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => {
      if(item.type==="product")
        return acc + item.price * item.qty
      if(item.type==="service")
        return acc + item.price * item.week
      return acc
    },
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = 0 ;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = state.cartItems.reduce(
    (acc, item) => {
      if(item.type==="product"){
        let tp=0
        if (item.price > 5000) {
          tp = 0.18 * item.price;
        } else if (item.price > 1000) {
          tp = 0.12 * item.price;
        } else {
          tp = 200;
        }
        return acc + (tp * item.qty) }
      else if(item.type==="service"){
        let tp=0
        let totalItemsPrice=item.price* item.week;
        if (totalItemsPrice > 8000) {
          tp = 0.15 * totalItemsPrice;
        } else if (totalItemsPrice > 1000) {
          tp = 0.10 * totalItemsPrice;
        } else {
          tp = 100;
        }
        return acc + tp }
      return acc
    },
    0
  );
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
