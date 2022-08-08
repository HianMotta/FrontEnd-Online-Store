import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getQuery, getCategory } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      input: '',
    };
  }

  async componentDidMount() {
    const data = await getCategories();
    console.log(data);
    this.setState({
      categories: data,
    });
  }

  handleChange= (event) => {
    this.setState({ input: event.target.value });
  }

  handleClick = async (event) => {
    console.log(event.target.value);
    const { input } = this.state;
    this.setState({ input: '' });
    const response = await getQuery(input);
    console.log(response);
    this.setState({ data: response });
  }

  handleCategory= async (event) => {
    console.log(event.target);
    const { id } = event.target;
    const response = await getCategory(id);
    this.setState({ data: response });
  }

  render() {
    const { categories, input, data } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        <input
          type="text"
          data-testid="query-input"
          onChange={ this.handleChange }
          value={ input }
          name="input"
        />

        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>

        <p
          data-testid="home-initial-message"
        >
          {' '}
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        {categories.map((category) => (
          <button
            id={ category.id }
            onClick={ this.handleCategory }
            key={ category.id }
            type="button"
            data-testid="category"
          >
            {category.name}

          </button>
        ))}

        { data ? (
          <section>
            {data.results.map(({ thumbnail, id, title, price }) => (
              <span data-testid="product" key={ id }>
                <p>{ title }</p>
                <img src={ thumbnail } alt={ title } />
                <p>{ price }</p>
              </span>
            ))}
          </section>
        ) : <p>Nenhum produto foi encontrado</p>}

      </div>
    );
  }
}

export default Home;
