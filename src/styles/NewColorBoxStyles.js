export default {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)',
        }
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0",
        bottom: "0",
        color: "white",
        letterSpacing: "1px",
        fontSize: "12px",
        display: 'flex',
        justifyContent: 'space-between',
    },
    deleteIcon: {
        color: 'rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s ease-in-out',
    }
}