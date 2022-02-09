import { render } from "react-dom"
import { StrictMode, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SearchParams from "./SearchParams"
import Details from "./Details"
import ThemeContext from "./ThemeContext"

// const Pet = (props) => {
// 	return React.createElement('div', {}, [
// 		React.createElement('h1', {}, props.name),
// 		React.createElement('h2', {}, props.animal),
// 		React.createElement('h2', {}, props.breed),
// 	])
// }

// const App = () => {
// 	return React.createElement('div', {}, [
// 		React.createElement('h1', {}, 'Adopt Me!'),
// 		React.createElement(Pet, {
// 			name: 'Luna',
// 			animal: 'Dog',
// 			breed: 'Havanese',
// 		}),
// 		React.createElement(Pet, {
// 			name: 'Mickey',
// 			animal: 'Dog',
// 			breed: 'Maltese',
// 		}),
// 		React.createElement(Pet, {
// 			name: 'Rufus',
// 			animal: 'bird',
// 			breed: 'Cockatiel',
// 		}),
// 	])
// }

const App = () => {
	const [theme, setTheme] = useState("darkblue")

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			<BrowserRouter>
				<div>
					<header>
						<Link to="/">
							<h1>Adopt Me!</h1>
						</Link>
					</header>
					<Routes>
						<Route path="/details/:id" element={<Details />} />
						<Route path="/" element={<SearchParams />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ThemeContext.Provider>
	)
}

// render(React.createElement(App), document.getElementById('root'))
render(<App />, document.getElementById("root"))
