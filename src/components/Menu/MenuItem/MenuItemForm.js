import React from 'react';
import classes from './MenuItem.module.css'
import Input from "../../UI/Input";


const MenuItemForm = (props) => {
	return (
			<form className={classes.form}>
				<Input
						label="수량"
						input={{
							id : 'amount_' + props.id, /*props.id 를 추가하지않았을 경우 두가지 주요 단점:
							1. 어떤 레이블을 클릭하던 실제 MeatItem 에 속한 것이 아니더라도 항상 동일한 첫 번째 입력 요소가 선택됩니다.
							2. 스크린리더는 레이블 + 입력을 올바르게 연결할 수 없습니다(모든 레이블이 동일한 입력을 가리키기 때문에)
							해결법: props.id 를 추가해 ID prop 을 MenuItemForm 에 받는것이고 이걸 사용해서 <Input> 당 고유 id 생성*/
							type : 'number',
							min : '1',
							max : '5',
							step : '1',
							defaultValue : '1',
						}}
				/>
				<button>+ 추가</button>
			</form>
	)
}
export default MenuItemForm;