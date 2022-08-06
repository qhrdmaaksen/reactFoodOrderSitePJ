import React from 'react';
import classes from './Cart.module.css'

/*내 장바구니*/
const Cart = (props) => {
	const cartItems = (
			<ul className={classes[`cart-items`]}
			>
				{[
					{
						id: 'c1',
						name: 'Sushi',
						amount: 2,
						price: 60000,
					},
				].map(item => <li>{item.name}</li>)}
			</ul>
	);

	return (
			<div>
				{cartItems}
				<div className={classes.total}>
					<span>총 가격</span>
					<span>60000</span>
				</div>
				<div className={classes.actions}>
					<button className={classes[`button--alt`]}>닫기</button>
					<button className={classes.button}>주문</button>
				</div>
			</div>
	)
}
export default Cart;