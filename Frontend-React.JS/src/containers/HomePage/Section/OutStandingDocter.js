import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDocter';
import Slider from "react-slick"; // thư viện 
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
class OutStandingDocter extends Component {

    constructor(props) {

        super(props);
        this.state = {
            arrDocters: []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctersRedux !== this.props.topDoctersRedux) {
            this.setState({
                arrDocters: this.props.topDoctersRedux
            })
        }

    }
    componentDidMount() {
        this.props.loadTopDocters();
    }

    handleDetailDocter = (docter) => {
        console.log('check view infor: ', docter);
        this.props.history.push(`/detail-docter/${docter.id}`) // push = Redirect => chuyeenr huong dden link
    }
    render() {
        let arrDocters = this.state.arrDocters;
        let { language } = this.props;
        // arrDocters = arrDocters.concat(arrDocters).concat(arrDocters);
        return (
            <div className='section-share section-outstanding-docter'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-specialty'><FormattedMessage id="homepage.Outstanding-docter" /></span>
                        <button className='btn-specialty'><FormattedMessage id="homepage.more-infor" /></button>

                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings} >

                            {arrDocters && arrDocters.length > 0
                                && arrDocters.map((item, index) => {
                                    let imageBase64 = ' ';
                                    if (item.image) {
                                        // imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi},  ${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleDetailDocter(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-docter'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ Xương Khớp</div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}


                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctersRedux: state.admin.topDocters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDocters: () => dispatch(actions.fetchTopDocter())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDocter));
