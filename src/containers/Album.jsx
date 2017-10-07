import React from 'react'
import { addRemoveFavorite } from '../services/actions/'
import { connect } from 'react-redux'
import './Album.css'

/*
 * Helper function to get heart icon for favorite button, this will return filled hart icon
 * or empty heart icon regarding the state of favorite
 * @param {array} isFavorite it can be null or array
 * @returns {path} svg <path>
 */
const _heartSVG = isFavorite => {
    return !isFavorite ? (
        <path d="M13 4.656q0-0.633-0.168-1.117t-0.43-0.77-0.637-0.465-0.734-0.242-0.766-0.062-0.875 0.199-0.863 0.5-0.676 0.563-0.469 0.48q-0.141 0.172-0.383 0.172t-0.383-0.172q-0.187-0.219-0.469-0.48t-0.676-0.563-0.863-0.5-0.875-0.199-0.766 0.062-0.734 0.242-0.637 0.465-0.43 0.77-0.168 1.117q0 1.313 1.461 2.773l4.539 4.375 4.531-4.367q1.469-1.469 1.469-2.781zM14 4.656q0 1.727-1.789 3.516l-4.867 4.687q-0.141 0.141-0.344 0.141t-0.344-0.141l-4.875-4.703q-0.078-0.062-0.215-0.203t-0.434-0.512-0.531-0.762-0.418-0.945-0.184-1.078q0-1.719 0.992-2.687t2.742-0.969q0.484 0 0.988 0.168t0.937 0.453 0.746 0.535 0.594 0.531q0.281-0.281 0.594-0.531t0.746-0.535 0.937-0.453 0.988-0.168q1.75 0 2.742 0.969t0.992 2.687z"></path>
    ) : (<path d="M7 13q-0.203 0-0.344-0.141l-4.875-4.703q-0.078-0.062-0.215-0.203t-0.434-0.512-0.531-0.762-0.418-0.945-0.184-1.078q0-1.719 0.992-2.687t2.742-0.969q0.484 0 0.988 0.168t0.937 0.453 0.746 0.535 0.594 0.531q0.281-0.281 0.594-0.531t0.746-0.535 0.937-0.453 0.988-0.168q1.75 0 2.742 0.969t0.992 2.687q0 1.727-1.789 3.516l-4.867 4.687q-0.141 0.141-0.344 0.141z"></path>)
}

/*
 * will truncate long texts
 * @param {string} string to truncate
 * @returns string
 */
const truncate = string => {
    if (string.length > 25)
        return string.substring(0,25)+'...';
    else
        return string;
}

const Album  = ({album, addRemoveFavorite, className, favoriteAlbums}) => {
    const isFavorite = favoriteAlbums.find(f => f.id === album.id)
        , moduleExtenderClassName = className || ''
    return (
        <div className={`album album--${moduleExtenderClassName}`}>
            <div className="album__thumb">
                <img src={album.artwork} alt=""/>
            </div>

            <div className="album__content">
                <span className="album__title">{truncate(album.title)}</span>
                <span className="album__artist">{truncate(album.artist)}</span>
                <span className="album__price">{album.price} {album.currency}</span>
                <span className="album__date">{album.releaseDate}</span>
                <button className="album__btn" onClick={() => addRemoveFavorite(album)}>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                        {_heartSVG(isFavorite)}
                    </svg>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favoriteAlbums: state.favoriteAlbums,
        favoriteText: state.favoriteText
    }
}

export default connect(mapStateToProps, {addRemoveFavorite})(Album)