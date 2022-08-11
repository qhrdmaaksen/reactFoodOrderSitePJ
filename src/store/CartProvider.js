import {useReducer} from 'react'; /*useReducer 는 두 개의 요소로 된 배열을 반환함*/
import CartContext from './cart-context'

const defaultCartState = {
	items: [],
	totalAmount: 0,
}


/*장바구니 추가 로직*/

/*음식이 이미 장바구니에있는지 여부확인 및 아이템 삭제에따른 복잡도에따라 useReducer 사용, 외부에서 사용하는 이유는 리듀서 함수가 아래 컴포넌트에서 아무것도 필요하지않기때문
* -또한 아래 컴포넌트 렌더링될때마다 항상 재생성되어서도 안되기때문, 리듀서 함수에서는 state 객체와 액션을 받는다(리액트에의해 자동으로)*/
const cartReducer = (state, action) => {
	if (action.type === 'ADD') {

		const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;

		/*장바구니에있는 기존 항목으로 가서 js 에 내장된 메소드 findIndex 호출
		* -findIndex : 배열에서 항목의 인덱스를 찾아줌, boolean 으로 반환함*/
		const existingCartItemIndex = state.items.findIndex((item) =>
				item.id === action.item.id); /*현재 배열에서 보고있는 항목이 전달된 액션으로 추가하는 항목과 동일한 id 를 가지는지*/

		const existingCartItem = state.items[existingCartItemIndex]; /*findIndex 로 항목이 존재한다면 existingCartItem 으로 얻음*/
		let updatedItems;
		if (existingCartItem) {
			/*이미 배열에있는 경우 updatedItem 은 새 객체와 같다고 설정되어 수량을 업데이트함
			* 이미 같은 아이템이 들어있다면 기존 아이템의 수량을 업데이트함*/
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			}
			updatedItems = [...state.items] /*기존 항목을 복사하며 변경 불가능하게 업데이트함, 메모리에있는 이전 배열을 편집하지 않고 이전 객체를 복사하는 새 배열을 만듦*/
			updatedItems[existingCartItemIndex] = updatedItem; /*CartItems 배열에서 식별한 오래된 항목을 선택해 updatedItem 으로 덮어 씌움 */
		} else {
			/*항목이 CartItems 배열에 처음으로 추가되는 경우*/
			updatedItems = state.items.concat(action.item) /* concat 은 기존 배열 편집이 아닌 새 배열을 반환함 */
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}

	/*장바구니 삭제 로직*/
	if (action.type === 'REMOVE') { /*if 문 위치도 체크해주자 defaultCartState 를 반환하기 전에 다른 액션이 있을 경우를 대비해서 이 위치에서 작업*/

		const existingCartItemIndex = state.items.findIndex((item) =>
				item.id === action.id /*기존 항목의 인덱스를 찾음 */
		)
		const existingItem = state.items[existingCartItemIndex]; /*항목자체를 식별된 인덱스로 가져옴*/

		const updatedTotalAmount = state.totalAmount - existingItem.price /*빼기 수량을 업데이트함, 총액은 삭제된 항목 하나의 가격만큼 감소 */
		let updatedItems;

		if (existingItem.amount === 1) {
			/*true 가 반환되면 새로 반환된 배열에 항목을 유지, false 가 반환되면 항목을 삭제*/
			updatedItems = state.items.filter((item) => item.id !== action.id) /*새 배열을 반환하는 내장 메소드(특정 조건을 적용하여 필터링하며 필터링할 함수를 넣으면 배열의 모든 항목에대해 실행되는 함수임)*/
		} else {
			/*- 버튼 클릭시 수량이 1 보다 클 경우 배열에서 항목을 삭제하지않고 수량만 업데이트*/
			const updatedItem = {...existingItem, amount: existingItem.amount - 1};
			/*이전 항목을 가지고있는 새 배열을 만듦*/
			updatedItems = [...state.items]
			updatedItems[existingCartItemIndex] = updatedItem /*배열에서 이전 항목을 덮어씀, 업데이트된 수량이있는 updatedItems 로 */
		}
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