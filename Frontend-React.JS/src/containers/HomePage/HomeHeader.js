import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.png';
import { FormattedMessage } from 'react-intl'; // chuyển đổi vi sang en ..// store -> reducer -> appreducer -> language: 'en', 
// và init FormattedMessage trong vi.json và en.json // dùng reducer để chuyển đổi ngôn ngữ
import { LANGUAGES } from '../../utils/constant';
import { withRouter } from 'react-router';

import { changeLanguageApp } from "../../store/actions"
import Login from '../Auth/Login';
class HomeHomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event : actions

    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fa fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />


                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>< b> <FormattedMessage id="homeheader.speciality" /> </b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.search-docter" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.health-facility" /> </b></div>
                                <div className='subs-title'> <FormattedMessage id="homeheader.select-room" /> </div>
                            </div>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.docter" /> </b></div>
                                <div className='subs-title'> <FormattedMessage id="homeheader.select-docter" /> </div>
                            </div>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.fee" /> </b></div>
                                <div className='subs-title'> <FormattedMessage id="homeheader.check-health" /> </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i> <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className='text-child'> <FormattedMessage id="banner.text-child6" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHomeHeader));
