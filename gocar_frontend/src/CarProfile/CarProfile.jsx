import React, {useState} from "react";
import {Alert, Button, Grid, IconButton, Snackbar} from "@mui/material";
import CarProfileData from "./CarProfileData";
import CarProfileDataForm from "./CarProfileDataForm";
import {bookACar} from "../redux/cars-reducer";
import CloseIcon from "@mui/icons-material/Close";
import {makeStyles} from '@mui/styles';

const CarProfile = (props) => {
    const [disabledBooking, setDisabledBooking] = useState(false)
    let [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(true);

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
            <Grid sx={{p: { xs: 2, sm: 3 } }} container spacing={2}>


                {editMode
                    ? <CarProfileDataForm isAuth={props.isAuth} changeDataCar={props.changeDataCar}
                                          setEditMode={setEditMode} editMode={editMode}
                                          carProfile={props.carProfile}/>
                    :
                    <CarProfileData isSuccess={props.isSuccess} addCarFunc={props.addCarFunc} disabledBooking={disabledBooking}
                                    setDisabledBooking={setDisabledBooking}
                                    setOpen={setOpen} bookACar={props.bookACar}
                                    carProfileImage={props.carProfileImage}
                                    isAuth={props.isAuth} setEditMode={setEditMode}
                                    carProfile={props.carProfile} rent={props.booking}
                                    setRent={props.setBooking} isOwn={props.isOwn}/>
                }
                {props.isSuccess && <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        Ваш запит на бронювання було надіслано!
                    </Alert>
                </Snackbar>}
            </Grid>
        </>
    )
}


export default CarProfile;