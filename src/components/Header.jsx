import React from 'react'
import './Header.css'

const Header = props => {
    return(
        <header className={`header`}>
            <div className="header__main">
                <section className="logo">
                    <h1 className="logo__title">
                        <span className="logo__title logo__title--lean">FIND MY </span>ALBUM
                    </h1>
                    <h4 className="logo__sub-title">Itunes Affiliate App</h4>
                </section>
                <section className="search">
                    Search
                </section>
            </div>
            <div className="header__nav">
                <nav className="tab-nav">
                    <ul className="tab-nav__container">
                        <li className="tab-nav__item">
                            <button className="tab-nav__button">FAVORITES</button>
                        </li>
                        <li className="tab-nav__item">
                            <button className="tab-nav__button">SEARCH RESULT</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header