import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography, useMediaQuery
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {logout} from "../../../../../redux/auth-reducer";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = ( props ) => {

    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const handleLogout = async () => {
        props.logout()
    };

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <ButtonBase
                sx={{
                    p: 0.25,
                    bgcolor: open ? iconBackColorOpen : 'transparent',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' }
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {!matchesXs && props.isAuth ? <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    { <Typography variant="subtitle1">{props.name}&nbsp;{props.surname}</Typography> }
                </Stack> : null}
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
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
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (
                            <Paper
                                sx={{
                                    boxShadow: theme.customShadows.z1,
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        {open && (
                                            <>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs
                                                        variant="fullWidth"
                                                        value={value}
                                                        onChange={handleChange}
                                                        aria-label="profile tabs"
                                                    >
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Керування"
                                                            {...a11yProps(0)}
                                                        />
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Setting"
                                                            {...a11yProps(1)}
                                                        />
                                                    </Tabs>
                                                </Box>
                                                <TabPanel value={value} index={0} dir={theme.direction}>
                                                    <ProfileTab isAuth={props.isAuth} handleLogout={handleLogout} />
                                                </TabPanel>
                                                <TabPanel value={value} index={1} dir={theme.direction}>
                                                    <SettingTab />
                                                </TabPanel>
                                            </>
                                        )}
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};
const mapStateToProps = (state) => ({
        name: state.auth.name,
        surname: state.auth.surname,
        isAuth: state.auth.isAuth
})
export default connect(mapStateToProps,{logout})(Profile);
