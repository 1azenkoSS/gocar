import {Box, CardMedia, Grid, Paper, Typography, useMediaQuery} from "@mui/material";
import securityIcon from "../security.png";
import convenientIcon from "../convenient.png"
import cashIcon from "../cash.png"
import {useTheme} from "@mui/material/styles";

const Advantages = () => {
    const styleImg = {
        height: 100
    }
    const style ={
        borderTop: '7px solid #1890FF',
        margin: '10px',
        padding: '10px 20px',
        height: '300px'
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return(
        <>

            <Grid container justifyContent="center" sx={{ ...(isMobile
                    ? {}
                    : {
                        display: 'flex',
                        position: 'relative',
                        bottom: 120,
                        height: 100
                    }),}}>
                <Grid item xs={!isMobile && 3}  spacing={1}>
                    <Paper sx={style}>
                        <img style={styleImg} alt="img" src={cashIcon}/>
                        <Typography variant="h3">Заробіток</Typography>
                       <Typography>
                           Можливість заробляти гроші, здаючи свій транспортний засіб в оренду.
                       </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={!isMobile && 3} >
                    <Paper sx={{...style, display: 'inline-block', p: 2 }}>
                        <img style={styleImg} alt={"#"} src={convenientIcon}/>
                        <Typography variant="h3">Зручність</Typography>
                        <Typography>
                            Орендарі можуть швидко та легко знайти транспортний засіб для оренди.
                            Власники автомобілів можуть здати свій транспортний засіб в оренду,
                            використовуючи цей же сервіс, що робить процес надзвичайно зручним та ефективним.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={!isMobile && 3} >
                    <Paper sx={style}>
                        <img style={styleImg} alt="img" src={securityIcon}/>
                        <Typography variant="h3">Безпека</Typography>
                        <Typography>
                            Перевірені оголошення та страховка, що покриває ризики.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
export default Advantages