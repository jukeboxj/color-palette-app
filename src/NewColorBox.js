import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NewColorBoxStyles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {SortableElement} from 'react-sortable-hoc';

const NewColorBox = props => {
    const { classes, name, color, handleClick, drawerOpen } = props;
    return (
        <div
            className={classes.root}
            style={{ backgroundColor : color }}>
                <div className={classes.boxContent}>
                    <span>{name}</span>
                <span>
                    <DeleteForeverIcon 
                        className={classes.deleteIcon}
                        onClick={handleClick}
                    />
                </span>
                </div>
        </div>
    )
}

export default SortableElement(withStyles(styles)(NewColorBox));