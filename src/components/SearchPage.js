import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchSong } from '../redux/actions/thunk';
import Search from './Search';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

class SearchPage extends Component  {

    constructor() {
        super();
        this.search = this.search.bind(this);
        this.state = {
            searchString: ""
        }
    }
    
    search(e) {
        this.setState({searchString:e.target.value});
        if (this.state.searchString != "") {
            this.props.searchSong(this.state.searchString);
        }
    }

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <Input id="searchBox" placeholder="Search" style={{width:'50%', display:'inline-block', marginBottom:10}} onChange={(e) => this.search(e)}></Input>
                {this.state.searchString && <Search />}
            </div>
        )
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        deviceId: state.webplayer.deviceId
    };
}

const mapDispatchToProps = {
    searchSong
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);