import React, {Fragment} from 'react';
import classes from './MenuItem.module.css'

const MenuItem = (props) => {
		const price = `${props.price} 원`;
	return (
			<li className={classes.meal}>
				<div>
					<h3>{props.name}</h3>
					<div className={classes.description}>{props.description}</div>
					<div className={classes.price}>{price}</div>
				</div>
				<div>

				</div>
			</li>
	)
}

export default MenuItem ;