import styles from './styles/NewPaletteFormStyles';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NewColorBox from './NewColorBox';

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
    const [currColor, setColor] = useState('teal');
    const [colors, setColors] = useState([{
        name: 'purple',
        color: 'purple'
    }]);
    const [name, setName] = useState('');

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const updateColor = newColor => {
      // console.log(newColor.hex);
      setColor(newColor.hex);
    }

    const addColor = () => {
      const newColor = {color: currColor, name: name};
      setColors([...colors, newColor]);
      setName('');
    }

    const handleChange = evt => {
      setName(evt.target.value)
    }

    const handleSubmit = () => {
      let newName = 'New Test Palette';
      const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, '-'),
        colors: colors
      }
      props.savePalette(newPalette);
      props.history.push('/');
    }

    useEffect(() => {
      // custom rule will have check if color name is unique
      ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
        colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
      )
    }, [name])
    useEffect(() => {
      // custom rule will have check if color name is unique
      ValidatorForm.addValidationRule('isColorUnique', (value) => 
        colors.every(
          ({color}) => color !== currColor
        )
      )
    })

    return(
    <div className = { classes.root } >
      <CssBaseline />
      <AppBar
        color='default'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
                        Persistent drawer
          </Typography>
          <Button 
            onClick={handleSubmit}
            variant='contained'
            color='primary'>Save Palette</Button>
        </Toolbar>
      </AppBar>
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
                color='secondary'>Clear</Button>
            <Button
                variant='contained'
                color='primary'>Random</Button>
        </div>
        <ChromePicker
            color={currColor}
            onChangeComplete={newColor => updateColor(newColor)} />
        <ValidatorForm
          onSubmit={addColor}
          // ref="form"
          // onError={errors => console.log(errors)}
        >
          <TextValidator
            value={name}
            onChange={handleChange}
            // label="Email"
            // name="email"
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['enter a color name', 'color name already used', 'color already used']}
          />
          <Button
            type='submit'
            style={{ background: currColor }}
            variant='contained'
            color='primary'>ADD</Button>
        </ValidatorForm>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {colors.map(c => (
          <NewColorBox 
            color={c.color}
            name={c.name} />
        ))}
      </main>
    </div>
  );
}

export default NewPaletteForm;