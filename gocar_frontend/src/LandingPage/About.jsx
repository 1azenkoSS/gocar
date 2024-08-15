import style from "./Photo.module.css"
import {Box, Grid, Typography, useMediaQuery} from "@mui/material";
import Advantages from "./Advantages";
import {useStylesAdvantages, useStylesHeroSection} from "../utils/CSS";
import {useTheme} from "@mui/material/styles";

const About = () => {
    const styles = useStylesAdvantages();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <Box className={style.bg} sx={{ height: (!isMobile ? '500px': '300px')}}>
                <Grid container>
                    <Grid item xs={!isMobile ? 5 : 10} sx={{margin: '0 auto'}}>
                        <Typography  color="primary">
                            Наш Сервіс
                        </Typography>
                        <Typography className={styles.main} >
                            У нас найкращий сервіс для оренди різного виду транспорту
                        </Typography>
                        <Typography variant="caption" sx={{color: 'gray'}}>
                            GoCar є ідеальним вибором для власників транспортних засобів та орендарів, оскільки він
                            забезпечує зручну та доступну можливість заробляти гроші на авто та швидко знаходити
                            автомобілі для оренди за прийнятною ціною.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Advantages/>
        </>
)
}
export default About