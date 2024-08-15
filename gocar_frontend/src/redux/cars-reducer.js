import {carsAPI} from "../api/api";
import {updateObjectInArray} from "../object-helpers";


const SET_CARS = 'user/SET_CARS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'user/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'user/TOGGLE_IS_FETCHING';
const GET_IMAGE = 'GET_IMAGE'
const GET_FILTERED_CARS = 'GET_FILTERED_CARS'
const TOGGLE_IS_SUCCESS = 'profile/TOGGLE_IS_SUCCESS';

let initialState = {
    cars: [],
    filteredCars: [],
    adminCars: [],
    carsImages: [],
    followingInProgress: [],
    isFetching: false,
    isSuccess: false
}
const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARS: {
            return {...state, cars: action.cars};
        }
        case GET_IMAGE: {
            return {...state, carsImages: action.carsImages}
        }
        case GET_FILTERED_CARS:
            return {...state, filteredCars: action.filteredCars}
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUserCount: action.count};
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        case TOGGLE_IS_SUCCESS: {
            return {...state, isSuccess: action.isSuccess};
        }
        default:
            return state;
    }
}
export const setCars = (cars) => ({type: SET_CARS, cars: cars});
export const getImage = (carsImages) => ({type: GET_IMAGE, carsImages})
export const getFilteredCars = (filteredCars) => ({type: GET_FILTERED_CARS, filteredCars})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsSuccess = (isSuccess) => ({type: TOGGLE_IS_SUCCESS, isSuccess});

export const requestCars = () => async (dispatch) => {
        //dispatch(toggleIsFetching(true))
        const data = await carsAPI.getCars();
        dispatch(setCars(data));
        //dispatch(toggleIsFetching(false))
}
export const filterCars = (data) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const filteredCars = [];
    const responses = await carsAPI.getCars();
    debugger
    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        if (
            (!data.vehicle || data.vehicle === response.vehicle) &&
            (!data.brand || data.brand === response.brand) &&
            (!data.model || data.model === response.model) &&
            (!data.fuel || data.fuel === response.fuel) &&
            (!data.graduationYearFrom || data.graduationYearFrom <= response.graduationYear) &&
            (!data.graduationYearTo || data.graduationYearTo >= response.graduationYear) &&
            (!data.transmission || data.transmission === response.transmission) &&
            (!data.city || data.city === response.city) &&
            (!data.priceFrom || data.priceFrom <= response.price) &&
            (!data.priceTo || data.priceTo >= response.price) &&
            (!data.priceTo || data.priceTo >= response.price)
        ) {
            filteredCars.push(response);
        }
    }
    debugger
    dispatch(getFilteredCars(filteredCars))
    dispatch(toggleIsFetching(false))
}

/*export const getCarImage = (carId) => async (dispatch) => {
    debugger
    const response = await carsAPI.getCarProfilePhoto(carsId);
        dispatch(getImage(response.data))

}*/
export const getAllCarImage = () => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await carsAPI.getCarsPhotos();
        dispatch(getImage(response.data))
    dispatch(toggleIsFetching(false))
}

export const bookACar = (data) => async (dispatch) => {

    await carsAPI.bookCar(data)
    dispatch(toggleIsSuccess(true))
}

export const sendCarAdmin = (data) => async (dispatch) => {
    const response = await carsAPI.sendCarToAdmin(data)
}

export const deleteCarThunk = (carId) => async (dispatch) => {
    const response = await carsAPI.deleteCar(carId)
    dispatch(getAllCarImage())
}
export const deleteCarImageThunk = (carId) => async (dispatch) => {
    const response = await carsAPI.deleteCarImage(carId)
}
export default carsReducer;