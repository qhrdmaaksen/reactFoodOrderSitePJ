import React, {useContext} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'

/*내 장바구니*/
const Cart = (props) => {

	const cartCtx = useContext(CartContext)

	const cartItems = (
			<ul className={classes[`cart-items`]}
			>
				{cartCtx.items.map(item => <li>{item.name}</li>)}
			</ul>
	);

	return (
			<Modal onClose={props.onClose}>
				{cartItems}
				<div className={classes.total}>
					<span>총 수량</span>
					<span>60000</span>
				</div>
				<div className={classes.actions}>
					<button className={classes[`button--alt`]} onClick={props.onClose}>닫기</button>
					<button className={classes.button}>주문</button>
				</div>
			</Modal>
	)
}
export default Cart;