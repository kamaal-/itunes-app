/**
 * Created by kamaal on 10/7/17.
 */

import moment from 'moment'

/** Class representing a single album. */
export default class Album {

    /**
     * Create a point.
     * @param {object} json - to create class from response of search result
     */
    constructor(json){
        this.title = json.collectionName
        this.artist = json.artistName
        this.id = json.collectionId
        this.artwork = json.artworkUrl100
        this.genre = json.primaryGenreName
        this.currency = json.currency
        this.price = json.collectionPrice
        this.artistId = json.artistId
        this.releaseDate = moment(json.releaseDate).format('MM-DD-YYYY')
    }
}
