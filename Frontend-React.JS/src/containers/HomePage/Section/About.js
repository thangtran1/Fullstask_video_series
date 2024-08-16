import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // chuyển đổi vi sang en ..// store -> reducer -> appreducer -> language: 'en', 
// và init FormattedMessage trong vi.json và en.json // dùng reducer để chuyển đổi ngôn ngữ


class Specialty extends Component {



    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header text-center'>Truyền thông nói về Channel Thắng Zidance</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe className='rounded-iframe'
                            width="100%" height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="Schannel VTV1 - BOOKINGCARE" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen ></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Mọi người cứ hay truyền tai nhau “Làm ngành công nghệ thông tin nhận lương IT trăm củ cơ đấy” nhưng chính xác thì ngành IT là gì, làm bất cứ công việc IT nào cũng nhận được lương cao hay phải lựa chọn đúng nghề thì số dư trong tài khoản mới nhân lên gấp bội?

                            Đây cũng là những thông tin tham khảo giúp bạn tiết kiệm thời gian tra cứu và đưa ra quyết định chính xác nhất trên con đường sự nghiệp.</p>
                        {/* <div className='right-img'>
                            <div className='float-left'>
                                <div className='img-left'>
                                    <a href='#'><a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a></a>
                                </div>
                                <div className='img-left'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                                <div className='img-left'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                                <div className='img-left'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                            </div>

                            <div className='float-right'>
                                <div className='img-right'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                                <div className='img-right'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                                <div className='img-right'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                                <div className='img-right'>
                                    <a href='#'><img src='https://bookingcare.vn/assets/truyenthong/vnexpress.png' /></a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div >
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
