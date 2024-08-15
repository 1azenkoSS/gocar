import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Snackbar,
    Switch, TextField,
    Typography
} from '@mui/material';
import {Field, Formik} from 'formik';
import AnimateButton from '../components/@extended/AnimateButton';
import {fuel, transmission, vehicle, wheelDrive} from "../utils/CarSelects";
import {DatePicker} from 'antd';
import {useNavigate} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';
import * as Yup from "yup";
import locale from 'antd/es/date-picker/locale/uk_UA';
import moment from "moment/moment";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const style = {
    label: {
        float: 'left',
        width: '200px',
        display: 'inline'
    },
    context: {
        display: 'block',
        marginBottom: '10px',
    },
}
const AddCar = (props) => {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [sendForm, setSendForm] = useState(null)
    const {RangePicker} = DatePicker
    const [images, setImages] = useState([])
    const handleImageChange = (event) => {
        setImages(event.target.files);
    };

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );
    return (
        <>
            {props.isAdded &&
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        Ваш транспортний засіб було відправлено на
                        розгляд!
                    </Alert>
                </Snackbar>}
            <Formik
                initialValues={{
                    userName: '',
                    userSurname: '',
                    userEmail: '',
                    userPhoneNumber: '+380',
                    vehicle: '',
                    brand: '',
                    model: '',
                    engineCapacity: '',
                    fuel: '',
                    horsepower: '',
                    transmission: '',
                    wheelDrive: '',
                    graduationYear: '',
                    odometer: '',
                    color: '',
                    description: '',
                    withDriver: false,
                    city: '',
                    price: '',
                    vincode: '',
                    dates: [],

                }}
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
                    withDriver: Yup.boolean(),
                    vincode: Yup.string().required("Обов'язково для заповнення"),
                    description: Yup.string().required("Обов'язково для заповнення"),
                    ...(!props.isAuth && {
                        userName: Yup.string().required("Обов'язково для заповнення"),
                        userSurname: Yup.string().required("Обов'язково для заповнення"),
                        userEmail: Yup.string().email("Невірний формат електронної пошти").required("Обов'язково для заповнення"),
                        userPhoneNumber: Yup.string().required("Обов'язково для заповнення"),
                    }),
                })}

                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    try {
                        setIsClicked(true);
                        const formData = new FormData();
                        for (let i = 0; i < images.length; i++) {
                            formData.append("files", images[i]);
                        }
                        props.addCar(values, props.isAuth);
                        props.savePhoto(formData, props.isAuth)
                        setTimeout(() => {
                            navigate('/cars-list'); // Replace with your desired URL
                        }, 5000);
                        handleClick()
                        setStatus({success: false});
                        setSubmitting(false);
                    } catch (err) {
                        setSendForm(2)
                        console.error(err);
                        setStatus({success: false});
                        setErrors({submit: err.message});
                        setSubmitting(false);
                    }
                }}
            >
                {({handleBlur, setFieldValue, touched, errors, handleChange, handleSubmit, isSubmitting, values}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{p: '2% 10%'}}>
                            {!props.isAuth &&
                                <Grid container>
                                    <Typography variant="h4">Форма про себе для того, щоб ми могли з Вами
                                        зв'язатись</Typography>
                                    <Grid container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Ім'я</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <OutlinedInput
                                                id="userName"
                                                sx={{width: '300px'}}
                                                value={values.userName}
                                                name="userName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.userName && errors.userName)}
                                            />
                                            {touched.userName && errors.userName && (
                                                <FormHelperText error>
                                                    {errors.userName}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Прізвище</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <OutlinedInput
                                                id="userSurname"
                                                sx={{width: '300px'}}
                                                value={values.userSurname}
                                                name="userSurname"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.userSurname && errors.userSurname)}
                                            />
                                            {touched.userSurname && errors.userSurname && (
                                                <FormHelperText error>
                                                    {errors.userSurname}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Електронна пошта</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <OutlinedInput
                                                id="userEmail"
                                                sx={{width: '300px'}}
                                                value={values.userEmail}
                                                name="userEmail"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.userEmail && errors.userEmail)}
                                            />
                                            {touched.userEmail && errors.userEmail && (
                                                <FormHelperText error>
                                                    {errors.userEmail}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item sx={style.label}>
                                            <InputLabel>Номер телефону</InputLabel>
                                        </Grid>
                                        <Grid item sx={style.context}>
                                            <OutlinedInput
                                                id="userEmail"
                                                sx={{width: '300px'}}
                                                value={values.userPhoneNumber}
                                                name="userPhoneNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.userPhoneNumber && errors.userPhoneNumber)}
                                            />
                                            {touched.userPhoneNumber && errors.userPhoneNumber && (
                                                <FormHelperText error>
                                                    {errors.userPhoneNumber}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            <Typography variant="h4">Форма для заповнення даних про транспортний засіб</Typography>
                            <Grid container>
                                <Grid item>
                                    <Button>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}/>
                                    </Button>
                                </Grid>

                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Тип транспорту</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <Select
                                        id="vehicle"
                                        type="vehicle"
                                        sx={{width: '300px'}}
                                        value={values.vehicle}
                                        name="vehicle"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.vehicle && errors.vehicle)}
                                    >
                                        {vehicle.map((elem) => (
                                            <MenuItem sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                {elem}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.vehicle && errors.vehicle && (
                                        <FormHelperText error>
                                            {errors.vehicle}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Марка</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="brand"
                                        sx={{width: '300px'}}
                                        value={values.brand}
                                        name="brand"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.brand && errors.brand)}
                                    />
                                    {touched.brand && errors.brand && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.brand}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Модель</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="model"
                                        sx={{width: '300px'}}
                                        value={values.model}
                                        name="model"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.model && errors.model)}
                                    />
                                    {touched.model && errors.model && (
                                        <FormHelperText error>
                                            {errors.model}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Рік випуску</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="graduationYear"
                                        type="graduationYear"
                                        sx={{width: '300px'}}
                                        value={values.graduationYear}
                                        name="graduationYear"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.graduationYear && errors.graduationYear)}
                                    />
                                    {touched.graduationYear && errors.graduationYear && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.graduationYear}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Об'єм двигуна</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="engineCapacity"
                                        type="number"
                                        sx={{width: '300px'}}
                                        value={values.engineCapacity}
                                        name="engineCapacity"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.engineCapacity && errors.engineCapacity)}
                                    />
                                    {touched.engineCapacity && errors.engineCapacity && (
                                        <FormHelperText error>
                                            {errors.engineCapacity}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Паливо</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <Select
                                        id="fuel"
                                        type="fuel"
                                        value={values.fuel}
                                        name="fuel"
                                        sx={{width: '300px'}}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.fuel && errors.fuel)}
                                    >
                                        {fuel.map((elem) => (
                                            <MenuItem sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                {elem}
                                            </MenuItem>
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
                                <Grid item sx={style.label}>
                                    <InputLabel>Кількість кінських сил</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="horsepower"
                                        type="horsepower"
                                        sx={{width: '300px'}}
                                        value={values.horsepower}
                                        name="horsepower"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.horsepower && errors.horsepower)}
                                    />
                                    {touched.horsepower && errors.horsepower && (
                                        <FormHelperText error>
                                            {errors.horsepower}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Коробка передач</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <Select
                                        id="transmission"
                                        type="transmission"
                                        sx={{width: '300px'}}
                                        value={values.transmission}
                                        name="transmission"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.transmission && errors.transmission)}
                                    >
                                        {transmission.map((elem) => (
                                            <MenuItem sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                {elem}
                                            </MenuItem>
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
                                <Grid item sx={style.label}>
                                    <InputLabel>Привід</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <Select
                                        id="wheelDrive"
                                        sx={{width: '300px'}}
                                        value={values.wheelDrive}
                                        name="wheelDrive"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.wheelDrive && errors.wheelDrive)}
                                    >
                                        {wheelDrive.map((elem) => (
                                            <MenuItem sx={{backgroundColor: 'white'}} key={elem} value={elem}>
                                                {elem}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.wheelDrive && errors.wheelDrive && (
                                        <FormHelperText error>
                                            {errors.wheelDrive}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Пробіг</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="odometer"
                                        value={values.odometer}
                                        name="odometer"
                                        sx={{width: '300px'}}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.odometer && errors.odometer)}
                                    />
                                    {touched.odometer && errors.odometer && (
                                        <FormHelperText error>
                                            {errors.odometer}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Колір</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="color"
                                        value={values.color}
                                        name="color"
                                        sx={{width: '300px'}}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.color && errors.color)}
                                    />
                                    {touched.color && errors.color && (
                                        <FormHelperText error>
                                            {errors.color}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Місто</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="city"
                                        type="city"
                                        value={values.city}
                                        name="city"
                                        sx={{width: '300px'}}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.city && errors.city)}
                                    />
                                    {touched.city && errors.city && (
                                        <FormHelperText error>
                                            {errors.city}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>

                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>Ціна</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="price"
                                        type="price"
                                        value={values.price}
                                        sx={{width: '300px'}}
                                        name="price"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.price && errors.price)}
                                    />
                                    {touched.price && errors.price && (
                                        <FormHelperText error>
                                            {errors.price}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>VIN код</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <OutlinedInput
                                        id="vincode"
                                        value={values.vincode}
                                        name="vincode"
                                        sx={{width: '300px'}}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.vincode && errors.vincode)}
                                    />
                                    {touched.vincode && errors.vincode && (
                                        <FormHelperText error>
                                            {errors.vincode}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item sx={style.label}>
                                    <InputLabel>З водієм</InputLabel>
                                </Grid>
                                <Grid item sx={style.context}>
                                    <Field name="withDriver">
                                        {({field}) => (
                                            <FormControlLabel
                                                control={<Switch {...field} color="primary"/>}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                            </Grid>
                           <Box>
                                <Grid container>
                                    <Grid item sx={style.label}>
                                        <InputLabel>Дата</InputLabel>
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
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Grid container alignItems="center">
                                <InputLabel>Опис</InputLabel>
                            </Grid>
                            <Grid container alignItems="center">
                                <TextField
                                    fullWidth
                                    onChange={handleChange}
                                    multiline
                                    rows={10}
                                    name="description"
                                    value={values.description}
                                    placeholder="Введіть опис"
                                    sx={{width: {lg: '500px', md: '500px', sm: '500px', xs: '300px'}}}
                                    error={Boolean(touched.description && errors.description)}
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error>
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>

                        <Grid item>
                            {(sendForm === 2) &&
                                <Alert severity="error">Щось пішло не так!</Alert>
                            }
                        </Grid>
                        <Grid item>
                                <Button
                                    sx={{marginLeft: '10%'}}
                                    disableElevation
                                    disabled={isClicked}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    {props.isAuth ? "Додати автомобіль" : "Відправити заявку"}
                                </Button>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}


export default AddCar;