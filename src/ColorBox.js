import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';

class ColorBox extends Component {
    
    state = { copied : false };

    changeCopyState = () => {
        this.setState({ copied : true }, () => {
            setTimeout(() => this.setState({ copied : false }), 1500)
        })
    }
    
    render() {
        const {name, bg, moreURL, showLink, classes} = this.props;
        const {copied} = this.state;

        // //choose whether to show black/white text
        // const lum = chroma(bg).luminance();
        // const deltaW = chroma.contrast('white', bg);
        // const deltaB = chroma.contrast('black', bg);
        // const isDarkText = deltaW < deltaB;

        return (
            <CopyToClipboard text={bg} onCopy={this.changeCopyState} >
                <div className={classes.ColorBox} style={{ background: bg }}>
                    <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                        style={{ background: bg }}></div>
                    <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
                        <h1>Copied!</h1>
                        <p className={classes.textColor}>{this.props.bg}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.textColor}>{name}</span>
                        </div>
                        <button className={classes.copyBtn}>Copy</button>
                    </div>
                    {
                        showLink && 
                            <Link to={moreURL} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                            </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);
