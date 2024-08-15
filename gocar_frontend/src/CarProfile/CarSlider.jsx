import React, {useState} from 'react'
import Arrow from "./Slider/Arrow";
import {Box, useMediaQuery} from "@mui/material";
import CarouselSlide from "./Slider/CarouselSlide";
import {useTheme} from "@mui/material/styles";


const CarSlider = (props) => {

    const SLIDE_INFO = (props.carProfileImage.map((image) => ({image})));

    const [index, setIndex] = useState(0);
    const content = SLIDE_INFO[index];
    const numSlides = SLIDE_INFO.length;

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        setIndex(newIndex);
    };

    return (
        <>
            <Box sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Arrow
                    direction='left'
                    clickFunction={() => onArrowClick('left')}
                />
                <CarouselSlide content={content}/>
                <Arrow
                    direction='right'
                    clickFunction={() => onArrowClick('right')}
                />
            </Box>

        </>
    )
}
export default CarSlider;