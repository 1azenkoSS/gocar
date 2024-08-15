import {carsAPI} from "../api/api";
import {getCarProfile} from "./car-profile-reducer";

const ADD_CAR_RESULT = 'ADD_CAR';
const GET_RENT_CAR = 'GET_RENT_CAR';
const GET_RENT_CAR_PROFILE = 'GET_RENT_CAR_PROFILE';
const GET_RENT_CAR_IMAGE = 'GET_RENT_CAR_IMAGE';
const GET_ALL_CAR_IMAGES = 'GET_ALL_CAR_PHOTOS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_ADDED = 'user/TOGGLE_IS_ADDED';

let initialState = {
    carForRentProfile: [],
    carsForRent: [],
    carForRentImage: [],
    carsAllImages: [],
    addCarResult: null,
    isFetching: false,
    isAdded: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RENT_CAR: {
            return {
                ...state,
                carsForRent: action.data
            }
        }
        case GET_RENT_CAR_PROFILE: {
            return {
                ...state,
                carForRentProfile: action.carForRentProfile
            }
        }
        case GET_ALL_CAR_IMAGES:
            return  {
                ...state,
                carsAllImages: action.images
            }
        case GET_RENT_CAR_IMAGE: {
            return {
                ...state,
                carForRentImage: action.carForRentImage
            }
        }
        case ADD_CAR_RESULT: {
            return {
                ...state,
                addCarResult: action.isSuccess
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        case TOGGLE_IS_ADDED: {
            return {...state, isAdded: action.isAdded};
        }
        default:
            return state;
    }
}

export const addCarResult = (isSuccess) => ({type: ADD_CAR_RESULT, isSuccess})
export const getRentCar = (data) => ({type: GET_RENT_CAR, data})
export const getRentCarProfile = (carForRentProfile) => ({type: GET_RENT_CAR_PROFILE, carForRentProfile})
export const getRentCarImage = (carForRentImage) => ({type: GET_RENT_CAR_IMAGE, carForRentImage})
export const getAllCarForRentImages = (images) => ({type: GET_ALL_CAR_IMAGES, images})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsAdding = (isAdded) => ({type: TOGGLE_IS_ADDED, isAdded});


export const addCar = (carData, isAuth) => async (dispatch) => {
    debugger
    if (isAuth) {
        dispatch(toggleIsAdding(false))
        const response = await carsAPI.addCarData(carData)
        debugger
        dispatch(addCarResult(response.data.isSuccess))
        dispatch(toggleIsAdding(true))
    } else {
        dispatch(toggleIsAdding(false))
        const response = await carsAPI.sendCarToAdmin(carData)
        debugger
        dispatch(addCarResult(response.data.isSuccess))
        dispatch(toggleIsAdding(true))

    }
}

export const savePhoto = (formData, isAuth) => async (dispatch) => {
    if (isAuth)
    {
        await carsAPI.savePhoto(formData)

    }

    else
    {

        await carsAPI.sendCarImageToAdmin(formData)
    }

}
export const getCarForRent = () => async (dispatch) => {
    const response = await carsAPI.getRentCars()
    dispatch(getRentCar(response.data))
}
export const getCarForRentProfileImage = (carId) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await carsAPI.getRentCarImage(carId)
    dispatch(toggleIsFetching(false))
    dispatch(getRentCarImage(response.data))
}
export const getCarForRentImages = () => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await carsAPI.getAllRentCarImages()
    dispatch(getAllCarForRentImages(response.data))
    dispatch(toggleIsFetching(false))
}
export const deleteRentCarData = (carId) => async (dispatch) => {
    await carsAPI.deleteRentCar(carId)
}
export const deleteRentCarImage = (carId) => async (dispatch) => {
    await carsAPI.deleteRentCarImage(carId)
}
export const getRentCarProfileTC = (carId) => async (dispatch) => {
    const response = await carsAPI.getRentCarProfile(carId)
    if (response.data.isSuccess)
        dispatch(getRentCarProfile(response.data.car))
}
export const changeDataRentCar = (carId, data) => async (dispatch, getState) => {
        const response = await carsAPI.changeCarRentData(carId,data)
        dispatch(getRentCarProfileTC(carId))
}
export const changeDataCar = (carId, data) => async (dispatch, getState) => {
        const response = await carsAPI.updateCarData(carId,data)
        dispatch(getCarProfile(carId))
}

export const copyCarData = (carId) => async (dispatch) => {
    const response = await carsAPI.copyCarData(carId)
}
export default adminReducer;