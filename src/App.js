import React, { Component } from 'react'
import './App.css' // should import before all components to avoid style override
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="app">
          <div className="app__wrap">
            <Header/>
            Hello world
          </div>
      </div>
    );
  }
}

export default App
