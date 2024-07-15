import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log(e)
    }


}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');

}

let getCRUD = (req, res) => {
    return res.render('test/crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewuser(req.body);
    console.log(message);
    // req.body lấy tham số từ client gửi lên sever
    return res.send('post CRUD from sever')
}
// object: {
//     key: ''
//     value: ''
// }
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();

    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('Users not found!')
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });

}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete the user succeed')
    } else {
        return res.send('usser not found')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}