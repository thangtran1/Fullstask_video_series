import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import docterController from '../controllers/docterController';
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
let router = express.Router();

let initWebRouer = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/about', homeController.getAboutPage);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);


    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-docter-home', docterController.getTopDocterHome);

    router.get('/api/get-all-docter', docterController.getAllDocters);

    router.post('/api/save-infor-docter', docterController.postInforDocter);

    router.get('/api/get-detail-docter-by-id', docterController.getDetailDocterById);

    router.post('/api/bulk-create-schedule', docterController.bulkCreateSchedule);

    router.get('/api/get-schedule-docter-by-date', docterController.getScheduleByDate);

    router.get('/api/get-extra-infor-docter-by-id', docterController.getExtraInforByDate);

    router.get('/api/get-profile-docter-by-id', docterController.getProfileDocterByDate);

    router.post('/api/patient-book-appointment', patientController.postBookingAppointment);


    router.post('/api/verify-book-appointment', patientController.postVerifyBookingAppointment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);

    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);

    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-clinic', clinicController.createClinic);

    router.get('/api/get-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);
    return app.use("/", router);







}
// hai cái function này không phải redux hay react mà là thư viện và hàm sd trong thư viện là: (connect-react-redux);
// mapStateToProps: map data từ trong redux tiêm vào prop (component props)
// mapDispatchToProps: thông qua this.props.<tên action> 

module.exports = initWebRouer;