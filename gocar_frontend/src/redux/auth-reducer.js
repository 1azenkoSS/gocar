import {authAPI, carsAPI} from "../api/api";
import {setCars} from "./cars-reducer";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const REGISTER = 'REGISTERS';
const GET_ADMIN_PROFILE = 'GET_ADMIN_PROFILE';

let initialState = {
    name: null,
    surname: null,
    email: null,
    password: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMIN_PROFILE: {
            return {

                ...state,
                ...action.payload
            }
        }
        case SET_USER_DATA:
            return {...state, isAuth: action.isAuth}
        case REGISTER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const setAuthUserData = (isAuth) => ({
    type: SET_USER_DATA,
    isAuth: isAuth
});

export const getProfile = (name, surname, email, isAuth) => ({
    type: GET_ADMIN_PROFILE,
    payload: {name, surname, email, isAuth}
});

export const login = (email, password) => async (dispatch) => {
    const response = await authAPI.login(email, password);
    if (response.data.isSuccess) {
        dispatch(getMe())
    }
}

export const getMe = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.data.isSuccess) {
        const {name, surname, email} = response.data.user;
        dispatch(getProfile(name, surname, email, true))
    }


}

export const register = (name, surname, email, password) => async (dispatch) => {
    const response = await authAPI.registration(name, surname, email, password)
    debugger
    if (response.data.resultCode === 0) {
        dispatch(registerAC(name, surname, email, password))
    }
}
/*export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}*/
export const logout = () => async (dispatch) => {
    const response = await authAPI.logout();
    if(response.data.isSuccess)
        dispatch(getProfile(null, null, null,false))

}

export default authReducer;