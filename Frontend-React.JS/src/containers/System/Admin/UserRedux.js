import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as action from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: [],
            isOpen: false,


            // create redux 1
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avater: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();  // c1   
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(action.fetchGenderStart()) // c2
        // lấy dữ liệu từ db lên cho gender kiểu truyền thống react
        // try {
        //     let res = await getAllCodeService('gender'); // thay đổi chổ này
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e);
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // reder => didupdate
        //hiện tại(this) và quá khứ (previous)
        //quá khứ mảng rỗng hiện tại [3]
        //arrGenders lấy gtri mặc đinh
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            console.log('Updated genderRedux:', this.props.genderRedux);
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosotions = this.props.positionRedux
            console.log('Updated positions:', this.props.positionRedux);
            this.setState({
                positionArr: arrPosotions,
                position: arrPosotions && arrPosotions.length > 0 ? arrPosotions[0].keyMap : ''
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            console.log('Updated roles:', this.props.roleRedux);
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            });
        }

        // khi co su change  listUsers => setState thanh rong
        if (prevProps.listUsers !== this.props.listUsers) {
            // let arrRoles = this.props.roleRedux;
            // let arrGenders = this.props.genderRedux;
            // let arrPosotions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avater: '',
                action: CRUD_ACTIONS.CREATE,


            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avater: base64
            })

        }


    }
    openPreviewImage = () => {

        if (!this.setState.previewImgURL) return;
        this.setState({
            isOpen: true
        })

    }

    // create-redux - 2
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state
        // let action = this.state.action

        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux create action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avater: this.state.avater

            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editAllUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avater: this.state.avater

            })
        }

        console.log('Zidance before submit check state: ', this.state);

        // setTimeout(() => {
        //     this.props.fetchUserRedux(); create new user wait 1s
        // }, 1000)

    }
    // create-redux - 3
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    // create-redux - 4
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        // }, () => {
        //     console.log('Zidance check input onchange:  ', this.state);
        // })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }

        console.log(' check handleEditUserFromParent', user);
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber, // OR phoneNumber
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avater: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isGetGender = this.props.isLoadingGender;
        let language = this.props.language;


        // let email = this.state.email;
        // let password = this.state.password;
        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position, role, avater }
            = this.state
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux Hoidanit
                </div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>{isGetGender === true ? 'Loading gender' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    // onchange
                                    value={email}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'email')
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'password')
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.firstname" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'firstName')
                                    }}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'lastName')
                                    }}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'phoneNumber')
                                    }}

                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'address')
                                    }}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    value={gender}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'gender')
                                    }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option keyMap={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }


                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'

                                    value={position}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'position')
                                    }}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option keyMap={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className='form-control'
                                    value={role}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'role')
                                    }}

                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option keyMap={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>
                                        Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>

                            </div>


                            <div className='col-12 my-3'>

                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}

                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}

                                />
                            </div>

                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>


        )
    }

}

const mapStateToProps = state => {
    return {
        roleRedux: state.admin.roles,
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => { // để fire 1 cái even redux bắt buộc dùng key dispatch
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart()),
        createNewUser: (data) => dispatch(action.createNewUser(data)),
        fetchUserRedux: () => dispatch(action.fetchAllUsersStart()),
        editAllUserRedux: (data) => dispatch(action.editAllUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
