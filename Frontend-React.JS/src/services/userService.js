
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


export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService, getTopDocterHomeService, getAllDocters, saveDetailDocterService, getDetailInforDocter, saveBulkScheduleDocter, getScheduleDocterByDate }