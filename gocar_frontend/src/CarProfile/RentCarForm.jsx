import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {Formik} from "formik";
import React, {useEffect, useRef, useState} from "react";
import {Button, DatePicker, Input, Modal} from "antd";
import {style} from "../AddCar/AddCar";
import * as Yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import locale from 'antd/es/date-picker/locale/uk_UA';
import {bookACar} from "../redux/cars-reducer";
import moment from "moment";


const RentCarForm = (props) => {
    const {RangePicker} = DatePicker;
    const handleCancel = () => {
        props.setRent(false);
    };

    const handleFormSubmit = (values) => {
        props.bookACar({...values, carId: props.carId});
        props.setOpen(true)
        props.setRent(false);
    };

    return (
        <>
            <Modal title="Для подання заявки на бронювання - заповніть форму"
                   okText="Відправити заявку" cancelText="Скасувати" footer={null}
                   open={props.rent} onCancel={handleCancel}>
                        <Formik initialValues={{
                            name: '',
                            surname: '',
                            email: '',
                            phoneNumber: '+380',
                            dates: []
                        }}
                                validationSchema={Yup.object().shape({
                                    name: Yup.string().required("Обов'язково для заповнення"),
                                    surname: Yup.string().required("Обов'язково для заповнення"),
                                    email: Yup.string().email("Невірний формат електронної пошти").required("Обов'язково для заповнення"),
                                    phoneNumber: Yup.string().required("Обов'язково для заповнення"),
                                })}
                                onSubmit={handleFormSubmit}
                        >
                            {({
                                  handleBlur,
                                  setFieldValue,
                                  touched,
                                  errors,
                                  handleChange,
                                  handleSubmit,
                                  isSubmitting,
                                  values
                              }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid sx={{marginLeft: '30px'}} container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Ім'я</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <Input
                                                id="name"
                                                sx={{width: '300px'}}
                                                value={values.name}
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.name && errors.name)}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText error>
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{marginLeft: '30px'}} container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Прізвище</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <Input
                                                id="surname"
                                                sx={{width: '300px'}}
                                                value={values.surname}
                                                name="surname"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.surname && errors.surname)}
                                            />
                                            {touched.surname && errors.surname && (
                                                <FormHelperText error>
                                                    {errors.surname}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{marginLeft: '30px'}} container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Електронна пошта</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <Input
                                                id="email"
                                                sx={{width: '300px'}}
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.email && errors.email)}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error>
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{marginLeft: '30px'}} container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Номер телефону</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <Input
                                                id="phoneNumber"
                                                sx={{width: '300px'}}
                                                value={values.phoneNumber}
                                                name="phoneNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                            />
                                            {touched.phoneNumber && errors.phoneNumber && (
                                                <FormHelperText error>
                                                    {errors.phoneNumber}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{marginLeft: '30px'}} container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Дати</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <RangePicker
                                                disabledDate={current => {
                                                    return current && current <= moment().add(0, "days");
                                                }}
                                                locale={locale}
                                                name="dates"
                                                value={values.dates}
                                                onChange={(dates) => setFieldValue('dates', dates)}
                                                error={Boolean(touched.dates && errors.dates)}
                                            />
                                            {touched.dates && errors.dates && (
                                                <FormHelperText error>
                                                    {errors.dates}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} >
                                        <Grid item>
                                            <Button>Cкасувати</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button type="primary" htmlType="submit">Забронювати</Button>
                                        </Grid>
                                    </Grid>

                                </form>
                            )}
                        </Formik>
            </Modal>
        </>
    )
}

export default RentCarForm;