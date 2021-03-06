import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

class PaletteFormNav extends Component {

    state = {
        formShowing : false,
    }

    handleClickOpen = () => {
        this.setState({
            formShowing: true,
        })
    }

    handleClickClose = () => {
        this.setState({
            formShowing: false,
        })
    }

    render() {

        const { classes, open, handleSubmit, handleDrawerOpen, palettes } = this.props;
        const { formShowing } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color='default'
                    position="fixed"
                    className={clsx(classes.appBar, {[classes.appBarShift]: open})}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>

                    <div className={classes.navBtns}>
                        <Link className={classes.link} to='/'>
                            <Button className={classes.button} variant='contained' color='secondary'>Go Back</Button>
                        </Link>
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.handleClickOpen}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                
                {formShowing && 
                    <PaletteMetaForm
                        handleSubmit={handleSubmit}
                        palettes={palettes}
                        formShowing={formShowing}
                        handleClickClose={this.handleClickClose}
                    />
                }
                
            </div>
        )
    }
}

export default withStyles(styles, {withTheme : true})(PaletteFormNav);
