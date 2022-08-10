import React from 'react';
import classes from './AvailableMenu.module.css'
import Card from '../UI/Card'
import MenuItem from './MenuItem/MenuItem'

const DUMMY_MEALS = [
	{
		id: 'm1',
		name: '스시',
		description: '최고급 생선과 채소',
		price: 30000,
	},
	{
		id: 'm2',
		name: '소고기 스테이크',
		description: '독일의 특산품!',
		price: 35000,
	},
	{
		id: 'm3',
		name: '바베큐 버거',
		description: '미국식, 생고기, 고기',
		price: 18000,
	},
	{
		id: 'm4',
		name: '채식식사',
		description: '건강한 채식...',
		price: 24000,
	},
];

const menuList = DUMMY_MEALS.map((menu) =>
		/*prop 전달*/
		<MenuItem
				id={menu.id} /*id 가 props 의 형태로 MealItem 에 전달되야함, 따라서 AvailableMeals  구성 요소 내부에서 id={menu.id} 을 생성해야함*/
				key={menu.id}
				name={menu.name}
				description={menu.description}
				price={menu.price}
		/>)

const Available = () => {
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