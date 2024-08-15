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

    return <>
        <Box sx={{margin: 1, width: 350, float: 'left', cursor: 'pointer'}}>
            <Link  underline="none" href={"free/" + profile + cars.carId}>
                    {carImage &&
                        <Box
                            component="img"
                            sx={{
                                borderRadius:3,
                                height: 220,
                                width: 350,
                                maxHeight: 220,
                                maxWidth: 400,
                                objectFit: "cover",
                            }}
                            src={`data:image/png;base64,${carImage.imageData}`}
                        />
                    }
            </Link>
        </Box>
    </>
}
export default Car;