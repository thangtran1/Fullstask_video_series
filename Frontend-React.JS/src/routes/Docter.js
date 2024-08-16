import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Docter/ManageSchedule';
import Header from '../containers/Header/Header';
class Docter extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="Docter-container" >
                    <div className="Docter-list">
                        <Switch>
                            <Route path="/docter/manage-schedule" component={ManageSchedule} />

                        </Switch>
                    </div>
                </div >
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DocterMenuPath: state.app.DocterMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Docter);
