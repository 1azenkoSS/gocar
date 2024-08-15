// material-ui
import {Box, Button, Link} from '@mui/material';

// project import
//import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import {connect} from "react-redux";
import React from "react";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = ({isAuth}) => {


    return (
        <>
            {/*<Logo />*/}

            {//matchesXs && <MobileSection />
            }
            <Box sx={{width: '100%', ml: 1}}/>

            {isAuth &&
            <Box sx={{float: 'right', marginRight: 3}}>

            </Box>
        }
            <Box sx={{float: 'right'}}>
                <Link href="https://localhost:3000/free/add-car">
                    <Button sx={{height: 35, width: 150}} variant="outlined">
                        {isAuth ? 'Додати авто' : 'Здати в оренду'}
                    </Button>
                </Link>
            </Box>


{/*            <Notification/>*/}
            <Profile/>

        </>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {})(HeaderContent);
