import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import carProfileReducer from "./car-profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import carsReducer from "./cars-reducer";
import appReducer from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import adminReducer from "./admin-reducer";


let reducers = combineReducers(
    {
            profilePage: carProfileReducer,
            dialogsPage: dialogsReducer,
            sidebar: sidebarReducer,
            usersPage: carsReducer,
            auth: authReducer,
            admin: adminReducer
            //app: appReducer,

    }
)

// let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));
window.store = store;
export default store;