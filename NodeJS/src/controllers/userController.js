import userService from '../services/userService';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // if(emaill === '' || email === null || email === 'undefined')
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    console.log(userData)
    // check email exist
    // compare password
    // return userInfo
    // access_token: JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // all ==> lấy tất cả người dùng, id ==> lấy 1 người

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }


    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    try {

        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)

        // setTimeout(async () => {
        //     let data = await userService.getAllCodeService(req.query.type);
        //     return res.status(200).json(data);
        // }, 3000)
        // 3000s để test chờ lấy data từ gender
    } catch (e) {
        console.log('Get All code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
    }
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}