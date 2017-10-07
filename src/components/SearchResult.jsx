import React from 'react'
import { connect } from 'react-redux'
import './SearchResult.css'
import Album from '../containers/Album'
const SearchResult = ({albums})=> {
    return (
        <div className="main">
            {albums.map(album => <Album album={album}/>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        albums: state.albums
    }
}

export default connect(mapStateToProps, {})(SearchResult)