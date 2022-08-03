import React, {Fragment} from 'react';
import classes from './MenuSummary.Module.css'

const MenuSummary = () => {
	return (
			<section className={classes.summary}>
				<h1>맛있는 음식을 배달해 드립니다.</h1>
				<p>
					제공되는 다양한 식사 중에서 가장 좋아하는 식사를 선택하고 집에서 맛있는 점심 또는 저녁 식사를 즐기십시오.
				</p>
				<p>
					우리의 모든 식사는 고품질 재료로 제 시간에 그리고 물론 경험 많은 셰프에 의해 조리됩니다!
				</p>
			</section>
	)
}

export default MenuSummary ;
