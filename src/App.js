import React, { Component } from 'react'
import './App.css' // should import before all components to avoid style override
import Header from './components/Header'
import SearchResult from './components/SearchResult'
import Favorites from './components/Favorites'

class App extends Component {
  render() {
    return (
      <div className="app">
          <div className="app__wrap">
            <Header/>
              <section className="content">
                <Favorites/>
                <SearchResult/>

              </section>
          </div>
      </div>
    );
  }
}

export default App
