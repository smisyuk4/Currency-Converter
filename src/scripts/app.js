import { refs } from './refs';
import { translate } from './translate'
import fetchCurrency from './fetchCurrency';
import './color-theme'

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const debounce = require('lodash.debounce'); 
const DELAY = 300

const UAH = {    
    cc: "UAH",
    exchangedate: "21.11.2022",
    r030: 980,
    rate: 1,
    txt: "Гривня"
}

refs.inputFromValue.addEventListener('input', debounce(checkInputValues, DELAY))
refs.inputToValue.addEventListener('input', debounce(checkInputValues, DELAY))
refs.currencyForm.addEventListener('submit', onClickBtnConvert)
refs.resetBtn.addEventListener('click', onClickBtnReset)

drawCurrency()

function onClickBtnConvert(event) {
    event.preventDefault()
    checkInputValues()

    const money = {}
    const formData = new FormData(refs.currencyForm)
    formData.forEach((value, key) => {
        money[key] = value
    })

    let { fromQuantity, fromNameMoney, toQuantity, toNameMoney } = money

    fetchCurrency()
    .then(data => {
        data = [...data, UAH]
        
        const fromMoney = data.find(country => country.cc === fromNameMoney)
        const toMoney = data.find(country => country.cc === toNameMoney)

        if (fromQuantity) {
            toQuantity = Number(fromQuantity) * fromMoney.rate / toMoney.rate
            refs.inputToValue.value = toQuantity
            return
        }

        if (toQuantity) {
            fromQuantity = Number(toQuantity) * toMoney.rate / fromMoney.rate
            refs.inputFromValue.value = fromQuantity
        }            

        })
    .catch(error => {
        console.log(error)
    })
}

function checkInputValues(event) {
    const isEmptyInputFrom = refs.inputFromValue.value === ''
    const isEmptyInputTo = refs.inputToValue.value === ''

    const isRedInputFrom = refs.inputFromValue.hasAttribute('data')
    const isRedInputTo = refs.inputToValue.hasAttribute('data')

    if (isEmptyInputFrom && isEmptyInputTo) {
        refs.inputFromValue.setAttribute('data', 'empty')
        refs.inputToValue.setAttribute('data', 'empty')
        Notify.failure('from/to values empty')
        return
    }

    if (!isEmptyInputFrom && isRedInputFrom ||
        !isEmptyInputTo && isRedInputTo) {
        refs.inputFromValue.removeAttribute('data')
        refs.inputToValue.removeAttribute('data')
    }

    if (!isEmptyInputFrom) {
        refs.inputToValue.setAttribute('disabled', true)
    }

    if (!isEmptyInputTo) {
        refs.inputFromValue.setAttribute('disabled', true)
    }
}

function onClickBtnReset() {
    refs.inputToValue.removeAttribute('disabled')
    refs.inputFromValue.removeAttribute('disabled')

    refs.inputFromValue.removeAttribute('data')
    refs.inputToValue.removeAttribute('data')
}

function drawCurrency() {
    fetchCurrency()
        .then(data => {
            data = [...data, UAH]
            let USD, EUR

            const money = data.map(name => {
                if (name.cc === 'USD') {
                    USD = name.rate
                }

                if (name.cc === 'EUR') {
                    EUR = name.rate
                }        
                return name
            })
            currencyToday(USD, EUR)
            addOptionToSelect(money)
        })
    .catch(error => {
        console.log(error)
        const msg = '<li>Sorry not data from server</li>'
        refs.currencyList.insertAdjacentHTML('beforeend', msg)
    })
}

function currencyToday(USD, EUR) {
    const markup = `<li class="currency-item">
                <b>1 USD = </b>${USD} UAH
            </li>
            <li class="currency-item">
                <b>1 EUR = </b>${EUR} UAH
            </li>`

    refs.currencyList.insertAdjacentHTML('beforeend', markup)
}

function addOptionToSelect(money) {    
    const markupSelect = money.map(item => {
        return `<option value=${item.cc}>${item.cc} - ${item.txt}</option> `
    }).join('')

    refs.selectFromValue.insertAdjacentHTML('beforeend', markupSelect)
    refs.selectToValue.insertAdjacentHTML('beforeend', markupSelect)
}

// ********* translate site
const allLang = ['ua', 'eng', 'fr']

refs.selectLang.addEventListener('change', onClickSelectLang)

function onClickSelectLang() {
    const lang = refs.selectLang.value
    console.log(lang)

    location.href = `${window.location.pathname}#${lang}`
    console.log(location.href)

    // location.reload()

    let hash = location.hash
    hash = hash.substring(1)
    console.log(hash)
    console.log(refs.title.textContent)

    for (let nameClass in translate) {
        const element = document.querySelector(`.${nameClass}`)
            
        if (element) {
            element.innerHTML = translate[nameClass][hash]
        }
        // console.log(translate.contain(nameClass))
        // if (element === undefined) {

        //     element.innerHTML = translate[nameClass]['ua']
        // }
    }
}

