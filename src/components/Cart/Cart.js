import {Fragment, useContext, useState} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

/*내 장바구니*/
const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [didSubmit, setDidSubmit] = useState(false)
	const cartCtx = useContext(CartContext)

	const totalAmount = `${cartCtx.totalAmount} 원`
	const hasItems = cartCtx.items.length > 0; /*아이템이있는지 여부 체크*/

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id)
	}

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item) /*장바구니 항목의 더하기 버튼 함수(addItem 함수가 트리거가됨 CartProvider 에서 addItemToCartHandler 에 cartAction 을 전달함)*/
	}

	const orderHandler = () => {
		setIsCheckout(true)
		console.log('Cart comp orderHandler Fn :::')
	}

	/*userData 와 Cart 데이터 모두 전송*/
	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true)
		await fetch('https://react-http-d5583-default-rtdb.firebaseio.com/order.json',
				{
					method: 'POST',
					body: JSON.stringify({
						user: userData,
						orderedItems: cartCtx.items, /*item 항목*/
					})
				})
		setIsSubmitting(false)
		setDidSubmit(true)
		cartCtx.clearCart() /*cart 주문 완료 후 내 장바구니 비워주기*/
	}

	const cartItems = (
			<ul className={classes['cart-items']}
			>
				{cartCtx.items.map((item) => (
						<CartItem
								key={item.id}
								name={item.name}
								amount={item.amount}
								price={item.price}
								/*bind method 는 함수를 사전에 구성함 향후 실행을 위해서 기본적으로 인수를 미리 구성할 수 있음 함수가 실행될때 받을 인수
								* -컴포넌트와 이벤트 함수를 연결하는것
								* -바인딩하지않아도 이벤트 함수는 실행되지만 어떤 컴포넌트가 호출했는지 알수없음
								* -바인딩하지않으면 이벤트 함수에서 this.state or this.props 사용할경우 undefined 로 처리됨*/
								onRemove={cartItemRemoveHandler.bind(null, item.id)} /*추가되거나 삭제될 항목의 id 가 remove 핸들러로 전달됨*/
								onAdd={cartItemAddHandler.bind(null, item)}
						/>
				))}

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

	const modalActions = (
			<div className={classes.actions}>
				{!hasItems && <p>장바구니에 추가된 메뉴가 없습니다.</p>}
				<button className={classes['button--alt']} onClick={props.onClose}>
					닫기
				</button>
				{hasItems && (
						<button className={classes.button} onClick={orderHandler}>
							주문
						</button>
				)}
			</div>
	)

	/*현재 제출하는 중인 경우 표시되어야하는 컨텐츠*/
	const isSubmittingModalContent = <p>주문 정보 전송중...</p>

	/*주문 완료 시 */
	const didSubmitModalContent = (
			<Fragment>
				<p>주문이 성공적으로 전송되었습니다. 감사합니다.</p>
				<div className={classes.actions}>
					<button className={classes.button} onClick={props.onClose}>
						닫기
					</button>
				</div>
			</Fragment>
	)

	/*제출 중일때와 제출이 완료됐을때*/
	const cartModalContent = (
			<Fragment>
				{cartItems}
				<div className={classes.total}>
					<span>총 합계</span>
					<span>{totalAmount}</span>
				</div>
				{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
				{!isCheckout && modalActions}
			</Fragment>
	)

	return (
			<Modal onClose={props.onClose}>
				{!isSubmitting && !didSubmit && cartModalContent} {/*제출중이지 않으며, 아직 제출하지 않았을땐 cartModalContent 표현*/}
				{isSubmitting && isSubmittingModalContent}
				{!isSubmitting && didSubmit && didSubmitModalContent} {/*제출 중이진 않지만 제출했을 경우 didSubmitModalContent 표현*/}
			</Modal>
	)
}
export default Cart;