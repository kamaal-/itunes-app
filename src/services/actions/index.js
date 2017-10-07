/**
 * Created by kamaal on 10/7/17.
 */

import {
    SEARCH_TEXT_UPDATED,
    ITUNES_FETCH_STARTED,
    ITUNES_FETCH_SUCCESS,
    FAVORITE_ALBUM_ADDED,
    FAVORITE_ARTIST_FILTERED,
    MOBILE_TAB_CHANGED
} from '../action-types'
import {uniqBy} from 'lodash'
import Album from '../../models/Album' // album model
import Suggestion from '../../models/Artist' // importing artist as suggestion

/*
* Add or remove favorite album from favorite collection by checking current favorite collection
* @param {array} _favorite collection of Album instances from current state
* @album {Album} album instance of Album from triggered album
* @returns {array} of Album instances
* */
const _togleFavorite = (_favorite, album) => {
    let favorite = _favorite
    if(favorite.find(_album => _album.id === album.id)){
        return favorite.filter(_album => _album.id !== album.id)
    }
    favorite.push(album)
    return favorite
}

/*
 * Fetch albums using browsers default fetch api
 * @param {string} artist name of the artist from search input
 * @callback cb
 */
const _justFetch = (artist, cb) => {
    const uri = `https://itunes.apple.com/search?term=${artist}&entity=album`
    fetch(uri)
        .then(response => response.json())
        .then(res => {
            if (res.resultCount > 0) {
                cb(res.results.map(r => new Album(r)), res.results.map(r => new Suggestion(r)))
            }
        })
}

/*
 * Redux action to call fetch artist
 * @param {string} artist name of the artist from search input
 * @returns {object} will return Promise from fetch api it will be composed to pure object from redux-thunk
 */
export const doSearch = (artist = 'michael') => {
    return (dispatch, getState) => {
        let { suggestions } = getState() // getting current suggestions
        dispatch({type: ITUNES_FETCH_STARTED})
        _justFetch(artist, (albums, _suggestions) => {
            suggestions = suggestions.length < 200 ? suggestions.concat(_suggestions) : [] // combining old suggestions and new ones from each fetch, max limit only 200 items(for performance)
            suggestions = uniqBy(suggestions, 'name') // then removing duplicate artist from suggestions.
            dispatch({ type: ITUNES_FETCH_SUCCESS, albums, suggestions })
        })
    }
}

/*
 * Redux action to call fetch artist
 * @param {string} value name of the artist from search input
 * @returns {object} will return Promise from fetch api it will be composed to pure object from redux-thunk
 */
export const searchTextUpdated = value => {
    return dispatch => {
        dispatch({type: SEARCH_TEXT_UPDATED, searchText: value})
        if(value && value.length > 2) {
            dispatch(doSearch(value))
        }else{
            dispatch({type: ITUNES_FETCH_STARTED, searchText: value})
        }
    }
}

/*
* Redux action call from album favorite click
* @album {Album} album instance of Album from triggered album
* @returns pure redux object
* */
export const addRemoveFavorite = album => {
    return (dispatch, getState) => {
        let { favoriteAlbums } = getState()
        const _favorite = _togleFavorite(favoriteAlbums, album)
        dispatch({type: FAVORITE_ALBUM_ADDED, favoriteAlbums: _favorite})
    }
}

/*
 * Redux action call from favorite artist filter
 * @artist {array} of artists id from select component
 * @returns pure redux object
 * */
export const favoriteArtistFilter = artist => {
    return (dispatch, getState) => {
        dispatch({type: FAVORITE_ARTIST_FILTERED, favoriteArtists: artist})
    }
}

/*
 * Redux action call from mobile tab button
 * @selectedTab {number} index of clicked button
 * @returns pure redux object
 * */
export const mobileTabClicked = selectedTab => {
    return (dispatch, getState) => {
        dispatch({type: MOBILE_TAB_CHANGED, selectedTab})
    }
}