import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailSpecialty.scss';
import HomeHeader from "../../HomePage/HomeHeader";
import DocterSchedule from '../Docter/DocterSchedule';
import DocterExtraInfor from '../Docter/DocterExtraInfor';
import ProfileDocter from "../Docter/ProfileDocter";
import { getAllDetailSpecialtyById, getAllCodeService } from "../../../services/userService";
import _ from 'lodash';
import { LANGUAGES } from "../../../utils";
class DetailSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDocterId: [],
            dataDetailSpecialty: {},
            listProvince: []

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;


            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE')


            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDocterId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.docterSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDocterId.push(item.docterId)
                        })

                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({ // unshift đẩy lên làm pt first
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc"
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDocterId: arrDocterId,
                    listProvince: dataProvince ? dataProvince : []
                });
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDocterId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.docterSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDocterId.push(item.docterId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDocterId: arrDocterId,
                })
            }
        }
    }

    render() {
        let { arrDocterId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }} />
                        }
                    </div>
                    <div className="search-sp-docter">
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0
                                && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>)
                                })
                            }
                        </select>
                    </div>
                    {arrDocterId && arrDocterId.length > 0 &&
                        arrDocterId.map((item, index) => {
                            return (
                                <div className="each-docter" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-docter">
                                            <ProfileDocter
                                                docterId={item}
                                                isShowDescriptionDocter={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="docter-schedule">
                                            <DocterSchedule
                                                docterIdFromParent={item}
                                            />
                                        </div>
                                        <div className="docter-extra-infor">
                                            <DocterExtraInfor
                                                docterIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
