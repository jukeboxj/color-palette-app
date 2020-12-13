import { DRAWER_WIDTH } from '../constants';
import sizes from './sizes';

const styles = (theme, drawerWidth = DRAWER_WIDTH) => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {
        marginRight: '1rem',
        [sizes.down('md')]: {
            display: props => props.open 
                ? 'none' : 'inline-block',
        },
        [sizes.down('xs')]: {
            marginRight: '0.5rem',
        },
    },
    button: {
        margin: '0 0.5rem',
        [sizes.down('xs')]: {
            margin: '0.3rem',
            padding: '0.3rem',
        },
    },
    link: {
        textDecoration: 'none',
    },
});

export default styles;