import { Component } from "react"
import { useLocation, useParams } from "react-router-dom"
import Carousel from "./Carousel"
import ErrorBoundary from "./ErrorBoundary"
import ThemeContext from "./ThemeContext"
import Modal from "./Modal"

class Details extends Component {
	// constructor() {
	// 	super()

	// 	this.state = { loading: true }
	// }

	state = { loading: true, showModal: false }
	// when react component is rendered for the first time (kinda like useEffect with [])
	async componentDidMount() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?id=${this.props.router.params.id}`
		)
		const json = await res.json()

		this.setState({ loading: false, ...json.pets[0] })
	}

	toggleModal = () => this.setState({ showModal: !this.state.showModal })
	adopt = () => (window.location = `http://bit.ly/pet-adopt`)

	render() {
		if (this.state.loading) {
			return <h2>loading ...</h2>
		}

		const { animal, breed, city, state, description, name, images } =
			this.state

		return (
			<div className="details">
				<Carousel images={images} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
					<ThemeContext.Consumer>
						{([theme]) => (
							<button
								onClick={this.toggleModal}
								style={{ backgroundColor: theme }}
							>
								Adopt {name}
							</button>
						)}
					</ThemeContext.Consumer>

					<p>{description}</p>
					{this.state.showModal ? (
						<Modal>
							<div>
								<h1>Would you like to adopt {name}?</h1>
								<div className="buttons">
									<button onClick={this.adopt}>Yes</button>
									<button onClick={this.toggleModal}>
										No
									</button>
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</div>
		)
	}
}

const withRouter = (Component) => {
	const ComponentWithRouterProp = (props) => {
		let location = useLocation()
		let params = useParams()
		return <Component {...props} router={{ location, params }} />
	}
	return ComponentWithRouterProp
}

const DetailsWithRouter = withRouter(Details)

export default function withErrorBoundary() {
	return (
		<ErrorBoundary>
			<DetailsWithRouter />
		</ErrorBoundary>
	)
}
