import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByID } from '../services/api';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      favorites: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductByID(id);
    console.log(response);
    this.setState({ product: response });
  }

  handleProduct = (event) => {
    this.setState((prevState) => {
      const newFavorites = [...prevState.favorites, event];
      localStorage.setItem('produtcs', JSON.stringify(newFavorites));
      return {
        favorites: newFavorites,
      };
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{product.title}</h2>
        <h3 data-testid="product-detail-price">{product.price}</h3>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </button>
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleProduct(product) }
          name="product"
        >
          Comprar

        </button>
      </div>

    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
