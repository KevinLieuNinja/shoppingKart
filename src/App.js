import "./App.css";
import { Component } from "react";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Filter from "./components/Filter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [], cartItems: [] };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          products: data,
          filteredProducts: data,
        })
      );
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      });
    }
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value }, this.listProducts);
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value }, this.listProducts);
  }

  listProducts() {
    this.setState((state) => {
      const products = [...state.products];
      if (state.sort !== "") {
        console.log("sorting:", state.sort);
        products.sort((a, b) =>
          state.sort === "lowest"
            ? a.price > b.price
              ? 1
              : 1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            (a) => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          ),
        };
      }
      return { filteredProducts: products };
    });
  }

  handleAddToCart(e, product) {
    console.log("handleAddToCart");
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach((item) => {
        if (item.id === product.id) {
          productAlreadyInCart = true;
          item.count++;
          console.log("second coming");
        }
      });
      console.log(productAlreadyInCart);
      if (!productAlreadyInCart) {
        console.log("product isnt in cart");
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    });
  }

  handleRemoveFromCart(e, item) {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((elm) => elm.id !== item.id);
      localStorage.setItem("cartItem", cartItems);
      return { cartItems };
    });
  }

  render() {
    return (
      <div className="Container">
        <h1>Ecommerce Shopping Cart</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <hr />
            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-4">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
