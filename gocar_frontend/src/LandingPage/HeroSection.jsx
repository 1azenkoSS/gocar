import {Box, Button, Grid, Typography, useMediaQuery} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import cars from "../assets/images/LandingPage/cars.png";
import carsMobile from "../assets/images/LandingPage/carsd.png";
import React from "react";
import {Navigate} from "react-router-dom";
import {useStylesHeroSection} from "../utils/CSS";
import {useTheme} from "@mui/material/styles";

const HeroSection = () => {
    const style = useStylesHeroSection();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid container sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{width:'45%',[theme.breakpoints.down('sm')]: {
                    width: '100%',
                }, paddingLeft: '5%'}}>
                <Typography className={style.main} variant="body1">
                    Знайдіть ідеальний транспорт для своїх потреб з нашою платформою з оренди
                    транспорту!
                </Typography>
                <Typography className={style.caption} variant="caption">
                    Орендуйте транспортний засіб будь якого виду! Але наш сервіс не обмежується
                    лише орендою транспорту. Якщо ви є власником транспортного засобу та хочете
                    заробити на його здачі в оренду, наша платформа пропонує чудовий спосіб це зробити.
                </Typography>
                <Box sx={{padding: 2}}>
                    <Button className={style.caption} sx={{margin: 2}}
                            variant="contained" href="free/cars-list" startIcon={<FormatListBulletedIcon/>}>
                        Перелік транспорту
                    </Button>
                    <Button className={style.caption} href="free/add-car" variant="outlined">Здати в оренду</Button>
                </Box>

            </Box>
            {isMobile ? (
                <Box
                    component="img"
                    sx={{
                        display: 'inline',
                        width: '100%',
                    }}
                    src={carsMobile}
                />
            ) : (
                <Box
                    component="img"
                    sx={{
                        maxWidth: '55%',
                        height: '55%',
                    }}
                    src={cars}
                />
            )}
        </Grid>
    )
}
export default HeroSection;