import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick"; // thư viện 
import { FormattedMessage } from 'react-intl'; // chuyển đổi vi sang en ..// store -> reducer -> appreducer -> language: 'en', 
// và init FormattedMessage trong vi.json và en.json // dùng reducer để chuyển đổi ngôn ngữ
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }


    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className='section-share section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-specialty'><FormattedMessage id="homepage.Popular-specialties" /></span>
                        <button className='btn-specialty'><FormattedMessage id="homepage.more-infor" /></button>

                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings} >
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child'
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                            key={index}
                                        >
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}

                                            />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
