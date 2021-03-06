import React, {Component} from 'react'
import {connect} from 'react-redux'
import {uniqBy} from 'lodash'
import Album from '../containers/Album'
import Artist from '../models/Artist'
import Select from 'react-select'
import {favoriteArtistFilter} from '../services/actions'
import 'react-select/dist/react-select.css'
import './Favorites.css'

const getFavoriteArtists = favorite => {
    let atrists = favorite.map(f => new Artist(f))
    // no duplicate
    return uniqBy(atrists, 'id')

}

class Favorites extends Component {
    constructor(props) {
        super(props)

    }

    render(){
        const {favorite, favoriteArtists, favoriteArtistFilter, selectedTab} = this.props
            , artists = getFavoriteArtists(favorite).map(a => {return {value: a.id, label: a.name}})
            , isFavorite = artists.length ? true : false
            , active = selectedTab === 0 ? 'active' : ''
        return (
            <section className={`favorites ${active}`}>
                <h3 className="favorites__title">FAVORITE ALBUMS</h3>
                {isFavorite && <Select
                    name="form-field-name"
                    value={favoriteArtists}
                    placeholder="Filter by artist"
                    options={artists}
                    multi={true}
                    onChange={(e) => {const values = e.map(f => f.value); favoriteArtistFilter(values)}}
                /> }
                <div className="favorite__container iso">
                    {favorite.length ? favorite
                        .filter(album => {
                            if(favoriteArtists.length){
                                return  favoriteArtists.includes(album.artistId)
                            }
                            return true
                        })
                        .map(f => <Album className="favorite" album={f} />) : null}
                </div>
            </section>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectedTab: state.selectedTab,
        favorite: state.favoriteAlbums,
        favoriteArtists: state.favoriteArtists,
        favoriteText: state.favoriteText // random hash text to keep up to date
    }
}

export default connect(mapStateToProps, {favoriteArtistFilter})(Favorites)