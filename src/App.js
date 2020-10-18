import React, { Component }  from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
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
          <Route
            exact path="/:paletteId/:colorId"
            render={RouteProps => 
              <SingleColorPalette  
                colorId={RouteProps.match.params.colorId}
                palette={generatePalette(this.findPlatte(RouteProps.match.params.paletteId))} />} />  
          <Route
            exact path="/:id"
            render={RouteProps => 
              <Palette 
                palette={generatePalette(this.findPlatte(RouteProps.match.params.id))} />} />      
          <Route exact path="/" render={RouteProps => <PaletteList palettes={seedColors} {...RouteProps} />} />
        </Switch>
        
        
      </div>
    );
  }
}

export default App;
