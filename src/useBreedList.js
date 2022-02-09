import { useState, useEffect } from "react"

const localCache = {}

export default function useBreedList(animal) {
	const [breedList, setBreedList] = useState([])
	const [status, setStatus] = useState("unloaded")

	useEffect(() => {
		async function requestBreedList() {
			setBreedList([])
			setStatus("loading")

			const res = await fetch(
				`https://pets-v2.dev-apis.com/breeds?animal=${animal}`
			)

			const json = await res.json()
			localCache[animal] = json.breeds || []

			setBreedList(localCache[animal])

			setStatus("loaded")
		}

		if (!animal) {
			setBreedList([])
		} else if (localCache[animal]) {
			setBreedList(localCache[animal])
		} else {
			requestBreedList()
		}
	}, [animal])

	return [breedList, status]
}
