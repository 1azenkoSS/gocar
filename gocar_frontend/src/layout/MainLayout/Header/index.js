import PropTypes from 'prop-types';

// material-ui
import {useTheme} from '@mui/material/styles';
import {AppBar, Toolbar, useMediaQuery} from '@mui/material';

// project import
import HeaderContent from './HeaderContent';
import Logo from "../../../components/Logo/Logo";

// assets

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';
    // common header
    const mainHeader = (
        <Toolbar>

            <Logo/>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`
            // boxShadow: theme.customShadows.z1
        }
    };

    return (
        <>
            {/*!matchDownMD ? (
                <AppBarStyled open={open} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (*/}
                <AppBar {...appBar}>{mainHeader}</AppBar>

        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Header;
