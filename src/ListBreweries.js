import React, { Component } from 'react';
import { Link } from "react-router-dom";

// Fetching the API and creating the search bar tool

class ListBreweries extends Component {
  constructor() {
    super();
    this.state = {
      breweries: [],
      search: ""
    }
  }

  async componentDidMount() {
    const res = await  fetch('https://api.openbrewerydb.org/breweries/')
    const json = await res.json()
    this.setState({breweries: json.results})
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  generateSearchResults = search => {
    if (search === "") {
      return []
    } else {
      return this.state.breweries 
      .filter(p => p.name.includes(search))
      .slice( 0, 10 )
    }
  }

// Further development of my App unfortunately ended here with the error: Cannot read property 'filter' of undefined.
// This error occurs on line 29 above.

  render() {
    const results = this.generateSearchResults(this.state.search)
    return (
      <div className="App">
        <div className="search">
            <label className="title">Looking to grab a drink?</label>
                <p className="info">Hit 'The SearchBar' to find the best brewery for you!</p>
          <input style={{
            fontSize: 24,
            display: 'block',
            width:"100%"
          }} placeholder="Enter text here"
          onChange={this.onSearchChange}
          type="text"
          value={this.state.search} />
          <ul>
          {results.map(r => 
            <li key={r.name}>
              <Link to={`/breweries/${r.name}`}>
                {r.name}
              </Link>
            </li>
          )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListBreweries;