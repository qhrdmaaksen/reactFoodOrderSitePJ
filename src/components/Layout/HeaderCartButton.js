import React from 'react';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
	return (
			<button className={classes.button} onClick={props.onHeaderOnclick}>{/*Header compo 에 연결된 onClick*/}
				{/*---카트 아이콘---*/}
				<span className={classes.icon}>
					<CartIcon />
				</span>
				<span>
					내 장바구니
				</span>
				{/*-----수량-----*/}
				<span className={classes.badge}>3</span>
			</button>
	)
}

export default HeaderCartButton;