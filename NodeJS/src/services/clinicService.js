import { where } from "sequelize";
import db from "../models";

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64
                || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameted'
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!!!'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({

            });

            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                })

            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let docterClinic = [];
                    docterClinic = await db.Docter_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['docterId', 'provinceId'],
                    })
                    data.docterClinic = docterClinic;


                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}




module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById

};