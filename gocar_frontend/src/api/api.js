import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7211/api/',
    withCredentials: true,
})

export const carsAPI = {
    getCars () {
        return instance.get(`Cars`)
            .then(response => response.data);
    },
    getCarsPhotos () {
        return instance.get('CarsImages/')
    },
    getCarProfile(carsId) {
        return instance.get(`Cars/` + carsId)
    },
    getCarProfilePhoto(carsId) {
        return instance.get(`CarsImages/` + carsId)
    },
    addCarData(carData) {
        return instance.post(`Cars`, carData)
    },
    savePhoto(formData) {
        debugger
        return instance.post(`CarsImages`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    updateCarData(carId, data) {
        return instance.put(`Cars/` + carId, data)
    },
    deleteCar(carId) {
        return instance.delete(`Cars/` + carId)
    },
    deleteCarImage(carId) {
        return instance.delete(`CarsImages/` + carId)
    },
    filterCar(data) {
        return instance.post(`Cars/filter`, data)
    },
    bookCar(data) {
        return instance.post(`RentCar`, data)
    },


    copyCarData (carId) {
        return instance.post(`UsersCars/copydata/` + carId)
    },
    sendCarImageToAdmin (formData) {
        return instance.post(`UsersCarImages`, formData);
    },
    sendCarToAdmin(data) {
        return instance.post(`UsersCars`, data)
    },
    getRentCars() {
      return instance.get(`UsersCars`)
    },
    getRentCarProfile(carId) {
        return instance.get(`UsersCars/` + carId)
    },
    getRentCarImage(carId) {
        return instance.get(`UsersCarImages/` + carId)
    },
    getAllRentCarImages() {
      return instance.get(`UsersCarImages`)
    },
    deleteRentCar(carId) {
        return instance.delete(`UsersCars/` + carId)
    },
    deleteRentCarImage(carId) {
        return instance.delete(`UsersCarImages/` + carId)
    },
    changeCarRentData(carId,data) {
        debugger
        return instance.put(`UsersCars/` + carId, data)
    }
}

export const profileAPI = {

    getCarProfile(carsId) {
        return instance.get(`Cars/` + carsId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status} )
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData);
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    me() {
        return instance.get(`Profile/user`)
    },
    login(email, password) {
        return instance.post(`Profile/signin`, {email, password})
    },
    logout() {
        debugger
        return instance.get(`Profile/signout`)
    }
}