import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import chroma from 'chroma-js';
import './ColorBox.css';

const styles = {
    copyText : {
        // color : props => (chroma.contrast('white', props.g) < chroma.contrast('black', props.bg)) ? 'black' : 'white'
    }
}

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

        //choose whether to show black/white text
        const lum = chroma(bg).luminance();
        const deltaW = chroma.contrast('white', bg);
        const deltaB = chroma.contrast('black', bg);
        const isDarkText = deltaW < deltaB;

        return (
            <CopyToClipboard text={bg} onCopy={this.changeCopyState} >
                <div className="ColorBox" style={{ background: bg }}>
                    <div className={`copy-overlay ${copied && "show"}`}
                        style={{ background: bg }}></div>
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>Copied!</h1>
                        <p className={isDarkText ? 'dark-text' : ''}>{this.props.bg}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkText ? 'dark-text' : ''}>{name}</span>
                        </div>
                        <button className={`copy-btn ${isDarkText ? 'dark-text' : ''}`}>Copy</button>
                    </div>
                    {
                        showLink && 
                            <Link to={moreURL} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${isDarkText ? 'dark-text' : ''}`}>More</span>
                            </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);
