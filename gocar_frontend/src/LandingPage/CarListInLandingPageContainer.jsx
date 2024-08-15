import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteCarImageThunk, deleteCarThunk, filterCars, getAllCarImage, requestCars,} from "../redux/cars-reducer";
import {getUsers} from "../redux/users-selectors";
import {Pagination, IconButton, Button, Snackbar, Alert, Box, Typography} from "@mui/material";
import Loader from "../components/Loader";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {Select} from "antd";
import Car from "./Car";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {style} from "../AddCar/AddCar";


const CarListInLandingPageContainer = (props) => {
    const [sortValue, setSortValue] = useState('new'); // Значение сортировки по умолчанию

    useEffect(() => {
        props.getAllCarImage();
        props.getCarsTC();
    }, [sortValue]);


    const sortCarsByPrice = (a, b) => {
        if (sortValue === 'expensive') {
            return a.price - b.price;
        } else if (sortValue === 'cheap') {
            return b.price - a.price;
        } else {
            return 0;
        }
    };

    const sortedCars = [...props.cars].sort(sortCarsByPrice);

    return (
        <>
            {props.isFetching ? (
                <Loader />
            ) : (
                <Box sx={{p: { xs: 0, sm: 3 }, margin: '150px 0 300px 0' }}>
                    {(props.filteredCars.length > 0 ? props.filteredCars : sortedCars)
                        .slice(-4)
                        .reverse()
                        .map((c) => (
                            <Car
                                key={c.id}
                                cars={c}
                                carsImages={props.carsImages}
                                isAuth={props.isAuth}
                                deleteCar={props.deleteCar}
                                deleteCarImage={props.deleteCarImage}
                                filterCars={props.filterCars}
                                profile={'car-profile/'}
                            />
                        ))}
                </Box>
            )}
        </>
    );
};

let mapStateToProps = (state) => ({
    isFetching: state.carsPage.isFetching,
    cars: getUsers(state),
    carsImages: state.carsPage.carsImages,
    isAuth: state.auth.isAuth,
    filteredCars: state.carsPage.filteredCars,
})

export default connect(mapStateToProps,
    {
        getCarsTC: requestCars,
        getAllCarImage,
        deleteCar: deleteCarThunk,
        deleteCarImage: deleteCarImageThunk,
        filterCars
    }
)(CarListInLandingPageContainer)
