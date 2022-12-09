// Note: Uncomment import lines during working with JSX Compiler.
// import React from 'react';
// import ReactDOM from 'react-dom';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './App';
import cartReducer from './ducks/cart';
import productsReducer from './ducks/products';
import productsData from './data/products';
import 'bootstrap/dist/css/bootstrap.css';
import Login7Payload from 'tedious/lib/login7-payload';
import { AnalyticsBrowser } from '@segment/analytics-next'

const analytics = AnalyticsBrowser.load({ writeKey: 'NGbJWOc7gdECe6JsObFcsAbQDRq40E2r' })

const appStyle = {
	height: '250px',
  	display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
  	display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};


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

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    );
});

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        analytics.identify(data.username, {
          name: data.username,
          email: data.username,
          plan: "premium",
          logins: 5
        });
        onSubmit(data); 
        //module.exports = {data};
        render(
          <Provider store={store}>
              <App />
          </Provider>,
          document.getElementById('root')
      );
    };

    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form>
    );
    //module.exports = {data};
};

// Usage example:

const Login = () => {

  
    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };
    return (
      <div style={appStyle}>
        <Form onSubmit={handleSubmit} />
      </div>
    );
};

//const root = document.querySelector('#root');
//ReactDOM.render(<Login />, root );


export default Login;