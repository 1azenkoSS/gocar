import {Alert, Box, FormControlLabel, FormHelperText, Grid, InputLabel, TextField, useMediaQuery,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useStylesCarProfile} from "./../utils/CSS";
import {Field, Formik} from "formik";
import {fuel, transmission, vehicle, wheelDrive} from "../utils/CarSelects";
import * as Yup from "yup";
import {Button, DatePicker, Input, Modal, Select, Switch} from "antd";
import locale from 'antd/es/date-picker/locale/uk_UA';
import dayjs from "dayjs";
import {initializeApp} from "../redux/app-reducer";
import {useTheme} from "@mui/material/styles";
import mediaQuery from 'css-mediaquery';

const CarProfileDataForm = ({carProfile, setEditMode, changeDataCar, ...props}) => {
    const {Option} = Select;
    const [sendForm, setSendForm] = useState(null)

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const wrapper = !matchDownMD ? '50%' : '90%';

    const handleCancel = () => {
        setEditMode(false);
    };
    const style = useStylesCarProfile();

    return (
        <>
            <Modal title="Для подання заявки на бронювання - заповніть форму"
                   okText="Відправити заявку" cancelText="Скасувати" footer={null}
                   width={wrapper}
                   open={props.editMode} onCancel={handleCancel}>
                <Formik
                    initialValues={{...carProfile, dates: [dayjs(carProfile.startDate), dayjs(carProfile.endDate)]}}
                    validationSchema={Yup.object().shape({
                        vehicle: Yup.string().required("Обов'язково для заповнення"),
                        brand: Yup.string().required("Обов'язково для заповнення"),
                        model: Yup.string().required("Обов'язково для заповнення"),
                        engineCapacity: Yup.number().required("Обов'язково для заповнення"),
                        fuel: Yup.string().required("Обов'язково для заповнення"),
                        horsepower: Yup.number().required("Обов'язково для заповнення"),
                        transmission: Yup.string().required("Обов'язково для заповнення"),
                        wheelDrive: Yup.string().required("Обов'язково для заповнення"),
                        graduationYear: Yup.number().required("Обов'язково для заповнення"),
                        odometer: Yup.number().required("Обов'язково для заповнення"),
                        color: Yup.string().required("Обов'язково для заповнення"),
                        city: Yup.string().required("Обов'язково для заповнення"),
                        price: Yup.number().required("Обов'язково для заповнення"),
                        vincode: Yup.string().required("Обов'язково для заповнення"),
                        ...(!props.isAuth && {
                            userName: Yup.string().required("Обов'язково для заповнення"),
                            userSurname: Yup.string().required("Обов'язково для заповнення"),
                            userEmail: Yup.string().email("Невірний формат електронної пошти").required("Обов'язково для заповнення"),
                            userPhoneNumber: Yup.string().required("Обов'язково для заповнення"),
                        }),
                    })}
                    onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                        try {
                            changeDataCar(carProfile.carId, values)
                            setEditMode(false);
                            setStatus({success: false});
                            setSubmitting(false);
                            // Виконувати логіку відправки форми
                        } catch (err) {
                            setStatus({success: false});
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                          handleBlur,
                          handleSubmit,
                          touched,
                          errors,
                          handleChange,
                          values
                      }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={3} sx={{padding: '30px 40px'}}>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Тип транспорту</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Select
                                            id="vehicle"
                                            style={{width: '300px'}}
                                            name="vehicle"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.vehicle}
                                        >
                                            {vehicle.map((item) => (
                                                <Option key={item} label={item} value={item}>
                                                    {item}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Марка</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="brand"
                                            style={{width: '300px'}}
                                            value={values.brand}
                                            name="brand"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.brand && errors.brand)}
                                        />
                                        {touched.brand && errors.brand && (
                                            <FormHelperText error>
                                                {errors.brand}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Модель</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="model"
                                            style={{width: '300px'}}
                                            value={values.model}
                                            name="model"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.model && errors.model && (
                                            <FormHelperText error>
                                                {errors.model}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Рік випуску</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="graduationYear"
                                            type="number"
                                            style={{width: '300px'}}
                                            value={values.graduationYear}
                                            name="graduationYear"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.graduationYear && errors.graduationYear && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.graduationYear}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Об'єм двигуна</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="engineCapacity"
                                            type="number"
                                            style={{width: '300px'}}
                                            value={values.engineCapacity}
                                            name="engineCapacity"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.engineCapacity && errors.engineCapacity && (
                                            <FormHelperText error>
                                                {errors.engineCapacity}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Паливо</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Select
                                            id="fuel"
                                            value={values.fuel}
                                            name="fuel"
                                            style={{width: '300px'}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {fuel.map((elem) => (
                                                <Select.Option sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                    {elem}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {touched.fuel && errors.fuel && (
                                            <FormHelperText error>
                                                {errors.fuel}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Кількість кінських сил</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="horsepower"
                                            type="number"
                                            style={{width: '300px'}}
                                            value={values.horsepower}
                                            name="horsepower"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.horsepower && errors.horsepower && (
                                            <FormHelperText error>
                                                {errors.horsepower}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Коробка передач</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Select
                                            id="transmission"
                                            style={{width: '300px'}}
                                            value={values.transmission}
                                            name="transmission"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {transmission.map((elem) => (
                                                <Select.Option sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                    {elem}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {touched.transmission && errors.transmission && (
                                            <FormHelperText error>
                                                {errors.transmission}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Привід</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Select
                                            id="wheelDrive"
                                            style={{width: '300px'}}
                                            value={values.wheelDrive}
                                            name="wheelDrive"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {wheelDrive.map((elem) => (
                                                <Select.Option sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                    {elem}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        {touched.wheelDrive && errors.wheelDrive && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.wheelDrive}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Колір</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="color"
                                            value={values.color}
                                            name="color"
                                            style={{width: '300px'}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.color && errors.color && (
                                            <FormHelperText error>
                                                {errors.color}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Місто</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="city"
                                            value={values.city}
                                            name="city"
                                            style={{width: '300px'}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.city && errors.city && (
                                            <FormHelperText error>
                                                {errors.city}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>Ціна</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={values.price}
                                            style={{width: '300px'}}
                                            name="price"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.price && errors.price && (
                                            <FormHelperText error>
                                                {errors.price}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item className={style.label}>
                                        <InputLabel>VIN код</InputLabel>
                                    </Grid>
                                    <Grid item className={style.context}>
                                        <Input
                                            id="vincode"
                                            value={values.vincode}
                                            name="vincode"
                                            style={{width: '300px'}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.vincode && errors.vincode && (
                                            <FormHelperText error>
                                                {errors.vincode}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <InputLabel>Опис</InputLabel>
                                    </Grid>
                                    <Grid item sx={{width: '100%'}}>
                                        <TextField
                                            multiline={true}
                                            rows={15}
                                            id="description"
                                            value={values.description}
                                            name="description"
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error>
                                                {errors.description}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button onClick={handleCancel}>Cкасувати</Button>
                                </Grid>
                                <Grid item>
                                    <Button type="primary" htmlType="submit">Оновити дані</Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                {(sendForm === 2) &&
                                    <Alert severity="error">Щось пішло не так!</Alert>
                                }
                            </Grid>
                        </form>)}
                </Formik>
            </Modal>

        </>
    )
}
export default CarProfileDataForm