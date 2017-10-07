/**
 * Created by kamaal on 10/7/17.
 */

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
    favoriteAlbums: []
}

export default (state = initialState) => {
    return state
}