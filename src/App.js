import React, { Component }  from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import {generatePalette} from './colorHelpers';

import seedColors from './seedColors';

class App extends Component { 
  findPlatte = id => {
    return seedColors.find(palette => {
      return palette.id === id
    })
  }
  
  render() {
    return (
      <div className="App">
        <Switch>        
          <Route exact path="/" render={() => <PaletteList palettes={seedColors} />} />
          <Route 
            exact path="/:id" 
            render={RouteProps => <Palette palette={generatePalette(this.findPlatte(RouteProps.match.params.id))} />} />
        </Switch>
        
        
      </div>
    );
  }
}

export default App;
