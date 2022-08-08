import CartContext from './cart-context'

const CartProvider = (props) => {
	const addItemToCartHandler = (item) => {

	}
	const removeItemFromCartHandler = (id) => {

	}
	const cartContext = {
		items: [],
		totalAmount: 0,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	}
	return (
			/*context 에 접근해야하는 컴포넌트를 CartContext.Provider 로 감싼것
			*컨텍스트 데이터를 관리하는 로직을 모두 이 컴포넌트에 추가 할 수 있음*/
			<CartContext.Provider value={cartContext}>
				{props.children}
			</CartContext.Provider>
	)
}
export default CartProvider;