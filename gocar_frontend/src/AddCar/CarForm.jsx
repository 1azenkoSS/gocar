import React from "react"
import {
    FormControl, FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const CarForm = (props) => {


    return <>
        <Grid item sx={{color: 'black'}}>
            <Stack spacing={1}>
                <Typography>{props.title}</Typography>
                {props.type == "select" ?
                <FormControl sx={{width: 250}}>
                    <InputLabel id="demo-simple-select-label">{props.placeholder}</InputLabel>
                    <Select
                        sx={{backgroundColor: 'white'}}
                        labelId={props.name}
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        onChange={props.handleChange}
                    >
                        {props.obj != "obj" ?
                            props.object.map((elem) => (
                                <MenuItem
                                    sx={{backgroundColor: 'white'}}
                                    key={elem}
                                    value={elem}
                                >
                                    {elem}
                                </MenuItem>
                            )) :
                            props.object.map((elem) => (
                                <MenuItem
                                    sx={{backgroundColor: 'white'}}
                                    key={elem[props.name]}
                                    value={elem[props.name]}
                                >
                                    {elem[props.name]}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                : <FormControl sx={{m: 1, width: 250}}>
                        <TextField
                            sx={{backgroundColor:'white'}}
                            type={props.dataType}
                            placeholder={props.placeholder}
                            labelId={props.name}
                            id={props.name}
                            name={props.name}
                            value={props.value}
                            onChange={props.handleChange}
                        >
                            <MenuItem/>
                        </TextField>
                    </FormControl>
                }
            </Stack>
        </Grid>
    </>
}

export default CarForm;