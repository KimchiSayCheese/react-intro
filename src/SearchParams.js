import { useState, useEffect, useContext } from "react"
import ThemeContext from "./ThemeContext"
import useBreedList from "./useBreedList"
import Results from "./Results"

import DropDown from "./DropDown"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]
// const localCache = {}

const SearchParams = () => {
	const [location, setLocation] = useState("Seattle, WA")
	const [animal, setAnimal] = useState("")
	const [breed, setBreed] = useState("")
	const [pets, setPets] = useState([])
	const [breeds] = useBreedList(animal)
	const [theme, setTheme] = useContext(ThemeContext)

	// const [status, setStatus] = useState("unloaded")
	// const [breedList, setBreedList] = useState([])

	// useEffect(() => {
	// 	const reqBreedList = async (animal) => {
	// 		setStatus("loading")
	// 		setBreedList([])
	// 		const res = await fetch(
	// 			`https://pets-v2.dev-apis.com/breeds?animal=${animal}`
	// 		)

	// 		const json = await res.json()
	// 		localCache[animal] = json.breeds || []

	// 		setBreedList(localCache[animal])
	// 		setStatus("loaded")
	// 	}

	// 	reqBreedList(animal)
	// }, [animal])

	useEffect(() => {
		requestPets()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		//console.log(animal, location, breed)
		const res = await fetch(
			`https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		)

		const json = await res.json()

		//console.log(json)
		setPets(json.pets)
	}

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault()
					requestPets()
				}}
			>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder="Location"
					/>
				</label>
				{/* <label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						onChange={(e) => setAnimal(e.target.value)}
						onBlur={(e) => setAnimal(e.target.value)}
					>
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal}>{animal}</option>
						))}
					</select>
				</label>  */}
				<DropDown
					items={ANIMALS}
					item={animal}
					setItem={setAnimal}
					name={"Animal"}
				/>
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
						onBlur={(e) => setBreed(e.target.value)}
					>
						<option></option>
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>
				<label htmlFor="theme">
					Theme
					<select
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}
					>
						<option value="darkblue">Dark Blue</option>
						<option value="peru">Peru</option>
						<option value="chartreuse">Chartreuse</option>
						<option value="mediumorchid">Medium Orchid</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>

			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
