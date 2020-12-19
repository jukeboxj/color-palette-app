import sizes from './sizes';

export default {
    Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh",
        [sizes.down('md')]: {
            flexDirection: "column",
            height: "10vh",
        }
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        background: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        '& a': {
            textDecoration: "none",
            color: "black",
        },
        [sizes.down('md')]: {
            width: "100%",
            paddingLeft: '50px',
        }
    },
    container: {
        width: '100%',
        display: 'flex',
        alignItems: "center",
        justifyContent: "flex-start",
        [sizes.down('md')]: {
            width: "100%",
            height: "100%",
        }
    },
    slider: {
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
        '& .rc-slider-track': {
            backgroundColor: "transparent"
        },
        '& .rc-slider-rail': {
            height: "8px"
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover': {
            background: "green",
            outline: "none",
            border: "2px solid green",
            boxShadow: "none",
            width: "13px",
            /* marginLeft: "-5px", */
            marginTop: "-3px",
        },
        [sizes.down('xs')]: {
            width: '100%',
        },
    },
    selectContainer: {
        marginLeft: "auto",
        marginRight: "1rem",
    },
}