import {useRef, useState} from 'react';
import classes from './MenuItemForm.module.css'
import Input from "../../UI/Input";


const MenuItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true)
	const amountInputRef = useRef()

	const submitHandler = (event) => {
		event.preventDefault(); /*브라우저가 기본적으로 페이지를 다시 로드하는걸 막음*/

		/*useRef 로 생성된 ref 에 대해선 항상 current 와 value 를 써야한다
		* -왜냐하면 amountInputRef.current 는 해당 ref 에 저장된 인풋 요소를 가리키며 모든 인풋 요소는 기본적으로 value 속성을 갖고있다
		현재 입력된 값을 갖고 있는 곳이며 그 값은 항상 문자열임 input type 이 숫자인 경우에도 항상 문자열이니까 숫자로 변환해줘야함*/
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount; /*+ 기호를 넣어주면 문자열이 숫자로, 숫자도 숫자로 변환됨*/

		/*수량 유효성 체크
		* -문자열인지, min max 설정보다 부족하거나 크지않은지 */

		if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
			setAmountIsValid(false)
			return;
		}

		props.onAddToCart(enteredAmountNumber)
	}
	return (
			<form className={classes.form} onSubmit={submitHandler}>
				<Input
						ref={amountInputRef}
						label="수량"
						input={{
							id: 'amount_' + props.id, /*props.id 를 추가하지않았을 경우 두가지 주요 단점:
							1. 어떤 레이블을 클릭하던 실제 MeatItem 에 속한 것이 아니더라도 항상 동일한 첫 번째 입력 요소가 선택됩니다.
							2. 스크린리더는 레이블 + 입력을 올바르게 연결할 수 없습니다(모든 레이블이 동일한 입력을 가리키기 때문에)
							해결법: props.id 를 추가해 ID prop 을 MenuItemForm 에 받는것이고 이걸 사용해서 <Input> 당 고유 id 생성*/
							type: 'number',
							min: '1',
							max: '5',
							step: '1',
							defaultValue: '1',
						}}
				/>
				<button>+ 추가</button>
				{!amountIsValid && <p>유효한 수량(1~5)를 입력해주세요.</p>}
			</form>
	)
}
export default MenuItemForm;