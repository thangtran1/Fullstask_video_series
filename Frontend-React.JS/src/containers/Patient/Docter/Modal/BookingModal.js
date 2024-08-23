import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import ProfileDocter from '../ProfileDocter';
import _ from 'lodash';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { toast } from 'react-toastify';

import moment from 'moment';
import { postPationBookingAppointment } from '../../../../services/userService';
class BookingModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            docterId: '',
            genders: '',
            timeType: ''



        }
    }
    async componentDidMount() {
        this.props.getGenders();
    }


    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            });
        }
        return result;
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                console.log("🚀 ~ BookingModal ~ componentDidUpdate ~ dataTime:", this.props.dataTime)
                let docterId = this.props.dataTime.docterId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    docterId: docterId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };

        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    }

    buildTimeBooking = (dataTime) => {

        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI
                ?
                dataTime.timeTypeData.valueVi
                :
                dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')

            return `${time} - ${date}`

        }
        return ''

    }

    buildDocterrName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.docterData.lastName} ${dataTime.docterData.firstName} `
                :
                `${dataTime.docterData.firstName} ${dataTime.docterData.lastName} `
            return name

        }
        return ''
    }



    handlleConfirmBooking = async () => {
        // valid input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let docterName = this.buildDocterrName(this.props.dataTime);
        // !data.email || !data.docterId || !data.timeType || !data.date
        let res = await postPationBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            docterId: this.state.docterId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            docterName: docterName
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!!!');
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new appointment error!!!')
        }
    }




    render() {
        let { isOpenModal, closeBookingModal, dataTime, dataScheduleTimeModal } = this.props;
        let docterId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            docterId = dataTime.docterId
        }


        // let docterId = dataTime && !_.isEmpty(dataTime) ? dataTime.docterId : ''

        return (
            <Modal isOpen={isOpenModal} centered size='lg' className={'booking-modal-container'}>

                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="Patient.booking-modal.title" /></span>
                        <span className='right'
                            onClick={closeBookingModal}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='docter-infor'>
                            <ProfileDocter
                                docterId={docterId}
                                isShowDescriptionDocter={false}
                                dataTime={dataTime}

                                isShowLinkDetail={true}
                                isShowPrice={false}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.fullName" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.phoneNumber" /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchangeDatePicker}
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Patient.booking-modal.sex" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.handlleConfirmBooking()}><FormattedMessage id="Patient.booking-modal.btnConfirm" /></button>
                        <button className='btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id="Patient.booking-modal.btnCancle" /></button>
                    </div>
                </div>
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
