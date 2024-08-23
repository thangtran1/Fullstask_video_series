import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DocterExtraInfor.scss';
import { getExtraInforDocterById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment'
import { Select } from "antd";
import { getScheduleDocterByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DocterExtraInfor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}

        }
    }
    async componentDidMount() {
        if (this.props.docterIdFromParent) {
            let res = await getExtraInforDocterById(this.props.docterIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.docterIdFromParent !== prevProps.docterIdFromParent) {
            let res = await getExtraInforDocterById(this.props.docterIdFromParent);

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHidetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { language } = this.props;
        let { isShowDetailInfor, extraInfor } = this.state;
        return (
            <div div className='docter-extra-infor-container' >
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="Patient.extra-infor-docter.text-address" /></div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ' '}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                <div className='content-down'>

                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <FormattedMessage id="Patient.extra-infor-docter.price" />
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'} />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }

                            <span className='detail' onClick={() => this.showHidetailInfor(true)}>
                                <FormattedMessage id="Patient.extra-infor-docter.detail" />
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'><FormattedMessage id="Patient.extra-infor-docter.price" /></div>
                            <div className='detail-infor'>
                                <div className='price' >
                                    <span className='left'><FormattedMessage id="Patient.extra-infor-docter.price" /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="Patient.extra-infor-docter.payment" />

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ?
                                    extraInfor.paymentTypeData.valueVi : ''}

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ?
                                    extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'><span onClick={() => this.showHidetailInfor(false)}>
                                <FormattedMessage id="Patient.extra-infor-docter.hide-price" />
                            </span></div>
                        </>
                    }





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


export default connect(mapStateToProps, mapDispatchToProps)(DocterExtraInfor);
