import chroma from 'chroma-js';

export default {
    ColorBox: {
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
    textColor: {
        color: props => chroma.contrast('white', props.bg) > chroma.contrast('black', props.bg)
            ? 'white' : "rgba(0, 0, 0, 0.5)"
    },
    seeMore: {
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
            width: "100%",
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