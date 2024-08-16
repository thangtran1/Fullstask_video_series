import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDocter.scss';
import { getDetailInforDocter } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './DocterSchedule.scss';
import moment from 'moment'
import localization from 'moment/locale/vi';
import { Select } from "antd";
import { getScheduleDocterByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DocterSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })
    }


    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            let formattedDay;
            const day = moment(new Date()).add(i, 'days');
            if (day.isSame(moment(), 'day')) {
                formattedDay = language === LANGUAGES.VI ? 'Hôm nay - ' + day.format('DD/MM') : 'Today - ' + day.format('DD/MM');
            } else {
                if (language === LANGUAGES.VI) {
                    formattedDay = day.format('dddd - DD/MM');
                    formattedDay = formattedDay.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // in hoa chữ cái đầu
                } else {
                    formattedDay = day.locale('en').format('ddd - DD/MM');
                }
            }

            object.label = formattedDay;
            object.value = day.startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.docterIdFromParent !== prevProps.docterIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDocterByDate(this.props.docterIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }

    }

    handleOnchangeSelect = async (event) => {
        if (this.props.docterIdFromParent && this.props.docterIdFromParent !== -1) {
            let docterId = this.props.docterIdFromParent;
            let date = event.target.value
            let res = await getScheduleDocterByDate(docterId, date);


            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
            console.log('check scheduleDocterByDate: ', res);
        }
    }

    render() {

        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props;

        return (

            <div div className='docter-schedule-container' >
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)} >
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option
                                    value={item.value}
                                    key={index}
                                >
                                    {item.label}
                                </option>
                            )
                        })}

                    </select>

                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i class="fas fa-calendar-alt"><span><FormattedMessage id="Patient.detail-docter.schedule" /></span></i>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?

                            <React.Fragment>
                                <div className='time-content-btns'>
                                    {allAvalableTime.map((item, index) => {
                                        let timeThisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn;


                                        return (
                                            <button key={index} className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}>
                                                {timeThisplay}
                                            </button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span><FormattedMessage id="Patient.detail-docter.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="Patient.detail-docter.book-free" /></span>
                                </div>
                            </React.Fragment>
                            :
                            <div className='no-schedule'>
                                <FormattedMessage id="Patient.detail-docter.no-schedule" />
                            </div>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DocterSchedule);
