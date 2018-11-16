import { Component } from 'react';

class breweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brewery_types: [],
      states: [],
      cities: []
    }
  }

// Fetching from the Open Brewery DB API
  async componentDidMount() {
    const res =
        await fetch(
            `https://api.openbrewerydb.org/breweries/${this.props.match.params.name}/`,
            { cache: "force-cache" })
            
            const json = await res.json()
  
// Fetching brewery types from the Brewery API
    const brewery_typePromises = json.brewery_types.map(async (b) => {
      const data = await fetch(b.brewery_type.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const brewery_type = await Promise.all(brewery_typePromises)

// Fetching states of said breweries from API
    const statesPromises = json.states.map(async (s) => {
      const data = await fetch(s.state.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const state = await Promise.all(statesPromises)

// Also fetching cities of said breweries from API
    const citiesPromises = json.cities.map(async (m) => {
      const data = await fetch(m.city.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const city = await Promise.all(citiesPromises)

    this.setState({selectedBrewery: json, brewery_type: brewery_type, state: state, city: city})
    }
}
    
export default breweries;