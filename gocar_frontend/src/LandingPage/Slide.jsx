import React from 'react';
import Loader from "../../components/Loader";
import {Box} from "@mui/material";

export default function CarouselSlide(props) {
    const classes = {
        container: {
            maxWidth: '100%',
            width: '800px',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        image: {
            width: '800px',
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'cover',
        },
    };

    return (
        <Box className={classes.container}>
            {props.content?.image && (
                <img
                    src={`data:image/png;base64,${props.content.image}`}
                    alt={`#`}
                    style={classes.image}
                />
            )}
            {!props.content?.image && <Loader />}
        </Box>
    );
}