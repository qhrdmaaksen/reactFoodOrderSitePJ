import React, {useState, useEffect} from 'react';
import classes from './AvailableMenu.module.css'
import Card from '../UI/Card'
import MenuItem from './MenuItem/MenuItem'

const Available = () => {
	const [meals, setMeals] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [httpError, setHttpError] = useState()

	useEffect(() => {
		/*비동기 태스크로 컴포넌트가 처음으로 로딩된 후에만 시작*/
		const fetchMeals = async () => {
			const response = await fetch('https://react-http-d5583-default-rtdb.firebaseio.com/meal.json')/*firebase 이용시 .json 을 잊지말자*/
			if (!response.ok) {
				throw new Error('주문 가능 목록을 불러오는데 실패하였습니다.')
			}
			const responseData = await response.json() /*promise 를 반환하기 때문에 여기서 await 키워드도 갖게 됨*/
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key, /*key 는 가져오는 개별 meal 의 id 가 됨*/
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price
				})
			}
			/*for 반복문 후에 loadedMeals 상수를 변형된 데이터로 채웠다면 setMeals 를 호출하게되며, state 업데이트 함수를 호출하고 loadedMeals 에 입력*/
			setMeals(loadedMeals)
			setIsLoading(false)
		}
		/*-async 함수에서는 항상 promise 를 반환하며 promise 대신 오류를 가져오는 경우 그 오류로 인해 해당 promise 가 거부하게되기에 따라서 try/catch 를
사용해서 그것을 래핑 할 수 없음 단, await 를 적용하여 useEffect 함수를 async 함수로 전환하면 가능하지만 effect 함수 내에서 promise 를 반환해야
해서 사용할수 없을땐 catch() 메소드를 사용하여 promise 를 반환하게할수있음*/
		fetchMeals().catch((error)=>{
			setIsLoading(false)
			setHttpError(error.message)
		})
	}, []) /*의존성 없이 빈 배열로 두었기에 위 로직은 첫 로딩시에만 실행되며 불변하게됨*/

	if (isLoading) {
		return (
				<section className={classes.mealsLoading}>
					<p>주문 가능한 메뉴 불러오는중 ...</p>
				</section>
		)
	}

	if (httpError){
		return (
				<section className={classes.mealsError}>
					<p>불러오기 실패 오류명 : {httpError}</p>
				</section>
		)
	}

	const menuList = meals.map((menu) =>

			/*prop 전달*/
			<MenuItem
					id={menu.id} /*id 가 props 의 형태로 MealItem 에 전달되야함, 따라서 AvailableMeals  구성 요소 내부에서 id={menu.id} 을 생성해야함*/
					key={menu.id}
					name={menu.name}
					description={menu.description}
					price={menu.price}
			/>)

	return (
			<section className={classes.meals}>
				<Card>
					<ul>
						{menuList}
					</ul>
				</Card>
			</section>
	)
}

export default Available;