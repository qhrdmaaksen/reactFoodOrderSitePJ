import React from 'react';

/*장바구니 데이터 컨텍스트*/
const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => {
	},
	removeItem: (id) => {
	},
})

export default CartContext;
