/**
 * Created by kamaal on 10/7/17.
 */
import {
    SEARCH_TEXT_UPDATED,
    ITUNES_FETCH_STARTED,
    ITUNES_FETCH_SUCCESS,
    FAVORITE_ALBUM_ADDED,
    FAVORITE_ARTIST_FILTERED
} from '../action-types'
/*
 * Reducer will always create new immutable state from existing state, states are immutable.
 */

/*
 * Initial state of our application
 * no albums
 * no favorites yet
 */
const initialState = {
    albums: [],
    favoriteAlbums: [],
    searchText: '',
    suggestions: [],
    favoriteText: '', // will never be used as any data just to prevent state from immutable update for array shapes
    favoriteArtists: []
}

/*
 * Main reducer function due to the size of our app size we can manage with single function.
 * @param {object} state application state
 * @param {object} action current action type from action
 * @returns {object}
 */
export default (state = initialState, action: {}) => {
    switch (action.type) {
        case ITUNES_FETCH_STARTED:
            return {...state, albums:[]}
        case ITUNES_FETCH_SUCCESS:
            return {...state, albums: action.albums, suggestions: action.suggestions}
        case SEARCH_TEXT_UPDATED:
            return {...state, searchText: action.searchText}
        case FAVORITE_ALBUM_ADDED:
            return {...state, favoriteAlbums: action.favoriteAlbums,  favoriteText: Math.random()}
        case FAVORITE_ARTIST_FILTERED:
            return {...state, favoriteArtists: action.favoriteArtists, favoriteText: Math.random()}
        default:
            return {...state}
    }
}