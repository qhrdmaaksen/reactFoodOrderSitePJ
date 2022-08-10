import React from 'react';
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
			return (
					<div className={classes.input}>
						<label htmlFor={props.input.id}>{props.label}</label>
						{/*{...props.input}
				전개 연산자 인풋을 고도로 구성 가능하게 만듦
				인풋에서 받을 수도 있는 다른 모든 구성 데이터를 이 인풋 요소에 프롭으로 전달
					만약 id : 'amount',
							type : 'number',
							min : '1',
							max : '5',
							step : '1',
							이런 속성이있다면 자동으로 속성을 받아 작동함
				*/}
						<input ref={ref} {...props.input} />
					</div>
			)
		}
)
export default Input;