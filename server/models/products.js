const products = [];

class Products {
  construction(id, title, price, img, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
    this.description = description;
  }
  save() {
    this.id(Math.floor(Math.random() * 10000));
    products.push(this);
  }
}
