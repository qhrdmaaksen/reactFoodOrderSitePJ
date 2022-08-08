import React, {useContext} from 'react';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {

	/*useContext 를 사용해서 리액트는 HeaderCartButton 컴포넌트를 다시 평가함 컨텍스트가 변경될 때마다
	업데이트하면 당연히 바뀜	CartProvider 컴포넌트에서*/
	const cartCtx = useContext(CartContext)

	/*cartItems 항목 수를 가져오는 방법*/
	/*reduce 메소드의 첫 번째 인수로 전달한 함수는 두개의 인수를 받음(자바스크립트에의해 자동으로 그 함수를 호출함,
	* -reduce 를 호출하는 배열에 있는 모든 항목에대해서)*/
	const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
		/*처음에는 0 이였지만 처음으로 이 함수가 실행되고 나면 그 이전 실행에서 반환되는 결과값으로됨*/
		return currentNumber + item.amount /*CartItem 객체에는 amount field 가있어서 항목 유형별로 항목 수를 저장 할 수 있기 때문에 더해서 반환함*/
	}, 0)

	return (
			<button className={classes.button} onClick={props.onHeaderOnclick}>{/*Header compo 에 연결된 onClick*/}
				{/*---카트 아이콘---*/}
				<span className={classes.icon}>
					<CartIcon/>
				</span>
				<span>
					내 장바구니
				</span>
				{/*-----수량-----*/}
				<span className={classes.badge}>{numberOfCartItems}</span>
			</button>
	)
}

export default HeaderCartButton;