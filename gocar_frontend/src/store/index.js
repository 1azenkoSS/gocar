// third-party
import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";


import thunkMiddleware from "redux-thunk";
import carProfileReducer from "../redux/car-profile-reducer";
import carsReducer from "../redux/cars-reducer";
import authReducer from "../redux/auth-reducer";
import adminReducer from "../redux/admin-reducer";

let reducers = combineReducers(
    {
        profilePage: carProfileReducer,
        //dialogsPage: dialogsReducer,
        //sidebar: sidebarReducer,
        usersPage: carsReducer,
        auth: authReducer,
        admin: adminReducer

        //app: appReducer
    }
)

// let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));
window.store = store;

const { dispatch } = store;

//export { store, dispatch };
export default store;