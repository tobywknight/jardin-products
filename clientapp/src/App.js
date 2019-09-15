import React, { Component } from 'react';
import Products from './components/products';

const apiUri = 'http://<your-server>/api/products/';

class App extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    fetch(apiUri)
    .then(res => res.json())
    .then((data) => {
      this.setState({ products: data })
    })
    .catch(console.log)
  }
  render(){
    return (
      <Products products={this.state.products} />
    )
  }
}

export default App
