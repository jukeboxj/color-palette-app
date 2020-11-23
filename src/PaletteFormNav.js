import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class PaletteFormNav extends Component {
    
    state = {
        paletteName : ''
    }

    handleChange = evt => {
        this.setState({
            paletteName : evt.target.value
        })
    }
    
    componentDidMount() {
        // custom rule will have check if palette name is unique
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(
                ({ id }) => id !== this.state.paletteName.toLowerCase().replace(/ /g, '-')
            )
        );
    }

    render() {

        const { classes, open, handleSubmit, handleDrawerOpen } = this.props;
        const { paletteName } = this.state;

        return (
            <div>
                <CssBaseline />
                <AppBar
                    color='default'
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
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
                        <ValidatorForm
                            onSubmit={() => handleSubmit(paletteName)} >
                            <TextValidator
                                label='Palette Name'
                                name='newPaletteName'
                                value={paletteName}
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['enter a palette name', 'palette name already used']}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'>Save Palette</Button>
                            <Link to='/'>
                                <Button variant='contained' color='secondary'>Go Back</Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
