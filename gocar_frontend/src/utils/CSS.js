import {makeStyles} from "@mui/styles";

export const useStylesCarProfile = makeStyles((theme) => ({
    main: {
        fontSize: '2rem', // Default font size
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem', // Font size for smaller screens (breakpoint 'sm')
        },
    },
    label: {
        float: 'left',
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        fontSize: '1rem', // Default font size
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem', // Font size for smaller screens (breakpoint 'sm')
        },
    },
    context: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        fontSize: '1rem', // Default font size
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem', // Font size for smaller screens (breakpoint 'sm')
        },
    },
}));

export const useStylesHeroSection = makeStyles((theme) => ({
    main: {
        fontWeight: 'bold',
        fontSize: '3.2rem', // Default font size
        [theme.breakpoints.down('lg')]: {
            fontSize: '2.5rem', // Font size for smaller screens (breakpoint 'sm')
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.3rem', // Font size for smaller screens (breakpoint 'md')
        },
    },
    caption: {
        fontSize: '0.8rem', // Default font size
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.7rem', // Font size for smaller screens (breakpoint 'sm')
        },
    }
}))
export const useStylesAdvantages = makeStyles((theme) => ({
    main: {
        fontWeight: 'bold',
        fontSize: '2.5rem', // Default font size
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.8rem', // Font size for smaller screens (breakpoint 'sm')
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.3rem', // Font size for smaller screens (breakpoint 'md')
        },
    },
    caption: {
        fontSize: '0.8rem', // Default font size
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.7rem', // Font size for smaller screens (breakpoint 'sm')
        },
    }
}))