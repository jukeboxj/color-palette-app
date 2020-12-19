import sizes from './sizes';
import bg from './background.svg';

export default {
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    /* background by SVGBackgrounds.com */
        backgroundColor: '#0f3817',
        backgroundImage: `url(${bg})`,
        overflowY: 'scroll',
    },
    heading: {
        fontSize: '2rem',
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('lg')]: {
            width: '65%',
        },
        // [sizes.down('md')]: {
        //     width: '70%',
        // },
        // [sizes.down('sm')]: {
        //     width: '80%',
        // },
        // [sizes.down('xs')]: {
        //     width: '90%',
        // },
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {
            color: 'white'
        },
        [sizes.down('xs')]: {
            flexDirection: 'column',
            paddingBottom: '25px',
        },
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5rem',
        [sizes.down('md')]: {
            gridTemplateColumns: 'repeat(2, 50%)',
            gridGap: '3rem',
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 100%)',
            gridGap: '1rem',
        },
    }
}