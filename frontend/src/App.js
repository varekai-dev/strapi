import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Create from './pages/Create'
import Nav from './components/Nav'

function App() {
	return (
		<div className="App">
			<h2>App</h2>

			<BrowserRouter>
				<Nav />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/create" exact component={Create} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
