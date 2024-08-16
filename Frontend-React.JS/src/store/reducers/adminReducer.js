import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDocters: [],
    allDocters: [],
    allScheduleTime: [],

    allRequiredDocterInfor: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,

            }

        // Gender
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
                genders: action.data

            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false;
            state.genders = [];

            return {
                ...state,

            }


        // position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
                positions: action.data

            }
        case actionTypes.FETCH_POSITION_FAILDED:
            state.positions = [];

            return {
                ...state,

            }

        //role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
                roles: action.data

            }
        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];

            return {
                ...state,

            }

        // fetchAllUsersSuccess
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,


            }
        case actionTypes.FETCH_ALL_USER_FAILDED:
            state.users = [];

            return {
                ...state,

            }

        case actionTypes.FETCH_TOP_DOCTERS_SUCCESS:
            state.topDocters = action.dataDocters;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTERS_FAILDED:
            state.topDocters = [];
            return {
                ...state,


            }

        case actionTypes.FETCH_ALL_DOCTERS_SUCCESS:
            state.allDocters = action.dataDr;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTERS_FAILDED:
            state.allDocters = [];
            return {
                ...state,


            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = [];
            return {
                ...state,


            }



        case actionTypes.FETCH_REQUIRED_DOCTER_INFOR_SUCCESS:
            state.allRequiredDocterInfor = action.data;
            return {
                ...state,

            }
        case actionTypes.FETCH_REQUIRED_DOCTER_INFOR_FAIDED:
            state.allRequiredDocterInfor = [];
            return {
                ...state,


            }
        default:
            return state;
    }
}




export default adminReducer;