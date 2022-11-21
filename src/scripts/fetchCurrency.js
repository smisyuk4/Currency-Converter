export default function fetchCurrency() {
    const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

    return fetch(URL).then((response) =>{
        if(!response.ok){
            throw new Error(response.status);
        }
        return response.json();
    }).catch(function (error) {
        Notify.failure(error);
        console.log(error);
    });
}