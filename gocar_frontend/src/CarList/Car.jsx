import React, {useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Link, Paper, Typography} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LocalGasStationSharpIcon from '@mui/icons-material/LocalGasStationSharp';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const style = {
    display: 'flex', alignItems: 'center',
}

const Car = ({profile, cars, carsImages, deleteCar, deleteCarImage, isAuth}) => {
    const [open, setOpen] = useState(false);

    let carImage = null;
    for (let i = 0; i < carsImages.length; i++) {
        if (carsImages[i].imageId === cars.carId) {
            carImage = carsImages[i];
            break; // вихід з циклу після знайдення першої фотографії
        }
    }

    const handleDeleteCar = () => {
        setOpen(false)
        deleteCar(cars.carId)
        deleteCarImage(cars.carId)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <Box sx={{margin: 1, width: 350, float: 'left', cursor: 'pointer'}}>
            {isAuth &&
                <Box sx={{position: 'absolute'}}>
                    <IconButton onClick={handleClickOpen} color="error">
                        <RemoveCircleIcon/>
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Ви точно хочете видалити цей автомобіль?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>Ні</Button>
                            <Button onClick={handleDeleteCar}>
                                Так
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>}
            <Link underline="none" href={profile + cars.carId}>
                <Paper elevation={4} square sx={{
                    width: 350,
                    minWidth: 240,
                    maxWidth: 500,
                    borderRadius: 3,
                    overflow: 'hidden',
                }}>
                    {carImage &&
                        <Box
                            component="img"
                            sx={{
                                height: 220,
                                width: 350,
                                maxHeight: 220,
                                maxWidth: 400,
                                objectFit: "cover",
                            }}
                            src={`data:image/png;base64,${carImage.imageData}`}
                        />
                    }
                    <Box sx={{padding: 2,}}>
                            <Typography variant="h5">
                                {cars.brand + ' '}
                                {cars.model + ' '}
                                {cars.graduationYear}
                            </Typography>
                        <hr/>
                            <Typography sx={style}>
                                {cars.fuel == 'Електро' ?
                                    <>
                                        <EvStationOutlinedIcon/>
                                        {cars.fuel}
                                    </>
                                     :
                                    <>
                                        <LocalGasStationSharpIcon/>
                                        {cars.fuel + ', ' + cars.engineCapacity + 'л' + ' ('
                                            + cars.horsepower + 'к.с.)'}
                                    </>
                                    }

                            </Typography>
                            <Typography sx={style}>
                                <LocationOnOutlinedIcon/>
                                {cars.city}
                            </Typography>
                            <Typography color="#3C9806" fontSize="20px" fontWeight="bold">

                                {cars.price + "₴ / день"}
                            </Typography>
                    </Box>

                </Paper>
            </Link>
        </Box>
    </>
}
export default Car;