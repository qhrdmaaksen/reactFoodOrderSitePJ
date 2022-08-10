import {useReducer} from 'react'; /*useReducer 는 두 개의 요소로 된 배열을 반환함*/
import CartContext from './cart-context'

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

/*음식이 이미 장바구니에있는지 여부확인 및 아이템 삭제에따른 복잡도에따라 useReducer 사용, 외부에서 사용하는 이유는 리듀서 함수가 아래 컴포넌트에서 아무것도 필요하지않기때문
* -또한 아래 컴포넌트 렌더링될때마다 항상 재생성되어서도 안되기때문, 리듀서 함수에서는 state 객체와 액션을 받는다(리액트에의해 자동으로)*/
const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedItems =
				state.items.concat(action.item); /*concat 은 기존 배열 편집이 아닌 새 배열을 반환함*/
		const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}
	return defaultCartState;
}


/*장바구니 데이터 관리*/
const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

	/*장바구니에 추가해야할 항목 얻는 함수*/
	const addItemToCartHandler = (item) => {
		dispatchCartAction({
			type: 'ADD',
			item: item,
		}) /*문자열인 경우 규엑에 따라서 모두 대문자로 사용*/
	}
	/*장바구니에서 아이템 삭제하는 함수*/
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({type: 'REMOVE', id: id})
	}
	const cartContext = {
		items: cartState.items, /*item 은 state 로 관리 totalAmount 는 cartState.totalAmount 로 관리*/
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	}
	return (
			/*context 에 접근해야하는 컴포넌트를 CartContext.Provider 로 감싼것
			*컨텍스트 데이터를 관리하는 로직을 모두 이 컴포넌트에 추가 할 수 있음
			* -장바구니 데이터가 변경될때마다 컨텍스트 영향받는 모든 컴포넌트는 재평가됨*/
			<CartContext.Provider value={cartContext}>
				{props.children}
			</CartContext.Provider>
	)
}

export default CartProvider;