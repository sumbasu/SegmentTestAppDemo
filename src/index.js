import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import cartReducer from './ducks/cart';
import productsReducer from './ducks/products';
import Login from './Login';
import App from './App';
import productsData from './data/products';
import 'bootstrap/dist/css/bootstrap.css';
import { AnalyticsBrowser } from '@segment/analytics-next'
const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer
});

let store = createStore(
    rootReducer,
    {
        products: productsData // initial store values
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);


render(
    <Provider store={store}>
        <Login />
    </Provider>,
    document.getElementById('root')
);


// we can export this instance to share with rest of our codebase.
export const analytics = AnalyticsBrowser.load({ writeKey: 'NGbJWOc7gdECe6JsObFcsAbQDRq40E2r' })

const NewApp = () => (
  <div>
    <button onClick={() => analytics.track('hello world')}>Track</button>
  </div>
)