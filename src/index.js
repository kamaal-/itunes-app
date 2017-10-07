import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux' // redux wrapper
import { createStore, applyMiddleware } from 'redux' // redux store
import thunk from 'redux-thunk' // to return non object (Promise) actions
import { composeWithDevTools } from 'redux-devtools-extension' // chrome redux dev-tool support
import reducer from './services/reducers'
import registerServiceWorker from './registerServiceWorker'


/*
 * Creating redux store from reducer returned state and composing with redux thunk for async actions
 */
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
registerServiceWorker()
