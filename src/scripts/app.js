const refs = {
    currencyList: document.querySelector('.currency-list'),
    currencyForm: document.querySelector('.currency-form'),
    inputFromValue: document.querySelector('.from-value input'),
    inputToValue: document.querySelector('.to-value input'),
    convertBtn: document.querySelector('.currency-form button'),

}
refs.currencyForm.addEventListener('change', onInputValue)
refs.currencyForm.addEventListener('submit', onClickBtnConvert)

function onClickBtnConvert(event) {
    event.preventDefault()
    console.log(refs.currencyList)
    console.log(refs.inputFromValue)
    console.log(refs.inputToValue)
    console.log(refs.convertBtn)


    // const formData = new FormData(refs.currencyForm)
    // console.log(formData)
}

function onInputValue(event) {
    console.log(event)
    console.log(event.target.value)
}