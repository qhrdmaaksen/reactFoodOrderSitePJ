import React, {Fragment} from 'react';
import AvailableMenu from './AvailableMenu'
import MenuSummary from './MenuSummary'

const Menu = () => {
	return (
			<Fragment>
				<MenuSummary/>
				<AvailableMenu/>
			</Fragment>
	)
}

export default Menu;