const API = 'https://api.openweathermap.org/';
const input = document.querySelector('input');
const btn = document.querySelector('button')


function kToC(temp) {
    return Math.floor(temp - 273.15)
}

const api = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json:charset=utf-8'
    },
    params: {
        'appid': '21d807407fc08f0dca752a98c2c9b2d1',
        "lang": 'sp'
    }
})


btn.addEventListener('click', async function getWather() {
    let valor;
    valor = input.value;
    const { data } = await api(`data/2.5/weather?q=${valor}`)
    const ic = data.weather[0].icon
    const src = `https://openweathermap.org/img/wn/${ic}@2x.png`
    const img = document.createElement('img');
    img.src = src;
    document.body.appendChild(img);
    console.log(src);
    console.log(kToC(data.main.temp));
    console.log(data.weather[0].description);
})
