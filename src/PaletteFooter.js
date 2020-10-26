import React from 'react';
import styles from './styles/PaletteFooterStyles';
import { withStyles } from '@material-ui/styles';

const PaletteFooter = props => {
    const { emoji, paletteName, classes } = props;

    return (
        <footer className={classes.PaletteFooter}>
            {paletteName}<span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter);