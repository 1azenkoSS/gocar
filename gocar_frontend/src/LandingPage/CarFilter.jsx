import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import CarForm from "../AddCar/CarForm";
import {Formik} from "formik";
import AnimateButton from "../components/@extended/AnimateButton";
import SearchIcon from '@mui/icons-material/Search';
import {fuel, transmission, vehicle} from "../utils/CarSelects";
import {Navigate} from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import {DatePicker} from "antd";
import {useTheme} from "@mui/material/styles";

const CarFilter = (props) => {
    const [filter, setFilter] = useState(false)
    const theme = useTheme();
    if (filter)
        return <Navigate to="/cars-list"/>

    const {RangePicker} = DatePicker

    return (
        <>

            <Formik
                initialValues={{
                    vehicle: '',
                    brand: '',
                    model: '',
                    fuel: '',
                    transmission: '',
                    graduationYearFrom: '',
                    graduationYearTo: '',
                    city: '',
                    priceFrom: '',
                    priceTo: '',
                    dates: [],
                }}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    props.filterCars(values)
                    setFilter(true)
                }}
            >
                {({setFieldValue, touched, errors, handleChange, handleSubmit, isSubmitting, values}) => (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            backgroundColor: "white", padding: '30px', margin: '0 auto',
                            border: '1px solid black', borderRadius: 5, width: {xs: 300, sm: 600}
                        }}>
                            <Grid container spacing={3} display="flex" justifyContent="space-between">
                                <CarForm
                                    type="select"
                                    value={values.vehicle}
                                    handleChange={handleChange}
                                    name={'vehicle'}
                                    object={vehicle}
                                    placeholder='Тип транспорту'
                                />
                                <Grid item>
                                    <Stack spacing={1}>
                                        <Typography></Typography>
                                        <FormControl sx={{ width: 250 }}>
                                            <InputLabel>Марка</InputLabel>
                                            <Select
                                                sx={{ backgroundColor: 'white' }}
                                                labelId={'brand'}
                                                id={'brand'}
                                                name={'brand'}
                                                value={values.brand}
                                                onChange={handleChange}
                                            >
                                                {props.cars.reduce((uniqueBrands, elem) => {
                                                    if (elem.vehicle === values.vehicle && !uniqueBrands.includes(elem.brand)) {
                                                        uniqueBrands.push(elem.brand);
                                                    }
                                                    return uniqueBrands;
                                                }, []).sort().map((brand) => (
                                                    <MenuItem
                                                        sx={{ backgroundColor: 'white' }}
                                                        key={brand}
                                                        value={brand}
                                                    >
                                                        {brand}
                                                    </MenuItem>
                                                ))}
                                                {!props.cars.some((elem) => elem.vehicle === values.vehicle) && (
                                                    <MenuItem sx={{ backgroundColor: 'white' }} value="">
                                                        Виберіть тип транспорту
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>

                                <Grid item>
                                    <Stack spacing={1}>
                                        <Typography></Typography>
                                        <FormControl sx={{ width: 250 }}>
                                            <InputLabel>Модель</InputLabel>
                                            <Select
                                                sx={{ backgroundColor: 'white' }}
                                                labelId={'model'}
                                                id={'model'}
                                                name={'model'}
                                                value={values.model}
                                                onChange={handleChange}
                                            >
                                                {props.cars.reduce((uniqueBrands, elem) => {
                                                    if (elem.brand === values.brand && !uniqueBrands.includes(elem.model)) {
                                                        uniqueBrands.push(elem.model);
                                                    }
                                                    return uniqueBrands;
                                                }, []).sort().map((model) => (
                                                    <MenuItem
                                                        sx={{ backgroundColor: 'white' }}
                                                        key={model}
                                                        value={model}
                                                    >
                                                        {model}
                                                    </MenuItem>
                                                ))}
                                                {!props.cars.some((elem) => elem.brand === values.brand) && (
                                                    <MenuItem sx={{ backgroundColor: 'white' }} value="">
                                                        Виберіть марку
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>

                                <CarForm
                                    type="select"
                                    value={values.fuel}
                                    handleChange={handleChange}
                                    object={fuel}
                                    name={'fuel'}
                                    placeholder='Паливо'
                                />
                                <CarForm
                                    dataType='number'
                                    value={values.graduationYearFrom}
                                    handleChange={handleChange}
                                    name={'graduationYearFrom'}
                                    placeholder='Рік випуску від'
                                />
                                <CarForm
                                    dataType='number'
                                    value={values.graduationYearTo}
                                    handleChange={handleChange}
                                    name={'graduationYearTo'}
                                    placeholder='Рік випуску до'
                                />
                                <Grid item>
                                    <Stack spacing={1}>
                                        <Typography></Typography>
                                        <FormControl sx={{ width: 250 }}>
                                            <InputLabel>Місто</InputLabel>
                                            <Select
                                                id={'city'}
                                                name={'city'}
                                                value={values.city}
                                                onChange={handleChange}
                                            >
                                                {props.cars.reduce((uniqueBrands, elem) => {
                                                    if (!uniqueBrands.includes(elem.city)) {
                                                        uniqueBrands.push(elem.city);
                                                    }
                                                    return uniqueBrands;
                                                }, []).sort().map((city) => (
                                                    <MenuItem
                                                        sx={{ backgroundColor: 'white' }}
                                                        key={city}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <CarForm
                                    type="select"
                                    object={transmission}
                                    value={values.transmission}
                                    handleChange={handleChange}
                                    name={"transmission"}
                                    placeholder="Коробка передач"/>
                                <CarForm
                                    dataType="number"
                                    value={values.priceFrom}
                                    handleChange={handleChange}
                                    name={"priceFrom"}
                                    placeholder="Ціна від"/>
                                <CarForm
                                    dataType="number"
                                    value={values.priceTo}
                                    handleChange={handleChange}
                                    name={"priceTo"}
                                    placeholder="Ціна до"/>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            <SearchIcon/>
                                            Пошук
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}
export default CarFilter;