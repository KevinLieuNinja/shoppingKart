import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { filterProducts } from "../action/productActions";

class Filter extends PureComponent {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products Found</div>
        <div className="col-md-4">
          <label>
            Order By
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleChangeSort}
            >
              <option value="">Select</option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
          </label>
        </div>
        <div className="col-md-4">
          <label>
            Filter By Size
            <select
              className="form-control"
              value={this.props.size}
              onChange={(e) =>
                this.props.filterProducts(this.props.products, e.target.value)
              }
            >
              <option value="">All</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  product: state.products.items,
  size: state.products.size,
});

export default connect(mapStateToProps, { filterProducts })(Filter);
