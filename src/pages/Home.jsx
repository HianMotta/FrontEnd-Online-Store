import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getQuery, getCategory } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      input: '',
      favorites: [],
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
            {data.results.map((produto) => (
              <span data-testid="product" key={ produto.id }>
                <p>{ produto.title }</p>
                <img src={ produto.thumbnail } alt={ produto.title } />
                <p>{ produto.price }</p>
                <Link
                  data-testid="product-detail-link"
                  to={ `/productdetail/${produto.id}` }
                >
                  Detalhes do produto
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.handleProduct(produto) }
                  name="product"
                >
                  Comprar

                </button>
              </span>
            ))}
          </section>
        ) : <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}

export default Home;
