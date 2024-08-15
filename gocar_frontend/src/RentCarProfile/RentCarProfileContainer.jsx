import React, {useEffect} from "react"
import CarProfile from "../CarProfile/CarProfile";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {
    addCar,
    changeDataRentCar,
    copyCarData,
    getCarForRentProfileImage,
    getRentCarProfileTC,
    savePhoto
} from "../redux/admin-reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../utils/WithAuthRedirect";
import Loader from "../components/Loader";

const RentCarProfileContainer = (props) => {
    const {carId} = useParams();

    useEffect(() => {
        props.getRentCarProfileTC(carId)
        props.getCarForRentImage(carId)
    }, [])
    const addCarFunc = () => {
        props.copyCarData(carId)
    }


    return (
        <>
            {props.isFetching ? (
            <Loader/>
        ) : (
            <CarProfile
                isRent={true}
                addCarFunc={addCarFunc}
                initializeApp={props.initializeApp}
                addCar={props.addCar}
                changeDataCar={props.changeDataRentCar}
                carProfileImage={props.carForRentImage}
                carProfile={props.carForRentProfile}
                carId={carId}
                isAuth={props.isAuth}
            />)}
        </>
    )
}

const mapStateToProps = (state) => ({
    carsForRent: state.admin.carsForRent,
    carForRentProfile: state.admin.carForRentProfile,
    isAuth: state.auth.isAuth,
    carForRentImage: state.admin.carForRentImage,
    isFetching: state.admin.isFetching
})

export default compose(
    connect(mapStateToProps, {
        getRentCarProfileTC,
        changeDataRentCar, addCar, savePhoto, getCarForRentImage: getCarForRentProfileImage, copyCarData
    }),
    //WithAuthRedirect
)(RentCarProfileContainer);