import React, { Component } from "react";
import util from "../util";
import { connect } from "react-redux";
import { fetchProducts } from "../action/productActions";

class Products extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    const productItem = this.props.products.map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-color">
          <a
            href={`#${product.id}`}
            onClick={(e) => this.props.handleAddToCart(e, product)}
          >
            <img
              src={`/products/${product.img}`}
              width="200"
              alt={product.title}
            />
            <p>{product.title}</p>
          </a>
          <div>
            <b>{util.formatCurrency(product.price)}</b>
            <button
              className="btn btn-primary"
              onClick={(e) => this.props.handleAddToCart(e, product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    ));
    return <div className="row">{productItem}</div>;
  }
}

const mapStateToProps = (state) => ({
  product: state.products.filteredItems,
});

export default connect(mapStateToProps, { fetchProducts })(Products);
