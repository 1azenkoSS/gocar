// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import carProfileReducer from "../../redux/car-profile-reducer";
import carsReducer from "../../redux/cars-reducer";
import authReducer from "../../redux/auth-reducer";
import dialogsReducer from "../../redux/dialogs-reducer";
import sidebarReducer from "../../redux/sidebar-reducer";
import appReducer from "../../redux/app-reducer";
import adminReducer from "../../redux/admin-reducer";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    carProfilePage: carProfileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    carsPage: carsReducer,
    auth: authReducer,
    admin: adminReducer,

    app: appReducer
});

export default reducers;
