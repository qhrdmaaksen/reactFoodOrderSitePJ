import React, {useRef, useState} from 'react'
import classes from './Checkout.module.css'

/*입력 값 검증을 위한 helper Fn*/
const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	console.log('checkout comp 호출중')
	const [formInputsValidity, setFormInputsValidity] = useState({
		/*모두 true 로 설정, 처음에 오류 메시지를 표시하고 싶지 않도록,정교한 검증 방식이 없기 때문에 True 를 시작 값으로 적용*/
		name: true,
		street: true,
		city: true,
		postalCode: true,
	})

	/*useRef 를 이용해 사용자 입력 참조*/
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();
	console.log('useRef():::',nameInputRef,streetInputRef,postalCodeInputRef,cityInputRef)


	const confirmHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;

		/*입력이 비어있지 않다면 enteredNameIsValid 에 true 반환*/
		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		console.log('Checkout comp confirmHandler Fn')
		/*입력이 되어있다면 각 초기 객체에 새로 덮어씌움*/
		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid,
		})

		const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

		/*4개의 양식중 하나라도 입력 검증에대한 오류가 발생시 오류 메시지 출력*/
		if (!formIsValid) {
			return console.log('formIsValid 에러 발생');
		}
		/*Cart.js submitOrderHandler 함수가 내부에서 Checkout 컴포넌트로 호출되고 그것이 해당 userData(사용자 데이터)를 받았는지 확인
		* -Cart.js submitOrderHandler 함수의 인자로 보낼 userData 를 객체로 그룹화*/
		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postalCode: enteredPostalCode,
		})
	}

	/*formInputsValidity 가 true 라면 기존 classes.control, false 라면 classes.invalid 로 사용*/
	const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
	const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
	const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
	const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

	return (
			<form className={classes.form} onSubmit={confirmHandler}>
				<div className={nameControlClasses}>
					<label htmlFor='name'>이름</label>
					<input type='text' id='name' ref={nameInputRef}/>
					{!formInputsValidity.name && <p>유효한 이름을 입력해주세요.</p>}
				</div>
				<div className={streetControlClasses}>
					<label htmlFor='street'>도로명 주소</label>
					<input type='text' id='street' ref={streetInputRef}/>
					{!formInputsValidity.street && <p>유효한 도로명 주소를 입력해주세요.</p>}
				</div>
				<div className={postalCodeControlClasses}>
					<label htmlFor='postal'>우편 번호</label>
					<input type='text' id='postal' ref={postalCodeInputRef}/>
					{!formInputsValidity.postalCode && <p>유효한 우편번호 5 자리로 입력해주세요.</p>}
				</div>
				<div className={cityControlClasses}>
					<label htmlFor='city'>도시명</label>
					<input type='text' id='city' ref={cityInputRef}/>
					{!formInputsValidity.city && <p>유효한 도시명을 입력해주세요.</p>}
				</div>
				<div className={classes.actions}>
					<button type='button' onClick={props.onCancel}>
						취소
					</button>
					<button className={classes.submit}>확인</button>
				</div>
			</form>
	);
};
export default Checkout;