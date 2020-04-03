import React, { Component } from 'react';

class UserInfo extends Component {

    render() {
        return(
            <div>
                <p> Hello { this.props.userInfo.display_name } </p>
                <p> Country: { this.props.userInfo.country } </p> 
            </div>
        );
    }
}

export default UserInfo;