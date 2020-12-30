import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {SortableElement} from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NewColorBoxStyles';

const NewColorBox = props => {
    const { classes, name, color, handleClick } = props;
    return (
        <div
            className={classes.root}
            style={{ backgroundColor : color }}>
                <div className={classes.boxContent}>
                    <span>{name}</span>
                    <DeleteForeverIcon 
                        className={classes.deleteIcon}
                        onClick={handleClick}
                    />
                </div>
        </div>
    )
}

export default SortableElement(withStyles(styles)(NewColorBox));