function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export function calcPrices(orderItems) {
  // Calculate the items price
  const itemsPrice = orderItems.reduce(
    (acc, item) => {
      if(item.type==="product")
        return acc + item.price * item.qty
      if(item.type==="service")
        return acc + item.price * item.week
      return acc
    },
    0
  );

  // Calculate the shipping price
  const shippingPrice = 0;

  // Calculate the tax price
  const taxPrice = orderItems.reduce(
    (acc, item) => {
      if(item.type==="product"){
        let tp=0
        if (item.price > 5000) {
          tp = 0.18 * itemsPrice;
        } else if (item.price > 1000) {
          tp = 0.12 * item.price;
        } else {
          tp = 200;
        }
        return acc + (tp * item.qty) }
      if(item.type==="service"){
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

  // Calculate the total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // return prices as strings fixed to 2 decimal places
  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
}
