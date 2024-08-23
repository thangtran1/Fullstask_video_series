import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDocter.scss';
import * as action from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDocter.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDocter } from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDocter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDocter: [],
            hasOlData: false,

            // save to docter_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: ''



        }
    }

    componentDidMount() {
        this.props.fetchAllDocters();
        this.props.getAllRequiredDocterInfor();
    }

    builDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);

                });
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);

                });
            }
            if (type === 'PAYMENT') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);

                });
            }
            if (type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

        }

        return result

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allDocters !== this.props.allDocters) {
            let dataSelect = this.builDataInputSelect(this.props.allDocters, 'USERS');
            this.setState({
                listDocter: dataSelect
            })
        }



        if (prevProps.allRequiredDocterInfor !== this.props.allRequiredDocterInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDocterInfor;

            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.builDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.builDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.builDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.builDataInputSelect(resClinic, 'CLINIC');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(this.props.allDocters, 'USERS');

            let { resPrice, resPayment, resProvince } = this.props.allRequiredDocterInfor;

            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.builDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.builDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDocter: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,

            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleSaveContentMarkdown = () => {
        let { hasOlData } = this.state;

        this.props.saveDetailDocter({

            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            docterId: this.state.selectedOption.value,
            action: hasOlData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,


        })
    }



    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listProvince, listPrice, listSpecialty, listClinic } = this.state;

        let res = await getDetailInforDocter(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;


            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedClinic = '',
                selectedSpecialty = ''



            if (res.data.Docter_Infor) {
                addressClinic = res.data.Docter_Infor.addressClinic;
                nameClinic = res.data.Docter_Infor.nameClinic;
                note = res.data.Docter_Infor.note;

                paymentId = res.data.Docter_Infor.paymentId;
                priceId = res.data.Docter_Infor.priceId;
                provinceId = res.data.Docter_Infor.provinceId;
                specialtyId = res.data.Docter_Infor.specialtyId;
                clinicId = res.data.Docter_Infor.clinicId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                });
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                });
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                });
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                });
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOlData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic



            })
            // if have markdown -> true , not markdouw false
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOlData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''

            })
        }
    };

    handleChangeSelectDocterInfor = async (selectedOption, name) => { // chọn theo tên
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })

    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        });
    }

    render() {

        let { hasOlData } = this.state;
        return (
            <div className='manage-docter-container'>
                <div className='manage-docter-title'>
                    <FormattedMessage id="admin.manage-docter.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-docter.select-docter" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDocter}
                            placeholder={<FormattedMessage id="admin.manage-docter.select-docter" />}
                            name={"selectedOption"}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-docter.intro" /></label>
                        <textarea
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        />
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDocterInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-docter.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDocterInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-docter.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDocterInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-docter.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.name-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.address-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDocterInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-docter.specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-docter.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDocterInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-docter.select-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>

                <div className='manage-docter-editor'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={this.handleSaveContentMarkdown}
                    className={hasOlData === true ? 'save-content-docter' : 'create-content-docter'}>
                    {hasOlData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-docter.save" />
                        </span> : <span>
                            <FormattedMessage id="admin.manage-docter.add" />
                        </span>
                    }
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDocters: state.admin.allDocters,
        allRequiredDocterInfor: state.admin.allRequiredDocterInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDocters: () => dispatch(action.fetchAllDocters()),
        getAllRequiredDocterInfor: () => dispatch(action.getRequiredDocterInfor()),
        saveDetailDocter: (data) => dispatch(action.saveDetailDocter(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocter);