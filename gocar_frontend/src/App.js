// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {useEffect} from "react";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = (props) => {

    useEffect(() => {
        props.initializeApp()
    })
        return (
            <ThemeCustomization>
                <ScrollTop>
                    <Routes/>
                </ScrollTop>
            </ThemeCustomization>
        )
    }
;
const mapStateToProps = (state) => ({
    initialize: state.app.initialize
})

export default connect(mapStateToProps, {initializeApp})(App);
