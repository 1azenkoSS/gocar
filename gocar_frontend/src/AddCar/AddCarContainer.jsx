import AddCar from "./AddCar"
import {addCar, savePhoto} from "../redux/admin-reducer";
import {connect} from "react-redux";
import {sendCarAdmin} from "../redux/cars-reducer";

const AddCarContainer = ({addCar, savePhoto, sendCarAdmin,isAuth, addCarResult, isAdded}) => {

    return <>
        <AddCar addCarResult={addCarResult} isAuth={isAuth}
                sendCarAdmin={sendCarAdmin}  addCar={addCar}
                savePhoto={savePhoto} isAdded={isAdded}/>
    </>
}

const mapStateToProps = (state) => ({
    resultCode: state.admin.resultCode,
    isAuth: state.auth.isAuth,
    addCarResult: state.admin.addCarResult,
    isAdded: state.admin.isAdded

})

export default
connect(mapStateToProps, {addCar, savePhoto, sendCarAdmin})(AddCarContainer)