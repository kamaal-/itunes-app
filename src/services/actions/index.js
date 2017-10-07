/**
 * Created by kamaal on 10/7/17.
 */

import {
    SEARCH_TEXT_UPDATED,
    ITUNES_FETCH_STARTED,
    ITUNES_FETCH_SUCCESS
} from '../action-types'
import {uniqBy} from 'lodash'
import Album from '../../models/Album' // album model
import Suggestion from '../../models/Artist' // importing artist as suggestion

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
        let { suggestions } = getState()
        dispatch({type: ITUNES_FETCH_STARTED})
        _justFetch(artist, (albums, _suggestions) => {
            suggestions = suggestions.concat(_suggestions)
            suggestions = uniqBy(suggestions, 'name')
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