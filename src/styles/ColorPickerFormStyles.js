import { DRAWER_WIDTH } from '../constants';

const useStyles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
    },
    picker: {
        width: '100% !important',
        marginTop: '2rem',
    },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '1.5rem',
    },
    colorForm: {
        width: '100%',
    },
    colorNameInput: {
        width: '100%',
        height: '70px',
    },
}) 

export default useStyles;