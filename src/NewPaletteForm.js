// import styles from './styles/NewPaletteFormStyles';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';

import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        //navbar is 64px
        height: 'calc(100vh - 64px)',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const NewPaletteForm = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [colors, setColors] = useState(props.palettes[0].colors);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleSubmit = newPaletteName => {
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, '-'),
        colors: colors
      }
      props.savePalette(newPalette);
      props.history.push('/');
    }

    const removeColor = colorName => {
      setColors(colors.filter(c => c.name !== colorName))
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      setColors(arrayMove(colors, oldIndex, newIndex))
    }

    const addColor = newColor => {
      setColors([...colors, newColor]);
    }

    const clearColors = () => {
      setColors([])
    }

    const addRandomColor = () => {
      //pick random color from exisiting palettes
      const allColors = props.palettes.map(p => p.colors).flat();
      const rand = Math.floor(Math.random() * allColors.length);
      const randColor = allColors[rand];
      setColors([...colors, randColor]);
    }

    const isPaletteFull = () => {
      console.log('i am triggered', colors.length >= props.maxColors);
      return colors.length >= props.maxColors;
    }

    return(
    <div className = { classes.root } >
      <PaletteFormNav
        classes={classes}
        open={open}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Typography
            variant='h4'>Palette Design</Typography>
        <div>
            <Button
                variant='contained'
                color='secondary'
                onClick={clearColors}>
                  Clear Palette
            </Button>
            <Button
                variant='contained'
                color='primary'
                onClick={addRandomColor}
                disabled={isPaletteFull()}>
                  Random Color
            </Button>
        </div>

        <ColorPickerForm 
          isPaletteFull={isPaletteFull}
          addColor={addColor}
          colors={colors}
          />

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors} 
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd} />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = { maxColors : 20 };

export default NewPaletteForm;