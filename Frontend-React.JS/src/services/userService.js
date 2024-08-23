
import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {

    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {

    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}


const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
const getTopDocterHomeService = (limit) => {
    return axios.get(`/api/top-docter-home?limit=${limit}`)
}

const getAllDocters = () => {
    return axios.get(`/api/get-all-docter`)
}


const getAllCodeService = (inpuType) => {  // lấy dữ liệu từ db lên form giới tính, chức vụ, vai trò
    return axios.get(`/api/allcode?type=${inpuType}`)
}

const saveDetailDocterService = (data) => {
    return axios.post('/api/save-infor-docter', data)
}

const getDetailInforDocter = (inputId) => {
    return axios.get(`/api/get-detail-docter-by-id?id=${inputId}`)
}


const saveBulkScheduleDocter = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

// date => formatedDate 1723568400000
const getScheduleDocterByDate = (docterId, date) => {
    return axios.get(`/api/get-schedule-docter-by-date?docterId=${docterId}&date=${date}`)
}

const getExtraInforDocterById = (docterId) => {
    return axios.get(`/api/get-extra-infor-docter-by-id?docterId=${docterId}`)
}

const getProfileDocterById = (docterId) => {
    return axios.get(`/api/get-profile-docter-by-id?docterId=${docterId}`)
}

const postPationBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifynBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}

const getAllClinic = () => {
    return axios.get('/api/get-clinic')
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService, getTopDocterHomeService, getAllDocters, saveDetailDocterService, getDetailInforDocter, saveBulkScheduleDocter, getScheduleDocterByDate, getExtraInforDocterById, getProfileDocterById, postPationBookingAppointment, postVerifynBookAppointment, createNewSpecialty, getAllSpecialty, getAllDetailSpecialtyById, createNewClinic, getAllClinic, getAllDetailClinicById }