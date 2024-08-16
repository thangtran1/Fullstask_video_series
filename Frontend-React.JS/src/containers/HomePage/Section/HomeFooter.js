import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // chuyển đổi vi sang en ..// store -> reducer -> appreducer -> language: 'en', 
// và init FormattedMessage trong vi.json và en.json // dùng reducer để chuyển đổi ngôn ngữ


class HomeFooter extends Component {



    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2024 Thắng Zidance with IT. <a target='_blank' href='#'>More information. &#8594; Click here &#8592;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
