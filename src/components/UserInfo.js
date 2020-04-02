import React, { Component } from 'react';

class UserInfo extends Component {

    render() {
        return(
            <div>
                 { this.props.userInfo.display_name && <p> Hello { this.props.userInfo.display_name } </p>}
            </div>
        );
    }
}

export default UserInfo;