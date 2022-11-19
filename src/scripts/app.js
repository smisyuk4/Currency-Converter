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

refs.currencyForm.addEventListener('change', onInputValue)
refs.currencyForm.addEventListener('submit', onClickBtnConvert)
refs.resetBtn.addEventListener('click', onClickBtnReset)

drawCurrency()

function onClickBtnConvert(event) {
    event.preventDefault()
    console.log(money)
    let { fromQuantity, fromNameMoney, toQuantity, toNameMoney } = money
    let from, to

    fetchCurrency()
    .then(data => {
            console.log(data)
            

            data.map(name => {
                const { cc, txt, rate } = name

                if (fromNameMoney === 'UAH') {
                    from = 1
                } 
                
                if (cc === fromNameMoney) {
                    from = rate
                }    
                
                if (cc === toNameMoney) {
                    to = rate
                }   
            })
        
        console.log(from)
        console.log(to)

        if (fromQuantity && fromNameMoney && toNameMoney) {
            toQuantity = Number(fromQuantity) / to
            console.log(toQuantity)
            refs.inputToValue.value = toQuantity
            // refs.inputToValue.removeAttribute('disabled')
            return
        }

        if (toQuantity) {
            fromQuantity = toQuantity * index
            refs.inputFromValue.value = fromQuantity
            // refs.inputFromValue.removeAttribute('disabled')
            return
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
            console.log(key + 'iside from')
        }

        if (key === 'toQuantity' && value !== '') {
            refs.inputFromValue.setAttribute('disabled', true)
            console.log(key + 'iside to')
        }
    })
}

function onClickBtnReset() {
    refs.inputToValue.removeAttribute('disabled')
    refs.inputFromValue.removeAttribute('disabled')
}

function drawCurrency() {
    fetchCurrency()
        .then(data => {
            console.log(data)
            let USD, EUR

            const money = data.map(name => {
                if (name.cc === 'USD' && name.txt === 'Долар США') {
                    USD = name.rate
                }

                if (name.cc === 'EUR' && name.txt === 'Євро') {
                    EUR = name.rate
                }        
                return name
            })

            console.log(money)

            const markupCurrencyToday = currencyToday(USD, EUR)
            refs.currencyList.insertAdjacentHTML('beforeend', markupCurrencyToday)

            const markupSelect = money.map(item => {
                return addOptionToSelect(item.cc, item.txt)
            }).join('')

            refs.selectToValue.insertAdjacentHTML('beforeend', markupSelect)
        })
    .catch(error => {
        console.log(error)
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