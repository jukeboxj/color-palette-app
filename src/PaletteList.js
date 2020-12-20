import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styles from './styles/PaletteListStyles';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {
    goToPalette = id => {
        // console.log('goToPalette is working');
        this.props.history.push(`/${id}`);
    }

    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(
                            p => 
                                <CSSTransition 
                                    key={p.id} 
                                    classNames='fade'
                                    timeout={300}
                                >
                                    <MiniPalette
                                        id={p.id} 
                                        key={p.id}
                                        deletePalette={deletePalette} 
                                        {...p} 
                                        handleClick={() => this.goToPalette(p.id)} 
                                    />
                                </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);