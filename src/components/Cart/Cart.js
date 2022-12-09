import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { getItems, getCurrency, getTotal, removeFromCart } from '../../ducks/cart';
import { AnalyticsBrowser } from '@segment/analytics-next'

const analytics = AnalyticsBrowser.load({ writeKey: 'NGbJWOc7gdECe6JsObFcsAbQDRq40E2r' })


const mapStateToProps = (state, props) => {
    return {
        items: getItems(state, props),
        currency: getCurrency(state, props),
        total: getTotal(state, props)
    }
}

class Cart extends Component {
    handleSubmit = () => {
        const {  isInCart, total } = this.props;

        if (isInCart) {
            //removeFromCart(id);
            analytics.track('Empty Cart');
        } else {
            //addToCart(id);
            /*
            analytics.identify("Simple@007", {
                name: "Simple B",
                email: "s.b@example.com",
                plan: "premium",
                logins: 5
              });
              */
            analytics.track('Order Submitted', {
                cart_value: total,
                order_value: total
                // order_value: getTotal (state,props)
                // cart_value: getTotal (state,props),
                // order_value: getTotal (state,props)
              }
            );
            
        }
    }

    render () {
        const  { items, total, currency, removeFromCart, isInCart } = this.props;
        
        return (
        <div>
            <h3>Shopping Cart</h3>

            <div className="cart">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {items.length > 0 && (
                            <div className="cart__body">
                                {items.map(item => (
                                    <CartItem key={item.id} {...item} onClick={() => removeFromCart(item.id)} />
                                ))}
                            </div>
                        )}
                        {items.length === 0 && (
                            <div className="alert alert-info">Cart is empty</div>
                        )}
                        <div className="cart__total">Total: {total} {currency}</div>
                        <div className="cart__button-wrap">
                        <button
                            className={isInCart ? 'btn btn-danger' : 'btn btn-primary'}
                            onClick={this.handleSubmit}
                        >
                            {isInCart ? 'Nothing to Submit' : 'Submit Order'}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}
Cart.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    currency: PropTypes.string,
    removeFromCart: PropTypes.func.isRequired
}

Cart.propTypes = {
    items: PropTypes.number.isRequired, 
    total: PropTypes.number.isRequired, 
    currency: PropTypes.string.isRequired, 
    removeFromCart: PropTypes.func.isRequired, 
    isInCart: PropTypes.bool.isRequired
}
export default Cart;
