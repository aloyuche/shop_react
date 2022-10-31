let carts = null;

module.exports = class cart {
  static save(products) {
    if (cart) {
      const existingProductIndex = cart.products.findIndex(
        (p) => p.id == products.id
      ); // To check if product exist
      console.log("existingProductIndex: ", existingProductIndex);
      if (existingProductIndex >= 0) {
        // exist in cart already
        const existingProduct = cart.products[existingProductIndex];
        existingProduct += 1;
        cart.totalPrice += products.price;
      } else {
        // not exist
        products.qty = 1;
        carts.products.push(products);
        cart.totalPrice += products.price;
      }
    } else {
      cart = {
        products: [],
        totalPrice: 0,
      };
      products.qty = 1;
      carts.products.push(products);
      cart.totalPrice = products.price;
    }
  }
  static getCart() {
    return carts;
  }
};
