const form = document.querySelector(".currinfo__form")
const blockCurrentInfo = document.querySelector(".currinfo__status")
const editor = document.querySelector(".currinfo__editor")
const inputStatus = document.querySelector(".currinfo__input")
const currentStatus = document.querySelector(".currinfo__status-span")

class App {
	#currentInfo = "изменить статус"
	#isOpenPopup = false

	constructor() {
		this._getLocalStorage()

		form.addEventListener("submit", this._newStatus.bind(this))
		inputStatus.addEventListener("change", this._addCurrentInfo.bind(this))
		blockCurrentInfo.addEventListener("click", this._moveToPopup.bind(this))
	}

	_moveToPopup(e) {
		e.stopPropagation()
		if (this.#isOpenPopup) {
			this._removeStylePopup()
			return
		}

		this._addStylePopup()
		this._addValue(this.#currentInfo)
	}

	_addCurrentInfo(e) {
		e.stopPropagation()

		this.#currentInfo = e.target.value
		this._addValue(e.target.value)
	}

	_addValue(v) {
		inputStatus.value = v
	}

	_addStylePopup() {
		this.#isOpenPopup = true
		editor.style.block = "block"
		editor.style.opacity = 1
	}

	_newStatus(e) {
		e.preventDefault()

		this._setLocalStorage()
		this._removeStylePopup()
		this._renderInput(this.#currentInfo)
	}

	_removeStylePopup() {
		this.#isOpenPopup = false
		editor.style.block = "none"
		editor.style.opacity = 0
	}
	_setLocalStorage() {
		localStorage.setItem("aboutInfo", JSON.stringify(this.#currentInfo))
	}

	_renderInput(v) {
		currentStatus.innerHTML = v
	}

	_getLocalStorage() {
		const data = JSON.parse(localStorage.getItem("aboutInfo"))

		if (!data) {
			this._renderInput(this.#currentInfo)
			return
		}

		this.#currentInfo = data

		this._renderInput(this.#currentInfo)
	}

	reset() {
		localStorage.removeItem("aboutInfo")
	}
}

const app = new App()