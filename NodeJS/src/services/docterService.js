import { where } from "sequelize";
import db from "../models/index";
require('dotenv').config();
import _, { includes, reject } from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDocterHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });

            resolve({
                errCode: 0,
                data: users
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDocters = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let docters = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: docters
            })
        } catch (e) {
            reject(e)
        }
    })
}
let checkRequiredFields = (inputData) => {
    let arrFields = ['docterId', 'contentHTML', 'contentMarkdown', 'action',
        'selectedPrice', 'selectedPayment', 'selectedProvince', 'nameClinic',
        'addressClinic', 'note', 'specialtyId'
    ]
    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i]
            break
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}


let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check inputdata123123123: ', inputData);
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter: ${checkObj.element}`
                });
            } else {

                // upsert to markdown
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({

                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        docterId: inputData.docterId
                    });
                } else if (inputData.action === 'EDIT') {
                    let docterMarkdown = await db.Markdown.findOne({
                        where: { docterId: inputData.docterId },
                        raw: false
                    })
                    if (docterMarkdown) {
                        docterMarkdown.contentHTML = inputData.contentHTML;
                        docterMarkdown.contentMarkdown = inputData.contentMarkdown;
                        docterMarkdown.description = inputData.description;
                        await docterMarkdown.save();
                    }
                }

                // upsert to Docter_infor table
                let docterInfor = await db.Docter_Infor.findOne({
                    where: {
                        docterId: inputData.docterId,

                    },
                    raw: false
                })

                if (docterInfor) {
                    // update
                    docterInfor.docterId = inputData.docterId;
                    docterInfor.priceId = inputData.selectedPrice;
                    docterInfor.provinceId = inputData.selectedProvince;
                    docterInfor.paymentId = inputData.selectedPayment;

                    docterInfor.nameClinic = inputData.nameClinic;
                    docterInfor.addressClinic = inputData.addressClinic;
                    docterInfor.note = inputData.note;

                    docterInfor.specialtyId = inputData.specialtyId;
                    docterInfor.clinicId = inputData.clinicId;

                    await docterInfor.save();
                } else {
                    // create
                    await db.Docter_Infor.create({
                        docterId: inputData.docterId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,

                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save info doctor succeed!'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDocterById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })

            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId

                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        {
                            model: db.Docter_Infor,
                            attributes: {
                                exclude: ['id', 'docterId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },

                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                // chuyen tu "Buffer" qua base64
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let bulkCreateSchedule = async (data) => {
    try {
        console.log('check data123: ', data);

        if (!data || !Array.isArray(data.arrSchedule) || !data.docterId || !data.formatedDate) {
            return {
                errCode: 1,
                errMessage: 'Missing required param!'
            };
        }

        let schedule = data.arrSchedule;
        if (schedule.length > 0) {
            schedule = schedule.map(item => {
                item.maxNumber = MAX_NUMBER_SCHEDULE;
                return item;
            });
        }

        // Lấy dữ liệu hiện có
        let existing = await db.Schedule.findAll({
            where: { docterId: data.docterId, date: data.formatedDate },
            attributes: ['timeType', 'date', 'docterId', 'maxNumber'],
            raw: true
        });

        // Chuyển đổi ngày
        // if (Array.isArray(existing) && existing.length > 0) {
        //     existing = existing.map(item => {
        //         item.date = new Date(item.date).getTime();
        //         return item;
        //     });
        // }

        // So sánh khác biệt với _.differenceWith
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
            return a.timeType === b.timeType && +a.date === +b.date;
        });

        console.log('To create:', toCreate);

        // Tạo dữ liệu
        if (Array.isArray(toCreate) && toCreate.length > 0) {
            await db.Schedule.bulkCreate(toCreate);
        }

        return {
            errCode: 0,
            errMessage: 'OK'
        };
    } catch (e) {
        console.error('Lỗi khi tạo lịch:', e);
        return {
            errCode: 2,
            errMessage: 'Error occurred!'
        };
    }
};

let getScheduleByDate = (docterId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!docterId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameted'
                })

            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        docterId: docterId,
                        date: date,
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },

                        { model: db.User, as: 'docterData', attributes: ['firstName', 'lastName'] },

                    ],
                    raw: false,
                    nest: true
                })

                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })

}
let getExtraInforByDate = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameted'
                })
            } else {
                let data = await db.Docter_Infor.findOne({
                    where: {
                        docterId: idInput,
                    },
                    attributes: {
                        exclude: ['id', 'docterId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getProfileDocterByDate = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameted'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId

                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        {
                            model: db.Docter_Infor,
                            attributes: {
                                exclude: ['id', 'docterId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },

                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                // chuyen tu "Buffer" qua base64
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })

}
module.exports = {
    getTopDocterHome: getTopDocterHome,
    getAllDocters: getAllDocters,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDocterById: getDetailDocterById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforByDate: getExtraInforByDate,
    getProfileDocterByDate: getProfileDocterByDate,

};