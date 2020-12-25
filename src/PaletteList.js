import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import styles from './styles/PaletteListStyles';
import MiniPalette from './MiniPalette';
import { Avatar, ListItem } from '@material-ui/core';

class PaletteList extends Component {
    
    state = {
        dialogOpen : false,
        deletingId : '',
    }

    openDialog = id => {
        this.setState({ 
            dialogOpen : true,
            deletingId : id,
        });
    }
    closeDialog = () => {
        this.setState({ 
            dialogOpen: false,
            deletingId: '',
        });
    }
    
    goToPalette = id => {
        // console.log('goToPalette is working');
        this.props.history.push(`/${id}`);
    }

    handleDelete = () => {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }

    render() {
        const { palettes, classes } = this.props;
        const { dialogOpen } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(
                            p => 
                                <CSSTransition 
                                    key={p.id} 
                                    classNames='fade'
                                    timeout={300}
                                >
                                    <MiniPalette
                                        id={p.id} 
                                        key={p.id}
                                        openDialog={this.openDialog} 
                                        {...p} 
                                        goToPalette={this.goToPalette} 
                                    />
                                </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog 
                    open={dialogOpen} 
                    aria-labelledby='delete-dialog-title'
                    onClose={this.closeDialog}
                >
                    <DialogTitle
                        id='delete-dialog-title'
                    >
                        Deleting This Platte?
                    </DialogTitle>
                    <List>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{ 
                                        backgroundColor : blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <CancelIcon 
                                        className={classes.cancelIcon}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        backgroundColor: red[100],
                                        color: red[600],
                                    }}
                                >
                                    <DeleteForeverIcon 
                                        className={classes.deleteIcon}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);