import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// Importing App components
import breweries from './breweries';
import ListBreweries from './ListBreweries';

// Unable to figure out why I kept getting the following warning code: 'breweries' is declared but its value is never read.
// This warning occurs on line 9 above

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App row">
        <div className="col-xs-7 col-sm-6 col-lg-8">
          <Switch>
              <Route
                path="/breweries/:name"
                render={props => (
                  <breweries key={props.match.params.name} {...props} />
                )}
              />
              <Route exact path="/" component={ListBreweries} />
              <Route path="/breweries" component={ListBreweries} />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
