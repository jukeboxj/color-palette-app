import React from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import styles from './styles/MiniPaletteStyles';
import { withStyles } from '@material-ui/styles';

const MiniPalette = React.memo(props => 
    {
        const { classes, paletteName, emoji, colors, goToPalette, openDialog, id } = props;

        const handleDelete = e => {
            e.stopPropagation();
            openDialog(id);
        };

        const handleClick = () => {
            goToPalette(id);
        }

        const miniColorBoxes = colors.map(c =>
            <div
                className={classes.miniColor}
                style={{ backgroundColor: c.color }}
                key={c.name}
            />
        )

        return (
            <div className={classes.root} onClick={handleClick}>
                <DeleteForeverOutlinedIcon
                    className={classes.deleteIcon}
                    style={{ transition: 'all 0.3s ease-in-out' }}
                    onClick={handleDelete}
                />
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        );
    }
)

export default withStyles(styles)(MiniPalette);