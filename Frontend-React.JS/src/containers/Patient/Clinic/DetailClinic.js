import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './DetailClinic.scss';
import HomeHeader from "../../HomePage/HomeHeader";
import DocterSchedule from '../Docter/DocterSchedule';
import DocterExtraInfor from '../Docter/DocterExtraInfor';
import ProfileDocter from "../Docter/ProfileDocter";
import { getAllDetailClinicById, getAllCodeService } from "../../../services/userService";
import _ from 'lodash';
import { LANGUAGES } from "../../../utils";
class DetailClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDocterId: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;


            let res = await getAllDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDocterId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.docterClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDocterId.push(item.docterId)
                        })

                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDocterId: arrDocterId,
                });
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { arrDocterId, dataDetailClinic } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }} />
                            </>

                        }
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


export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
