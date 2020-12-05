import React, { Component }  from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import PaletteList from './PaletteList';
import {generatePalette} from './colorHelpers';

import seedColors from './seedColors';

class App extends Component { 

  savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

  state = {
    palettes : this.savedPalettes || seedColors,
  }

  findPlatte = id => {
    return this.state.palettes.find(palette => {
      return palette.id === id
    })
  }

  savePalette = newPalette => {
    this.setState({ palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage)
  }

  syncLocalStorage = () => {
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            exact path='/new'
            render={routeProps => <NewPaletteForm 
              palettes={this.state.palettes}
              savePalette={this.savePalette} 
              {...routeProps} 
            />} />
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
          <Route 
            exact path="/" 
            render={
              RouteProps => <PaletteList 
                palettes={this.state.palettes} 
                {...RouteProps} />
            } />
        </Switch>
        
        
      </div>
    );
  }
}

export default App;
