import React, {Fragment} from 'react';
import classes from './Header.module.css' /*(내장 css 모듈 지원 사용 예정)*/
import mealsIMG from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
	return ( /*JSX 사용 시 루트 요소는 하나만 존재 !*/
			<Fragment>
				<header className={classes.header}>
					<h1>vitamin777 리엑트 레스토랑</h1>
					<HeaderCartButton onHeaderOnclick={props.onShowCart}>Cart</HeaderCartButton>{/*Header 에서 onShowCart prop 받음(showCartHandler 를 가리킴)*/}
				</header>
				<div className={['main-image']}>
					<img src={mealsIMG} alt='테이블가득음식이미지'/>
				</div>
			</Fragment>
	)
}

export default Header;