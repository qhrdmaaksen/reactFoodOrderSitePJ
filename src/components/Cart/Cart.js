import React, {useContext} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

/*내 장바구니*/
const Cart = (props) => {

	const cartCtx = useContext(CartContext)

	const totalAmount = `${cartCtx.totalAmount} 원`

	const hasItems = cartCtx.items.length > 0; /*아이템이있는지 여부 체크*/

	const cartItemAddHandler = (item) => {

	}

	const cartItemRemoveHandler = (id) => {

	}

	const cartItems = (
			<ul className={classes[`cart-items`]}
			>
				{cartCtx.items.map((item) =>
						<CartItem
								key={item.id}
								name={item.name}
								amount={item.amount}
								price={item.price}
								onAdd={cartItemAddHandler.bind(null, item)} /*bind method 는 함수를 사전에 구성함 향후 실행을 위해서 기본적으로 인수를 미리 구성할 수 있음 함수가 실행될때 받을 인수*/
								onRemove={cartItemRemoveHandler.bind(null,item.id)} /*추가되거나 삭제된 항목의 id 가 remove 핸들러로 전달됨*/
						/>
				)}

				{/*더미 test 배열{[
					{
						id: 'c1',
						name: 'Sushi',
						amount: 2,
						price: 60000,
					},
				].map(item => <li>{item.name}</li>)}*/}
			</ul>
	);

	return (
			<Modal onClose={props.onClose}>
				{cartItems}
				<div className={classes.total}>
					<span>총 합계</span>
					<span>{totalAmount}</span>
				</div>
				<div className={classes.actions}>
					{!hasItems && <p>장바구니에 추가된 메뉴가 없습니다.</p>}
					<button className={classes[`button--alt`]} onClick={props.onClose}>닫기</button>
					{hasItems && <button className={classes.button}>주문</button>}
				</div>
			</Modal>
	)
}
export default Cart;