import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getCarProfile, getCarProfilePhotoThunk,} from "../redux/car-profile-reducer";
import {useParams} from "react-router-dom";
import CarProfile from "./CarProfile";
import Loader from "../components/Loader";
import {changeDataCar} from "../redux/admin-reducer";
import {initializeApp} from "../redux/app-reducer";
import {bookACar} from "../redux/cars-reducer";

const CarProfileContainer = (props) => {
    const {carId} = useParams();
    const [booking, setBooking] = useState(false)

    useEffect(() => {
        props.getCarProfile(carId)
        props.getCarProfilePhotoThunk(carId);
    }, [booking])

    return (
        <>
            {props.isFetching ? (
                <Loader />
            ) : (
                <CarProfile
                    booking={booking}
                    setBooking={setBooking}
                    isSuccess={props.isSuccess}
                    bookACar={props.bookACar}
                    initializeApp={props.initializeApp}
                    isFetching={props.isFetching}
                    carProfileImage={props.carProfileImage}
                    carProfile={props.carProfile}
                    cars={props.cars}
                    carId={carId}
                    isAuth={props.isAuth}
                    isOwn={'yes'}
                    changeDataCar={props.changeDataCar}
                />)}
        </>

    )
}


let mapStateToProps = (state) => ({
    cars: state.carsPage.cars,
    carProfile: state.carProfilePage.carProfile,
    carProfileImage: state.carProfilePage.carProfileImage,
    isFetching: state.carProfilePage.isFetching,
    isAuth: state.auth.isAuth,
    isSuccess: state.carsPage.isSuccess
})

export default connect(mapStateToProps, {
    getCarProfile,
    getCarProfilePhotoThunk,
    changeDataCar,
    initializeApp,
    bookACar
})
(CarProfileContainer)



