import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const ModalRoot = document.getElementById("modal")

const Modal = ({ children }) => {
	const elRef = useRef(null)

	if (!elRef.current) {
		elRef.current = document.createElement("div")
	}

	useEffect(() => {
		ModalRoot.appendChild(elRef.current)
		return () => ModalRoot.removeChild(elRef.current) //prevents mem leak
	}, [])

	return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal
