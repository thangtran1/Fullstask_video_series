import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as action from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDocter } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDocter: [],
            selectedDocter: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDocters();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDocters !== this.props.allDocters) {
            let dataSelect = this.builDataInputSelect(this.props.allDocters);
            this.setState({
                listDocter: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                //  data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.builDataInputSelect(this.props.allDocters);
        //     this.setState({
        //         listDocter: dataSelect
        //     })
        // }

    }

    builDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
                return object;
            });
        }

        return result

    }

    handleChangeSelect = async (selectedDocter) => {
        this.setState({ selectedDocter });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDocter, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error('invalid date!!!');
            return;
        }
        if (selectedDocter && _.isEmpty(selectedDocter)) {
            toast.error('invalid selected date!!!');
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.docterId = selectedDocter.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })

            } else {
                toast.error('Invalid selected time!!!');
                return;
            }

        }
        let res = await saveBulkScheduleDocter({
            arrSchedule: result,
            docterId: selectedDocter.value,
            formatedDate: formatedDate
        });
        if (res && res.errCode === 0) {
            toast.success('Save Infor Success!!!')
        } else {
            toast.error('Error saveBulkScheduleDocter');
            console.log('saveBulkScheduleDocter >>> res: ', res);

        }


    }


    render() {

        let { rangeTime } = this.state;
        let { language } = this.props;
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        return (
            <div className='manage-schedule-containner'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.select_docter" /></label>
                            <Select
                                value={this.state.selectedDocter}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDocter}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.select_date" /></label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate={todayStart}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected === true ? "btn btn-save-schedule active" : "btn btn-save-schedule"}
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}


                                    >
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDocters: state.admin.allDocters,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDocters: () => dispatch(action.fetchAllDocters()),
        fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
