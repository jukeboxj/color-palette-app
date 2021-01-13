import React, { Component }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import PaletteList from './PaletteList';
import Page from './Page';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

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

  findColor = (palette, colorId) => {
    return palette.colors.find(color => {
      return color.name === colorId
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

  colorPage = RouteProps => {
    if (!this.findPlatte(RouteProps.match.params.paletteId)) {
      return <Redirect to='/' />;
    }
    if (!this.findColor(
      this.findPlatte(RouteProps.match.params.paletteId), 
      RouteProps.match.params.colorId
    )) {
      return this.palettePage(RouteProps);
    }
    return (
        <Page>
          <SingleColorPalette
            colorId={RouteProps.match.params.colorId}
            palette={generatePalette(this.findPlatte(RouteProps.match.params.paletteId))}
          />
        </Page>
    )
  }

  palettePage = RouteProps => {
    if (!this.findPlatte(RouteProps.match.params.paletteId)) {
      return <Redirect to='/' />;
    }

    return (
      <Page>
        <Palette
          palette={generatePalette(this.findPlatte(RouteProps.match.params.paletteId))}
        />
      </Page>
    )
  }

  render() {

    const { palettes } = this.state;

    return (
      <div className="App">
        <Route 
          render = { ({location}) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames='page' timeout={500}>
                <Switch location={location}>
                  <Route
                    exact path="/"
                    render={RouteProps =>
                      <Page>
                        <PaletteList
                          palettes={palettes}
                          deletePalette={this.deletePalette}
                          {...RouteProps}
                        />
                      </Page>
                    }
                  />
                  <Route
                    exact path='/new'
                    render={routeProps => 
                      <Page>
                        <NewPaletteForm
                          palettes={palettes}
                          savePalette={this.savePalette}
                          {...routeProps}
                        />
                      </Page>
                    } 
                  />
                  <Route
                    exact path="/:paletteId/:colorId"
                    render={RouteProps => this.colorPage(RouteProps)} 
                  />
                  <Route
                    exact path="/:paletteId"
                    render={RouteProps => this.palettePage(RouteProps)} 
                  />
                  <Redirect to='/' />
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
