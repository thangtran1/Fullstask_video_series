import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifynBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
class VerifyEmail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let docterId = urlParams.get('docterId');

            let res = await postVerifynBookAppointment({
                token: token,
                docterId: docterId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })

            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { statusVerify, errCode } = this.state;
        console.log("🚀 ~ VerifyEmail ~ render ~ this.state:", this.state)
        return (
            <>
                <HomeHeader />
                <div className='verify-container'>


                    {statusVerify === false ?
                        <div>
                            Loading data ...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking'><FormattedMessage id="Patient.verify-email.succeed" /></div>
                                :
                                <div className='infor-booking'><FormattedMessage id="Patient.verify-email.failed" /></div>
                            }
                        </div>
                    }
                </div>
            </>
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


export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
