import React, { Component } from "react";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Basket is empty"
        ) : (
          <div> You Have {cartItems.length} Products in the basket. </div>
        )}
        {cartItems.length >= 0 && (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <b>{item.title}</b> X {item.count} ||
                  <button
                    className="btn btn-danger"
                    onClick={(e) => this.props.handleRemoveFromCart(e, item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Basket;
