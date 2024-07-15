import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';



const salt = bcrypt.genSaltSync(10);


let createNewuser = async (data) => {
    console.log('-------------------')
    console.log(data);
    console.log('-------------------')
    return new Promise(async (resolve, rejct) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('ok create a new user succeed!')

        } catch (e) {
            rejct(e);
        }
    })
}
// bất đồng bộ dùng asyns await
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
            // Store hash in your password DB

        } catch (e) {
            reject(e);

        }
    })
}

let getAllUser = () => {
    //resolve, rejct chấp nhận và từ chối resolve = return
    return new Promise(async (resolve, rejct) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            // raw: true kiểm soát dữ liệu ở dạng nguyên bản ko có bất cứ thứ gì có thể ảnh hưởng vào
            resolve(users)

            // users 
        } catch (e) {
            rejct(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })
}
let deleteUserById = (userid) => {
    return new Promise(async (resolve, rejct) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid }
            })

            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            rejct(e)
        }
    })
}
module.exports = {
    createNewuser: createNewuser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}