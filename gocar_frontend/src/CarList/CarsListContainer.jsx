import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteCarImageThunk, deleteCarThunk, filterCars, getAllCarImage, requestCars,} from "../redux/cars-reducer";
import {getUsers} from "../redux/users-selectors";
import {Pagination, IconButton, Button, Snackbar, Alert, Box} from "@mui/material";
import Car from "./Car";
import Loader from "../components/Loader";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {Select} from "antd";

const CarsListComponent = (props) => {
    const [sortValue, setSortValue] = useState('new'); // Значение сортировки по умолчанию

    useEffect(() => {
        props.getAllCarImage();
        props.getCarsTC();
    }, [sortValue]);

    const handleSortChange = (event) => {
        debugger
        setSortValue(event);
    };

    const sortCarsByPrice = (a, b) => {
        if (sortValue === 'expensive') {
            return a.price - b.price;
        } else if (sortValue === 'cheap') {
            return b.price - a.price;
        } else {
            return 0; // Если значение сортировки не задано или некорректно, не менять порядок
        }
    };

    const sortedCars = [...props.cars].sort(sortCarsByPrice);

    return (
        <>
            {props.isFetching ? (
                <Loader />
            ) : (
                <Box sx={{p: { xs: 2, sm: 3 }}}>
                    <Box>
                        <Select
                            style={{ width: 250 }}
                            defaultValue={sortValue}
                            options={[
                                { value: 'new', label: 'Нові' },
                                { value: 'cheap', label: 'Від дешевого до дорогого' },
                                { value: 'expensive', label: 'Від дорогого до дешевого' },
                            ]}
                            onChange={handleSortChange}
                        />
                    </Box>
                    {(props.filteredCars.length > 0 ? props.filteredCars : sortedCars)
                        .slice(0)
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
)(CarsListComponent)
