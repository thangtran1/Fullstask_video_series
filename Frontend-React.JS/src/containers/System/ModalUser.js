import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
        console.log('mouting modal')
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state: ', this.state)
        // })

        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return true;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call api create modal
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            //toggle click ra ngoài thì out
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className={'modal-user-container mt-5'}
                size='lg'
            >
                <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnChageInput(event, 'password') }}
                                value={this.state.password}
                            />
                        </div>

                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>

                        <div className='input-container '>
                            <label>Last name</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>

                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary' className='px-3'
                        onClick={() => { this.handleAddNewUser() }}>
                        Add new
                    </Button>
                    {' '}
                    <Button color='secondary' className='px-3' onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);