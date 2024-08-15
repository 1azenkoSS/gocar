import logo from '../../logo.png'
import {Box, IconButton, ButtonBase} from "@mui/material";
import {Navigate} from "react-router-dom";
// ==============================|| LOGO SVG ||============================== //
const styles = {
    margin: '0 1%',
};

const Logo = () => {
    return (
        <Box>
            <a href="/free" >
                <img style={styles} src={logo} alt="GoCar" width="200" />
            </a>
        </Box>

    );
};

export default Logo;
