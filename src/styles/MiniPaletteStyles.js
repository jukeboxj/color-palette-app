import red from '@material-ui/core/colors/red';

export default {
    root: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '.5rem',
        marginBottom: '.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: 1,
        },
    },
    colors: {
        backgroundColor: '#dae1e4',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px'
    },
    deleteIcon: {
        color: red[600],
        backgroundColor: red[100],
        width: '2rem',
        height: '2rem',
        position: 'absolute',
        right: '0px',
        top: '0px',
        padding: '0.1rem',
        zIndex: 10,
        opacity: 0,
    },
}