import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDocter.scss';
import { getDetailInforDocter } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DocterSchedule from './DocterSchedule';
class DetailDocter extends Component {


    constructor(props) {
        super(props);
        this.state = {
            detailDocter: {},
            currentDocterId: -1,

        }
    }
    componentDidMount() {
        const fetchDoctorDetails = async () => {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                this.setState({
                    currentDocterId: id
                })


                let res = await getDetailInforDocter(id);
                if (res && res.errCode === 0) {
                    this.setState({
                        detailDocter: res.data,
                    })
                }
            }
        };

        fetchDoctorDetails();
    }

    render() {
        console.log('check state:', this.state);
        let { language } = this.props;
        let { detailDocter } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDocter && detailDocter.positionData) {
            nameVi = `${detailDocter.positionData.valueVi},  ${detailDocter.lastName} ${detailDocter.firstName} `;
            nameEn = `${detailDocter.positionData.valueEn}, ${detailDocter.firstName} ${detailDocter.lastName}`;
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='docter-detail-container'>
                    <div className='intro-docter'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDocter && detailDocter.image ? detailDocter.image : ''})` }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDocter && detailDocter.Markdown && detailDocter.Markdown.description
                                    &&
                                    <span>
                                        {detailDocter.Markdown.description}
                                    </span>
                                }
                            </div>

                        </div>
                    </div>
                    <div className='schedule-docter'>
                        <div className='content-left'>
                            <DocterSchedule
                                docterIdFromParent={this.state.currentDocterId}
                            />
                        </div>
                        <div className='content-right'>

                        </div>
                    </div>
                    <div className='detail-infor-docter'>
                        {detailDocter && detailDocter.Markdown && detailDocter.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML=
                                {{ __html: detailDocter.Markdown.contentHTML }} />
                        }

                    </div>
                    <div className='comment-docter'>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDocter);
