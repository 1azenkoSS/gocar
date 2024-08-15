import {useEffect, useRef, useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {AppBar, Box, ClickAwayListener, IconButton, Paper, Popper, Toolbar} from '@mui/material';

// project import
//import Search from './Search';
import Profile from './Profile';
import Logo from "../../../../components/Logo/Logo";
import Notification from "./Notification";

// assets

// ==============================|| HEADER CONTENT - MOBILE ||============================== //

const MobileSection = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            {/*<Box>
                <Logo/>
            </Box>*/}


            <Box>
                <Notification />
            </Box>
            <Box sx={{flexShrink: 0, ml: 0.75}}>
                <Profile/>
            </Box>

            {/*  <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{
                    width: '100%'
                }}
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
            </Popper>*/}
        </>
    );
};

export default MobileSection;
