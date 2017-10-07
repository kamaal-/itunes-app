import React from 'react'
import { mobileTabClicked } from '../services/actions/'
import { connect } from 'react-redux'


const Tab  = ({mobileTabClicked, selectedTab, favoriteAlbums, albums}) => {
    const albumCount = albums.length
        ,favCount = favoriteAlbums.length
        ,tabs = [{name: 'FAVORITES', count:favCount} , {name: 'SEARCH RESULT', count: albumCount}]

    return (
        <div className="header__nav">
            <nav className="tab-nav">
                <ul className="tab-nav__container">
                    {tabs.map((tab, i) => {
                        const activeTab = i === selectedTab ? 'tab-nav__item--active' : ''
                        return (
                            <li key={i} className={`tab-nav__item ${activeTab}`}>
                                <span className={`tab-nav--counts`}>{tab.count}</span>
                                <button onClick={() => { mobileTabClicked(i) }} className="tab-nav__button">{tab.name}</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedTab: state.selectedTab,
        albums: state.albums,
        favoriteAlbums: state.favoriteAlbums,
        favoriteText: state.favoriteText,
    }
}

export default connect(mapStateToProps, {mobileTabClicked})(Tab)