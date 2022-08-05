import React, {Fragment} from 'react';
import AvailableMenu from './AvailableMenu'
import MealsSummary from './MealsSummary'

const Menu = () => {
	return (
			<Fragment>
				<MealsSummary/>
				<AvailableMenu/>
			</Fragment>
	)
}

export default Menu;