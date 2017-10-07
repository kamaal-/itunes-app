/**
 * Created by kamaal on 10/7/17.
 */

/** Class representing a single artist can be used to suggestion angine and favorite filter. */
export default class Artist {

    /**
     * Create a point.
     * @param {object} json - to create class from response of search result
     */
    constructor(json){
        this.name = json.artistName || json.artist
        this.id = json.artistId
    }
}