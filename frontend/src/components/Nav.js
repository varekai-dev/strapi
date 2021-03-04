import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
	return (
		<div className="Nav">
			<h3> Nav</h3>
			<div className="Nav__Links">
				<NavLink to="/" exact>
					Home
				</NavLink>
				<NavLink to="/create" exact>
					Create
				</NavLink>
			</div>
		</div>
	)
}

export default Nav
