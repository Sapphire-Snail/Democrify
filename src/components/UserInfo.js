import React, { Component } from 'react';
import { loadUser } from '../redux/actions/thunk';
import { connect } from 'react-redux';

class UserInfo extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        return(
            <div>
                hey
                {/* <p> Hello { this.props.userData.display_name } </p> */}
                {/* <p> Country: { this.props.userData.country } </p>  */}
            </div>
        );
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        userData: state.userData
    };
}

const mapDispatchToProps = {
    loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);