import {Box, Button, Grid, IconButton, Typography} from "@mui/material";
import React, {useState} from "react";
import CarSlider from "./CarSlider";
import AnimateButton from "../components/@extended/AnimateButton";
import {useStylesCarProfile} from "./../utils/CSS";
import EditIcon from '@mui/icons-material/Edit';
import EvStationIcon from "@mui/icons-material/EvStation";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import WheelDrive from "../assets/images/carProfile//wheelDrive.svg"
import SettingsIcon from '@mui/icons-material/Settings';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RentCarForm from "./RentCarForm";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const CarProfileData = ({carProfile, setEditMode, isAuth, ...props}) => {
    const style = useStylesCarProfile();

    const handleClick = () => {
        props.setRent(true)
    }

    return (
        <>

            <Grid container sx={{lineHeight: '50px', padding: 2}}>
                <Grid item>
                    <CarSlider carProfileImage={props.carProfileImage}/>
                </Grid>
                <Grid item>
                    {isAuth &&
                        <Box>
                            <IconButton sx={{float: 'right'}} color="primary" variant="outlined"
                                        onClick={() => setEditMode(true)}>
                                <EditIcon/>
                            </IconButton>
                        </Box>
                    }
                    <Typography className={style.main} variant="h1">
                        {carProfile.brand + ' '}
                        {carProfile.model + ' '}
                        {carProfile.graduationYear + ' '}
                    </Typography>
                    <hr/>
                    <Box sx={{padding: '5px 0'}}>
                        <Typography className={style.label}>
                            {carProfile.fuel == 'Електро' ? <EvStationIcon/> :
                                <LocalGasStationIcon/>}Двигун</Typography>
                        <Typography className={style.context}>

                            {carProfile.fuel + ' | '}
                            {carProfile.fuel != 'Електро' && carProfile.engineCapacity + 'л' + ' ('
                                + carProfile.horsepower + 'к.с.)'}
                        </Typography>
                    </Box>
                    <Box sx={{padding: '5px 0'}}>
                        <Typography className={style.label}>
                            <ColorLensIcon/>
                            Колір
                        </Typography>
                        <Typography className={style.context}>
                            {carProfile.color}
                        </Typography>
                    </Box>
                    <Box sx={{padding: '5px 0'}}>
                        <Typography className={style.label}>
                            <SettingsIcon/>
                            Коробка передач
                        </Typography>
                        <Typography className={style.context}>
                            {carProfile.transmission}
                        </Typography>
                    </Box>
                    <Box sx={{padding: '5px 0'}}>
                        <Typography className={style.label}>
                            <LocationOnOutlinedIcon/>
                            Місто
                        </Typography>
                        <Typography className={style.context}>

                            {carProfile.city}
                        </Typography>
                    </Box>

                    <Box sx={{padding: '5px 0'}}>
                        <Typography className={style.label}>
                            <img width="25px" src={WheelDrive} alt="#"/>
                            Привід
                        </Typography>
                        <Typography className={style.context}>
                            {carProfile.wheelDrive}
                        </Typography>
                    </Box>
                    {(isAuth && !props.isOwn) &&
                        <Box>
                            <Box sx={{padding: '5px 0'}}>
                                <Typography className={style.label}>
                                    Vin код
                                </Typography>
                                <Typography className={style.context}>
                                    {carProfile.vincode}
                                </Typography>
                            </Box>
                            <Box sx={{padding: '5px 0'}}>
                                <Typography className={style.label}>
                                    Пробіг
                                </Typography>
                                <Typography className={style.context}>
                                    {carProfile.odometer} км
                                </Typography>
                            </Box>
                        </Box>

                    }
                    <hr/>
                    {carProfile.withDriver ?
                        <Typography sx={{display: 'flex', alignItems: 'center'}}>
                            <PersonAddIcon/>
                            З водієм
                        </Typography>
                        : <Typography sx={{display: 'flex', alignItems: 'center'}}>
                            <TimeToLeaveIcon/>
                            Без водія
                        </Typography>
                    }
                    <hr/>
                    <Typography className={style.label} variant="h4">Ціна</Typography>
                    <Typography className={style.context} variant="h2">
                        {carProfile.price}
                        &#8372;/дн.
                    </Typography>

                    <AnimateButton>{!isAuth ?
                        <Button
                            disableElevation
                            disabled={props.isSuccess}
                            onClick={handleClick}
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary">
                            Забронювати
                        </Button>
                        : !props.isOwn ? <Button variant="contained" href="https://localhost:3000/free/cars-list"
                                  onClick={props.addCarFunc}>
                            Додати автомобіль
                        </Button>: null
                    }
                    </AnimateButton>
                </Grid>
                <Box sx={{border: '1px solid #E1E1E1', borderRadius: 2, padding: 3, width: '100%'}}>
                    {(isAuth && !props.isOwn) && <Box>
                        <Typography variant="h3">Дані орендодавця</Typography>
                        <Typography>
                            {carProfile.userName + " "}
                            {carProfile.userSurname}
                        </Typography>
                        <Typography>
                            Електронна пошта: {carProfile.userEmail}
                        </Typography>
                        <Typography>
                            Номер телефону: {carProfile.userPhoneNumber}
                        </Typography>
                    </Box>
                    }
                    <Typography variant="h3">Опис</Typography>
                    <Typography>
                        {carProfile.description}
                    </Typography>
                </Box>

            </Grid>
            <RentCarForm setOpen={props.setOpen} carId={carProfile.carId}
                         bookACar={props.bookACar} setRent={props.setRent} rent={props.rent}/>

        </>
    )
}
export default CarProfileData