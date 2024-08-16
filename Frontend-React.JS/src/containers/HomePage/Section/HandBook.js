import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick"; // thư viện 
import { FormattedMessage } from 'react-intl'; // chuyển đổi vi sang en ..// store -> reducer -> appreducer -> language: 'en', 
// và init FormattedMessage trong vi.json và en.json // dùng reducer để chuyển đổi ngôn ngữ


class Specialty extends Component {



    render() {

        return (
            <div className='section-share section-handBook'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-specialty'>Cẩm nang</span>
                        <button className='btn-specialty'>Xem thêm</button>

                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='bg-image section-handBook' />
                                <h4>Cơ xương khớp 1</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook' />
                                <h4>Cơ xương khớp 2</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook' />
                                <h4>Cơ xương khớp 3</h4>
                            </div>

                            <div className='section-customize'>
                                <div className='bg-image section-handBook' />
                                <h4>Cơ xương khớp 4</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook' />
                                <h4>Cơ xương khớp 5</h4>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook' />
                                <h4>Cơ xương khớp 6</h4>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
