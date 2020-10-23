import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import chroma from 'chroma-js';
import './ColorBox.css';

const styles = {
    ColorBox : {
        width: "20%",
        height: props => props.showLink
            ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: 1,
            transition: "0.5s"
        }
    },
    textColor : {
        color: props => chroma.contrast('white', props.bg) > chroma.contrast('black', props.bg) 
            ? 'white' : "rgba(0, 0, 0, 0.5)"
    },
    seeMore : {
        color: props => chroma.contrast('white', props.bg) > chroma.contrast('black', props.bg)
            ? 'white' : "rgba(0, 0, 0, 0.5)",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
    },
    copyBtn: {
        color: props => chroma.contrast('white', props.bg) > chroma.contrast('black', props.bg)
            ? 'white' : "rgba(0, 0, 0, 0.5)",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        border: "none",
        textDecoration: "none",
        opacity: 0
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0",
        bottom: "0",
        color: "white",
        letterSpacing: "1px",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMsg: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "4rem",
        transform: "scale(.1)",
        opacity: "0",
        color: "white",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100 %",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem"
        },
        "& p": {
            fontSize: "2rem",
            fontweight: "100"
        }
    },
    showMsg: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all .4s ease-in-out",
        transitionDelay: ".3s",
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
