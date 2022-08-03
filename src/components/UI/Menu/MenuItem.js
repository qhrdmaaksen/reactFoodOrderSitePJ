import React, {Fragment} from 'react';
import classes from './MenuItem.module.css'
import AvailableMenu from './AvailableMenu'
import MenuSummary from './MenuSummary'

const MenuItem = () => {
	return (
			<Fragment>
				<AvailableMenu />
				<MenuSummary />
			</Fragment>
	)
}

export default MenuItem;