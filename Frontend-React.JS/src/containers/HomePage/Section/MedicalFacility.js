import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility';
import Slider from "react-slick"; // thư viện 
import { FormattedMessage } from 'react-intl';
class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-specialty'>Cơ sở y tế nổi bật</span>
                        <button className='btn-specialty'>Xem thêm</button>

                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h4>Hệ thống y tế Thu Cúc 1</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h4>Hệ thống y tế Thu Cúc 2</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h4>Hệ thống y tế Thu Cúc 3</h4>
                            </div>

                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h4>Hệ thống y tế Thu Cúc 4</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h4>Hệ thống y tế Thu Cúc 5</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h4>Hệ thống y tế Thu Cúc 6</h4>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
