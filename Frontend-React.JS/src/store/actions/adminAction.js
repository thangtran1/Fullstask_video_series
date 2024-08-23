import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDocterHomeService, getAllDocters, saveDetailDocterService, getAllSpecialty, getAllClinic } from '../../services/userService';
import { toast } from 'react-toastify'; // when creanew user display succeed!
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log('fetchGenderStart error', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData

})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})


export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("position")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log('fetchPositionStart error', e);
        }
    }
}
export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log('fetchRoleStart error', e);
        }
    }
}

// create-redux - 6
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check create user redux: ', res);
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed!')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log('fetchRoleStart error', e);
        }
    }
}


export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) { // reverse create new user len tren cung
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error('FetchAllUser user error!')
                dispatch(fetchAllUsersFaided());
            }
        } catch (e) {
            toast.error('FetchAllUser user error!')
            dispatch(fetchAllUsersFaided());
            console.log('fetchAllUsersStart error', e);
        }
    }
}


export const deleteAllUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('check create user redux: ', res);
            if (res && res.errCode === 0) {
                toast.success('Delete the user succeed!')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete the user error!')
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error('Delete the user error!')
            dispatch(fetchRoleFaided());
            console.log('fetchRoleStart error', e);
        }
    }
}


export const editAllUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);
            console.log('check create user redux: ', res);
            if (res && res.errCode === 0) {
                toast.success('Update the user succeed!')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update the user error!')
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update the user error!')
            dispatch(editUserFailed());
            console.log('editUserFailed error', e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED,
})


export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFaided = (data) => ({
    type: actionTypes.DELETE_USER_FAILDED,
})

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUsersFaided = (data) => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED,
})

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData

})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData

})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

// let res1 = await getTopDocterHomeService(3);


export const fetchTopDocter = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDocterHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTERS_SUCCESS,
                    dataDocters: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTERS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTERS_FAILDED: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTERS_FAILDED,
            })
        }
    }
}

export const fetchAllDocters = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDocters();
            console.log('helo check 123456: ', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTERS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTERS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTERS_FAILDED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTERS_FAILDED,
            })
        }
    }
}

export const saveDetailDocter = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDocterService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Docter succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTER_SUCCESS,
                })
            } else {
                toast.error("Save Infor Detail Docter error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTER_FAILDED,
                })
            }
        } catch (e) {
            toast.error("Save Infor Detail Docter error!");
            console.log('SAVE_DETAIL_DOCTER_FAILDED: ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTER_FAILDED,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            console.log('helo check 123456: ', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
            })
        }
    }
}


export const getRequiredDocterInfor = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTER_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(fetchRequiredDocterInforSuccess(data));
            } else {
                dispatch(fetchRequiredDocterInforFaided());
            }
        } catch (e) {
            dispatch(fetchRequiredDocterInforFaided());
            console.log('fetchRequiredDocterInforFaided error', e);
        }
    }
}

export const fetchRequiredDocterInforSuccess = (AllRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTER_INFOR_SUCCESS,
    data: AllRequiredData

})

export const fetchRequiredDocterInforFaided = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTER_INFOR_FAIDED
})
