import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import PaletteList from './PaletteList';
import { generatePalette } from './colorHelpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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

  deletePalette = id => {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    )
  }

  syncLocalStorage = () => {
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  componentDidUpdate = () => {
    if (!this.state.palettes.length) {
      this.setState({ palettes: seedColors },
        this.syncLocalStorage)
    }
  }
  
  render() {
    return (
      <div className="App">
        <Route 
          render = { ({location}) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames='fade' timeout={500}>
                <Switch location={location}>
                  <Route
                    exact path='/new'
                    render={routeProps => 
                      <div className='page'>
                        <NewPaletteForm
                          palettes={this.state.palettes}
                          savePalette={this.savePalette}
                          {...routeProps}
                        />
                      </div>
                    } 
                  />
                  <Route
                    exact path="/:paletteId/:colorId"
                    render={RouteProps =>
                      <div className='page'>
                        <SingleColorPalette
                          colorId={RouteProps.match.params.colorId}
                          palette={generatePalette(this.findPlatte(RouteProps.match.params.paletteId))}
                        />
                      </div>
                    } 
                  />
                  <Route
                    exact path="/:id"
                    render={RouteProps =>
                      <div className='page'>
                        <Palette
                          palette={generatePalette(this.findPlatte(RouteProps.match.params.id))}
                        />
                      </div>
                    } 
                  />
                  <Route
                    exact path="/"
                    render={RouteProps => 
                      <div className='page'>
                        <PaletteList
                          palettes={this.state.palettes}
                          deletePalette={this.deletePalette}
                          {...RouteProps}
                        />
                      </div>
                    } 
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />      
      </div>
    );
  }
}

export default App;
