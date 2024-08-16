import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDocter from './Section/OutStandingDocter';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,    // hiển thị lên màn hình 4
            slidesToScroll: 1,   // next qua 1
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutStandingDocter
                    settings={settings} />
                <HandBook
                    settings={settings} />
                <About />
                <HomeFooter />

                {/* <div style={{ height: '300px' }}></div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
