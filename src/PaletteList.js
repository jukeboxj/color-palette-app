import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import MiniPalette from './MiniPalette';

const styles = {
    root : {
        backgroundColor : 'blue',
        height : '100vh',
        display : 'flex',
        alignItems : 'flex-start',
        justifyContent : 'center'
    },
    container : {
        width : '50%',
        display : 'flex',
        alignItems : 'flex-start',
        flexDirection : 'column',
        flexWrap : 'wrap'
    },
    nav : {
        display : 'flex',
        width : '100%',
        justifyContent: 'space-between',
        color : 'white'
    },
    palettes : {
        boxSizing : 'border-box',
        width : '100%',
        display : 'grid',
        gridTemplateColumns : 'repeat(3, 30%)',
        gridGap : '5%'
    }
}

export class PaletteList extends Component {
    goToPalette = id => {
        console.log('goToPalette is working');
        this.props.history.push(`/${id}`);
    }

    render() {
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(p => <MiniPalette key={p.id} {...p} handleClick={() => this.goToPalette(p.id)} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);