import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const data = await getCategories();
    this.setState({
      categories: data,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        <input
          type="text"
        />
        <p
          data-testid="home-initial-message"
        >
          {' '}
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        {categories.map((category) => (
          <button
            key={ category.id }
            type="button"
            data-testid="category"
          >
            {category.name}

          </button>
        ))}
      </div>
    );
  }
}

export default Home;
