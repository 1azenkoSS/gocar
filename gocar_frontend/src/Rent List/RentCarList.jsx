import React from 'react';
import Car from "../CarList/Car";

const RentCarList = (props) => {
debugger
    return (
        <>
            {props.carsForRent.slice(0).reverse().map(c => <Car key={c.id}
                                                                cars={c}
                                                                carsImages={props.carsAllImages}
                                                                isAuth={props.isAuth}
                                                                deleteCar={props.deleteRentCarData}
                                                                deleteCarImage={props.deleteRentCarImage}
                                                                filterCars={props.filterCars}
                                                                profile={"admin-car-profile/"}
            />)}
        </>
    )
}
export default RentCarList;