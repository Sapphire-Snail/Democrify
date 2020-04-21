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
    }
    
    search() {
        const searchString = document.getElementById("searchBox").value;
        if (searchString != "") {
            this.props.searchSong(searchString);
        }
    }

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <Input id="searchBox" placeholder="Search" style={{width:'50%', display:'inline-block'}} onChange={this.search}></Input>
                <Search />
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