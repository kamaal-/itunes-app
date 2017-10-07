/**
 * Created by kamaal on 10/7/17.
 */

/*
 * All Redux action types in common place to be access from reducer and action
 */
export const SEARCH_TEXT_UPDATED = 'SEARCH_TEXT_UPDATED'

/*
 * Fetch actions
 */
export const ITUNES_FETCH_STARTED = 'ITUNES_FETCH_STARTED' // dispatch when search fetch started
export const ITUNES_FETCH_SUCCESS = 'ITUNES_FETCH_SUCCESS' // dispatch after search fetch returns with data
export const ITUNES_FETCH_FAILED = 'ITUNES_FETCH_FAILED'  // dispatch if search fetch returns fail status or fetch fails

/*
 * Favorite albums
 * Once user clicked favorite button 'FAVORITE_ALBUM_ADD_REMOVE_STARTED' will be dispatch and action will toggle favorite item
 */
export const FAVORITE_ALBUM_ADDED =  'FAVORITE_ALBUM_ADDED' // will dispatch if favorite album added


/*
 * Favorite artist filtering
 * */
export const FAVORITE_ARTIST_FILTERED =  'FAVORITE_ARTIST_FILTERED' // will dispatch if favorite artist filtered

/*
 * Mobile tab clicked
 */
export const MOBILE_TAB_CHANGED =  'MOBILE_TAB_CHANGED' // will dispatch after tab update