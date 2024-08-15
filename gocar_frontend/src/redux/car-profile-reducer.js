import {carsAPI} from "../api/api";

const SET_CAR_PROFILE = 'profile/SET_CAR_PROFILE';
const SET_CAR_PROFILE_PHOTO = 'profile/SET_CAR_PROFILE_PHOTO';
const TOGGLE_IS_FETCHING = 'profile/TOGGLE_IS_FETCHING';
const TOGGLE_IS_SUCCESS = 'profile/TOGGLE_IS_SUCCESS';

let initialState = {
    carProfile: [],
    carProfileImage: [],
    isFetching: true,
    isSuccess: false
}

const carProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAR_PROFILE: {
            return {...state, carProfile: action.carProfile}
        }
        case SET_CAR_PROFILE_PHOTO: {
            return {...state, carProfileImage: action.carPhoto}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        default:
            return state;
    }
}

const setCarProfile = (carProfile) => ({type: SET_CAR_PROFILE, carProfile});
const setCarProfilePhoto = (carPhoto) => ({type: SET_CAR_PROFILE_PHOTO, carPhoto})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getCarProfile = (userId) => async (dispatch) => {
    debugger
    dispatch(toggleIsFetching(true));
    const response = await carsAPI.getCarProfile(userId);
    dispatch(setCarProfile(response.data))
    dispatch(toggleIsFetching(false));

}
export const getCarProfilePhotoThunk = (userId) => async (dispatch) => {
    //dispatch(toggleIsFetching(true));
    const response = await carsAPI.getCarProfilePhoto(userId)
    dispatch(setCarProfilePhoto(response.data))
    //dispatch(toggleIsFetching(false));
}


export default carProfileReducer;