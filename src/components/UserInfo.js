import React, { Component } from 'react';

class UserInfo extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                Hello 
                {this.props.userInfo.display_name}
            </div>
        );
    }
}

export default UserInfo;