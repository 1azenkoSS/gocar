import React, {useEffect} from 'react'
import RentCarList from "./RentCarList";
import {connect} from "react-redux";
import {deleteRentCarData, deleteRentCarImage, getCarForRent, getCarForRentImages} from "../redux/admin-reducer";
import {compose} from "redux";
import {initializeApp} from "../redux/app-reducer";
import Loader from "../components/Loader";

const RentCarListContainer = (props ) => {
    useEffect(() => {
        props.getCarForRent()
        props.getCarForRentImages()
    },[])

    return (
        <>
            {props.isFetching ? <Loader/> :
            <RentCarList deleteRentCarData={props.deleteRentCarData} isAuth={props.isAuth}
                         getCarForRent={props.getCarForRent} carsForRent={props.carsForRent}
                         deleteRentCarImage={props.deleteRentCarImage} carsAllImages={props.carsAllImages}
            />}
        </>
    )
}

const mapStateToProps = (state) => ({
    carsForRent: state.admin.carsForRent,
    isAuth: state.auth.isAuth,
    carsAllImages: state.admin.carsAllImages,
    isFetching: state.admin.isFetching
})

export default compose(connect(mapStateToProps, {getCarForRent, deleteRentCarData,
    deleteRentCarImage,getCarForRentImages}),
)(RentCarListContainer);