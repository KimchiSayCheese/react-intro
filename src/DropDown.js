const DropDown = ({ items, item, setItem, name }) => {
	return (
		<label htmlFor={name.toLowerCase()}>
			{name}
			<select
				id={name.toLowerCase()}
				value={item}
				onChange={(e) => {
					setItem(e.target.value)
				}}
				onBlur={(e) => {
					setItem(e.target.value)
				}}
			>
				<option />
				{items.map((x) => (
					<option key={x}>{x}</option>
				))}
			</select>
		</label>
	)
}

export default DropDown
