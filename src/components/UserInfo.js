import React, { Component } from 'react';

class UserInfo extends Component {

    render() {
        return(
            <div>
                 { this.props.userInfo.display_name && 
                 [
                    <p key={0}> Hello { this.props.userInfo.display_name } </p>,
                    <p key={1}> Country: { this.props.userInfo.country } </p>
                 ]
                 }
            </div>
        );
    }
}

export default UserInfo;