import docterService from "../services/docterService";

let getTopDocterHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await docterService.getTopDocterHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from serverrrrrr...'
        })
    }
}

let getAllDocters = async (req, res) => {
    try {
        let docters = await docterService.getAllDocters();
        return res.status(200).json(docters)

    } catch (e) {
        console.log('check e', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let postInforDocter = async (req, res) => {
    try {
        let response = await docterService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log('check e', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailDocterById = async (req, res) => {
    try { // getDetailDocterById -> docterservice
        let infor = await docterService.getDetailDocterById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await docterService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try {
        let infor = await docterService.getScheduleByDate(req.query.docterId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getTopDocterHome: getTopDocterHome,
    getAllDocters: getAllDocters,
    postInforDocter: postInforDocter,
    getDetailDocterById: getDetailDocterById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
}