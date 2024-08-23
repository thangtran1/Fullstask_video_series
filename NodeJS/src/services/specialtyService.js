const { reject } = require("lodash");
const db = require("../models");
const { where } = require("sequelize");


let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })

        } catch (e) {
            reject(e)
        }
    })

}
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({

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
let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {

                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let docterSpecialty = [];
                    if (location === 'ALL') {
                        docterSpecialty = await db.Docter_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['docterId', 'provinceId'],
                        })
                    } else {
                        //find by location
                        docterSpecialty = await db.Docter_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['docterId', 'provinceId'],
                        })
                    }

                    data.docterSpecialty = docterSpecialty;
                } else data = {};

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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}