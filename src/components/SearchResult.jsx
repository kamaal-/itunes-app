import React from 'react'
import { connect } from 'react-redux'
import './SearchResult.css'
import Album from '../containers/Album'
const SearchResult = ({albums, selectedTab})=> {
    const active = selectedTab === 1 ? 'active' : ''
    return (
        <div className={`main ${active}`}>
            {albums.map(album => <Album album={album}/>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        albums: state.albums,
        selectedTab: state.selectedTab,
    }
}

export default connect(mapStateToProps, {})(SearchResult)