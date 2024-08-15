import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import './Footer.css';
import {Box, Grid, Link, Typography} from "@mui/material";
import Logo from "../components/Logo/Logo";

function Footer() {

    return (
        <>
            <footer className="footer">
                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <Link href="#" className="social-icon__link"><FacebookIcon fontSize="large"/></Link>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <Link href="#" className="social-icon__link"><TwitterIcon fontSize="large"/></Link>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <Link href="#" className="social-icon__link"><InstagramIcon fontSize="large"/></Link>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <Link href="#" className="social-icon__link"><TelegramIcon fontSize="large"/></Link>
                    </a></li>
                </ul>
                <ul className="menu">
                    <li className="menu__item"><a className="menu__link" href="#">Домашня</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Про нас</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Сервіси</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Команда</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Контакти</a></li>

                </ul>
                <p>&copy;2023 NEPOSYDY | All Rights Reserved</p>
            </footer>
        </>
    )

}

export default Footer;