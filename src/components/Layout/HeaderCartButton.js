import {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {

	/*useContext 를 사용해서 리액트는 HeaderCartButton 컴포넌트를 다시 평가함 컨텍스트가 변경될 때마다
	업데이트하면 당연히 바뀜	CartProvider 컴포넌트에서*/
	const cartCtx = useContext(CartContext)
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false) /*버튼에 애니메이션을 적용해야하는지 여부*/
	const {items} = cartCtx; /*cartCtx.items 을 useEffect 의 의존성으로 넣게되면 cartCtx 가 바뀔때마다 항상 다시 실행되기때문에 items 만 분해해줌*/

	/*cartItems 항목 수를 가져오는 방법*/
	/*reduce 메소드의 첫 번째 인수로 전달한 함수는 두개의 인수를 받음(자바스크립트에의해 자동으로 그 함수를 호출함,
	* -reduce 를 호출하는 배열에 있는 모든 항목에대해서)
	* reduce = 내장 메소드이며 데이터 배열을 값 하나로 변환해주는 메소드*/
	/*처음에는 0 이였지만 처음으로 이 함수가 실행되고 나면 그 이전 실행에서 반환되는 결과값으로됨*/
	/*CartItem 객체에는 amount field 가있어서 항목 유형별로 항목 수를 저장 할 수 있기 때문에 더해서 반환함*/
	const numberOfCartItems = items.reduce((curNumber, item) => {
		console.log("numberOfCartItems 호출중", cartCtx.items)
		return curNumber + item.amount;
	}, 0);

	/*true 라면 classes.bump 추가, false 면 추가하지 않음*/
	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`; /*버튼에 충돌 효과 및 크기 변경 애니메이션 헬퍼 상수*/


	/*Bump animation class 를 버튼 클래스가 포함하도록함, 그리고 다시 삭제하는 타이머 설정*/
	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true)

		const timer = setTimeout(()=>{
			setBtnIsHighlighted(false)

		},300)

		/*클린업 함수 추가, 이전 타이머를 삭제 후 새 타이머 설정 , 버튼은 항상 있어야함을 고려하고 타이머 또는 실행 중일 수도 있는 기타 사이드이펙트는, 정리하는 것이 좋은 습관임*/
		return ()=> {
			clearTimeout(timer)
		}
	}, [items])

	return (
			<button className={btnClasses} onClick={props.onHeaderOnclick}>{/*Header compo 에 연결된 onClick*/}
				<span className={classes.icon}>
					<CartIcon/>
				</span>
				<span>
					내 장바구니
				</span>
				<span className={classes.badge}>{numberOfCartItems}</span>
			</button>
	)
}

export default HeaderCartButton;