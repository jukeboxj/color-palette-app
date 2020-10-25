import React, { Component } from 'react';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import styles from './styles/PaletteStyles';
import { withStyles } from "@material-ui/styles";
import './Palette.css';

class Palette extends Component {
    
    state = { 
        level : 500,
        format : 'hex' 
    };

    changeLevel = lvl => {
        this.setState({ level: lvl })
        // console.log(lvl)
    }

    changeFormat = fmt => {
        this.setState({ format: fmt })
    }
    
    render() {
        const { classes } = this.props;
        const { colors, emoji, paletteName, id } = this.props.palette;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(c => 
            <ColorBox 
                bg={c[format]} 
                name={c.name} 
                key={c.id}
                moreURL={`/${id}/${c.id}`}
                showLink />
        );

        return (
            <div className={classes.Palette}>
                <Navbar 
                    level={level}
                    format={format} 
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    showLvl />
                <div className={classes.pColors}>{colorBoxes}</div>
                <PaletteFooter emoji={emoji} paletteName={paletteName} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);