import PropTypes from 'prop-types';
import {useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Box, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

// assets
import {EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined} from '@ant-design/icons';
import {Navigate} from "react-router-dom";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({handleLogout, isAuth}) => {
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List component="nav" sx={{p: 0, '& .MuiListItemIcon-root': {minWidth: 32, color: theme.palette.grey[500]}}}>
            {isAuth &&
                <Box>
                    <ListItemButton href="https://localhost:3000/free/cars-list" selected={selectedIndex === 0}
                                    onClick={(event) => {
                                        handleListItemClick(event, 0);
                                    }}>
                        <ListItemIcon>
                            <EditOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="Перелік автомобілів"/>
                    </ListItemButton>
                    <ListItemButton href="https://localhost:3000/free/rent-cars" selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemIcon>
                            <UserOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="Список заявок"/>
                    </ListItemButton>
                    <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="Вихід"/>
                    </ListItemButton>
                </Box>
            }


        </List>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
