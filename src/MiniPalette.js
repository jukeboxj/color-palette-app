import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = {
    main: {
        backgroundColor : 'purple',
        border: '3px solid teal'
    }
}

const MiniPalette = props => {
    return (
        <div>
            <h1>MiniPalette is imported</h1>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);