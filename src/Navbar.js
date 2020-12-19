import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';

import styles from './styles/NavbarStyles';
import 'rc-slider/assets/index.css';

class Navbar extends Component {

    state = { open : false };
    
    handleChange = evt => {
        this.props.changeFormat(evt.target.value);
        this.setState({ open : true });
    }

    handleClose = evt => {
        this.setState({ open : false })
    }

    render() {
        const {level, format, changeLevel, showLvl, classes} = this.props;
        const {open} = this.state;

        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>ReactColorPicker</Link>
                </div> 
                <div className={classes.container}>
                    {showLvl &&
                        <div className={classes.slider}>
                            <span>Level: {level}</span>
                            <div>
                                <Slider min={100}
                                    max={900}
                                    step={100}
                                    onAfterChange={changeLevel}
                                    defaultValue={level} />
                            </div>
                        </div>}
                    <div className={classes.selectContainer}>
                        <Select value={format} onChange={this.handleChange}>
                            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                            <MenuItem value='rgb'>RBG - rbg(255,255,255)</MenuItem>
                            <MenuItem value='rgba'>RBGA - rbga(255,255,255,1.0)</MenuItem>
                        </Select>
                    </div>
                </div>
                <Snackbar 
                    anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
                    open={open}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format Changed to {format.toUpperCase()}</span>}
                    ContentProps={{'aria-describedby': 'message-id'}}
                    onClose={this.handleClose}
                    action={
                        <IconButton 
                            size="small" 
                            aria-label="close" 
                            color="inherit" 
                            onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    } />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);