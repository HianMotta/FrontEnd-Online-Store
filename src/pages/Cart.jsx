import React from 'react';
import EmptyCart from './EmptyCart';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: JSON.parse(localStorage.getItem('produtcs')),
    };
  }

  // componentDidMount = () => {
  //   const produtos = localStorage.getItem(JSON.parse('produtcs'));
  //   this.setState({ products: produtos });
  //   console.log(produtos);
  // }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>

        { products === null
          ? <EmptyCart /> : (
            products.map((produto) => (
              <span key={ produto.id }>
                <h3 data-testid="shopping-cart-product-name">{produto.title}</h3>
                <img src={ produto.thumbnail } alt={ produto.title } />
                <p>{produto.price}</p>
              </span>

            ))
          ) }
        {products !== null && (
          <p
            data-testid="shopping-cart-product-quantity"
          >
            {products.length}

          </p>
        )}
      </div>
    );
  }
}

export default Cart;
