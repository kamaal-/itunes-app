import React from 'react'
import './Header.css'
import Search from '../containers/Search'
import Tab from '../containers/Tab'

const Header = props => {
    return(
        <header className={`header`}>
            <div className="header__main">
                <div className="header__top">
                    <section className="logo">
                        <h1 className="logo__title">
                            <span className="logo__title logo__title--lean">FIND MY </span>ALBUM
                        </h1>
                        <h4 className="logo__sub-title">Itunes Affiliate App</h4>
                    </section>
                    <Search onChange={() => {}}/>
                </div>
                <Tab/>
            </div>

        </header>
    )
}

export default Header