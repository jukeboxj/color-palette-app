import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from './styles/NewPaletteFormStyles';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';

const NewPaletteForm = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(seedColors[0].colors);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleSubmit = palette => {
      palette.id = palette.paletteName.toLowerCase().replace(/ /g, '-');
      palette.colors = colors;
      // const newPalette = {
      //   paletteName: newPaletteName,
      //   id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      //   colors: colors
      // }
      props.savePalette(palette);
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
      // console.log('i am triggered', colors.length >= props.maxColors);
      return colors.length >= props.maxColors;
    }

    return(
    <div className = { classes.root } >
      <PaletteFormNav
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
        <div className={classes.container}>
            <Typography
              variant='h4'
              gutterBottom
              >
                Palette Design
            </Typography>
            <div className={classes.btns}>
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
                onClick={clearColors}>
                Clear Palette
              </Button>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={addRandomColor}
                disabled={isPaletteFull()}>
                Random Color
              </Button>
            </div>

            <ColorPickerForm
              classes={classes}
              isPaletteFull={isPaletteFull}
              addColor={addColor}
              colors={colors}
              distance={20}
            />
        </div>

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
          onSortEnd={onSortEnd}
          drawerOpen={open} />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = { maxColors : 20 };

export default NewPaletteForm;