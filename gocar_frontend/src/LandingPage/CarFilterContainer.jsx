import {connect} from "react-redux";
import CarFilter from "./CarFilter";
import {filterCars, requestCars} from "../redux/cars-reducer";
import {Box} from "@mui/material";
import {useEffect} from "react";

const CarFilterContainer = (props) => {
    useEffect(() => {
        props.getCarsTC();
    }, []);
    return(
        <>
            <Box sx={{margin:'20px 0'}}>
                    <CarFilter cars={props.cars} filterCars={props.filterCars} filteredCars={props.filteredCars}/>
            </Box>
        </>
    )
}
const mapStateToProps = (state) => ({
    filteredCars: state.carsPage.filteredCars,
    cars: state.carsPage.cars
})

export default connect(mapStateToProps, {filterCars, getCarsTC: requestCars})(CarFilterContainer);