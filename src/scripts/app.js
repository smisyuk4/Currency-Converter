const refs = {
    currencyList: document.querySelector('.currency-list'),
    currencyForm: document.querySelector('.currency-form'),
    inputFromValue: document.querySelector('[name="fromQuantity"]'),
    inputToValue: document.querySelector('[name="toQuantity"]'),
    selectFromValue: document.querySelector('[name="fromNameMoney"]'),
    selectToValue: document.querySelector('[name="toNameMoney"]'),
    convertBtn: document.querySelectorAll('.currency-form button')[0],
    resetBtn: document.querySelectorAll('.currency-form button')[1],
}

let money = {}

const UAH = {    
    cc: "UAH",
    exchangedate: "21.11.2022",
    r030: 980,
    rate: 1,
    txt: "Гривня"
}

console.log(UAH)

refs.currencyForm.addEventListener('change', onInputValue)
refs.currencyForm.addEventListener('submit', onClickBtnConvert)
refs.resetBtn.addEventListener('click', onClickBtnReset)

refs.inputFromValue.addEventListener('blur', onInputLostFocus)

drawCurrency()

function onClickBtnConvert(event) {
    event.preventDefault()
    console.log(money)
    let { fromQuantity, fromNameMoney, toQuantity, toNameMoney } = money

    fetchCurrency()
    .then(data => {
        console.log(data)

        data = [...data, UAH]
        
        const fromMoney = data.find(country => country.cc === fromNameMoney)
        console.log(fromMoney)

        const toMoney = data.find(country => country.cc === toNameMoney)
        console.log(toMoney)
        

        if (fromQuantity) {
            toQuantity = Number(fromQuantity) * fromMoney.rate / toMoney.rate
            console.log(toQuantity)
            refs.inputToValue.value = toQuantity
            return
        }

        if (toQuantity) {
            fromQuantity = Number(toQuantity) * toMoney.rate / fromMoney.rate
            console.log(fromQuantity)
            refs.inputFromValue.value = fromQuantity
        }
            

        })
    .catch(error => {
        console.log(error)
    })
}

function onInputValue(event) {
    const formData = new FormData(refs.currencyForm)

    formData.forEach((value, key) => {
        money[key] = value

        if (key === 'fromQuantity' && value !== '') {
            refs.inputToValue.setAttribute('disabled', true)
            // console.log(key + 'iside from' + value)
        }

        if (key === 'toQuantity' && value !== '') {
            refs.inputFromValue.setAttribute('disabled', true)
            // console.log(key + 'iside to' + value)
        }
    })
}

function onInputLostFocus(event) {
    event.target.classList.add('invalid')
    // console.log()
}

function onClickBtnReset() {
    refs.inputToValue.removeAttribute('disabled')
    refs.inputFromValue.removeAttribute('disabled')
}

function drawCurrency() {
    fetchCurrency()
        .then(data => {
            // console.log(data)

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

            // console.log(money)

            const markupCurrencyToday = currencyToday(USD, EUR)
            refs.currencyList.insertAdjacentHTML('beforeend', markupCurrencyToday)

            const markupSelect = money.map(item => {
                return addOptionToSelect(item.cc, item.txt)
            }).join('')

            //add options to form
            refs.selectFromValue.insertAdjacentHTML('beforeend', markupSelect)
            refs.selectToValue.insertAdjacentHTML('beforeend', markupSelect)
        })
    .catch(error => {
        console.log(error)
        const msg = '<li>Sorry not data from server</li>'
        refs.currencyList.insertAdjacentHTML('beforeend', msg)
    })
}

function fetchCurrency() {
    const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

    return fetch(URL).then((response) =>{
        if(!response.ok){
            throw new Error(response.status);
        }
        return response.json();
    }).catch(function (error) {
        // Notify.failure('Oops, there is no country with that name');
        console.log(error);
    });
}

function currencyToday(USD, EUR) {
    return `<li class="currency-item">
                <b>1 USD = </b>${USD} UAH
            </li>
            <li class="currency-item">
                <b>1 EUR = </b>${EUR} UAH
            </li>`
}

function addOptionToSelect(nameMoney, desc) {
    return `<option value=${nameMoney}>${nameMoney} - ${desc}</option> `
}