import { where } from "sequelize";
require('dotenv').config();
import db from "../models/index";
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';





let builUrlEmail = (docterId, token) => {

    //click vao link -> 
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&docterId=${docterId}`

    return result;
}
let postBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.docterId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameted'
                });
            } else {

                let token = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
                await emailService.sendSimpleEmail({
                    receverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    docterName: data.docterName,
                    language: data.language,
                    redirectLink: builUrlEmail(data.docterId, token)
                })


                // upsert  patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    default: {
                        email: data.email,
                        roleId: 'R3' // patient = R3
                    },
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientid: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            docterId: data.docterId,
                            patientid: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }

                    })
                }

                // create a booking record
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

let postVerifyBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.docterId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameted'
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        docterId: data.docterId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed!!!'
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment schedule has been activated or does not exist!!!'
                    });
                }

            }

        } catch (e) {
            reject(e)
        }
    })

}


module.exports = {
    postBookingAppointment: postBookingAppointment,
    postVerifyBookingAppointment: postVerifyBookingAppointment,

};