const e={currencyList:document.querySelector(".currency-list"),currencyForm:document.querySelector(".currency-form"),inputFromValue:document.querySelector('[name="fromQuantity"]'),inputToValue:document.querySelector('[name="toQuantity"]'),selectFromValue:document.querySelector('[name="fromNameMoney"]'),selectToValue:document.querySelector('[name="toNameMoney"]'),convertBtn:document.querySelectorAll(".currency-form button")[0],resetBtn:document.querySelectorAll(".currency-form button")[1]};let t={};const n={cc:"UAH",exchangedate:"21.11.2022",r030:980,rate:1,txt:"Гривня"};function o(){return fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json").then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).catch((function(e){console.log(e)}))}console.log(n),e.currencyForm.addEventListener("change",(function(n){new FormData(e.currencyForm).forEach(((n,o)=>{t[o]=n,"fromQuantity"===o&&""!==n&&e.inputToValue.setAttribute("disabled",!0),"toQuantity"===o&&""!==n&&e.inputFromValue.setAttribute("disabled",!0)}))})),e.currencyForm.addEventListener("submit",(function(r){r.preventDefault(),console.log(t);let{fromQuantity:c,fromNameMoney:u,toQuantity:a,toNameMoney:l}=t;o().then((t=>{console.log(t);const o=(t=[...t,n]).find((e=>e.cc===u));console.log(o);const r=t.find((e=>e.cc===l));if(console.log(r),c)return a=Number(c)*o.rate/r.rate,console.log(a),void(e.inputToValue.value=a);a&&(c=Number(a)*r.rate/o.rate,console.log(c),e.inputFromValue.value=c)})).catch((e=>{console.log(e)}))})),e.resetBtn.addEventListener("click",(function(){e.inputToValue.removeAttribute("disabled"),e.inputFromValue.removeAttribute("disabled")})),e.inputFromValue.addEventListener("blur",(function(e){e.target.classList.add("invalid")})),o().then((t=>{let o,r;const c=(t=[...t,n]).map((e=>("USD"===e.cc&&(o=e.rate),"EUR"===e.cc&&(r=e.rate),e))),u=function(e,t){return`<li class="currency-item">\n                <b>1 USD = </b>${e} UAH\n            </li>\n            <li class="currency-item">\n                <b>1 EUR = </b>${t} UAH\n            </li>`}(o,r);e.currencyList.insertAdjacentHTML("beforeend",u);const a=c.map((e=>{return t=e.cc,n=e.txt,`<option value=${t}>${t} - ${n}</option> `;var t,n})).join("");e.selectFromValue.insertAdjacentHTML("beforeend",a),e.selectToValue.insertAdjacentHTML("beforeend",a)})).catch((t=>{console.log(t),e.currencyList.insertAdjacentHTML("beforeend","<li>Sorry not data from server</li>")}));
//# sourceMappingURL=index.759fa967.js.map