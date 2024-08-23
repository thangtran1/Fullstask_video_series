import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDocter.scss';
import { getProfileDocterById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Link } from 'react-router-dom';
class ProfileDocter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        };
    }

    async componentDidMount() {
        let data = await this.getInforDocter(this.props.docterId);
        this.setState({
            dataProfile: data
        });
    }

    getInforDocter = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDocterById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.docterId !== prevProps.docterId) {

        }
    }

    renderTimeBooking = (dataTime) => {

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



            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="Patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return <></>

    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDocter, dataTime, isShowLinkDetail, isShowPrice, docterId } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},  ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-docter-container'>
                <div className='intro-docter'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDocter === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>

                    </div>
                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-docter'>
                        <Link to={`/detail-docter/${docterId}`}>Xem thêm </Link>
                    </div>

                }
                {isShowPrice === true &&

                    <div className='price' >
                        <FormattedMessage id="Patient.booking-modal.price" />
                        {dataProfile && dataProfile.Docter_Infor && language === LANGUAGES.VI
                            &&
                            <NumberFormat
                                className='currency'
                                value={dataProfile.Docter_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                        }

                        {dataProfile && dataProfile.Docter_Infor && language === LANGUAGES.EN
                            &&
                            <NumberFormat
                                className='currency'
                                value={dataProfile.Docter_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>
                }
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

export default connect(mapStateToProps)(ProfileDocter);