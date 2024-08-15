import React from 'react'
import HeroSection from "./HeroSection";

import CarFilterContainer from "./CarFilterContainer";
import About from "./About";
import Footer from "./Footer";
import {Box} from "@mui/material";
import CarListInLandingPageContainer from "./CarListInLandingPageContainer";


const LandingPage = () => {

    return (
        <>
            <HeroSection/>
            <CarFilterContainer/>
            <About/>
            <CarListInLandingPageContainer/>
            <Footer/>
        </>
    )
}

export default LandingPage;