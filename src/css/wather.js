const API = 'https://api.openweathermap.org/';
const input = document.querySelector('input');
const btn = document.querySelector('button')
const main = document.querySelector('#main');

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

let cont = 0;
const arr = [];
btn.addEventListener('click', async () => {
    let valor;

    let bg = 'bg-sky-300';

    valor = input.value;

    const { data } = await api(`data/2.5/weather?q=${valor}`).catch(function (error) {
        if (error.response) {
            input.value = ''
            input.placeholder = 'Ubicación no válida';
            input.className = 'bg-red-500 border border-red-400 w-72 h-12 px-4 rounded-l-lg text-red-700 placeholder:text-red-600 focus:outline-none focus:border-2 focus:border-green-400 focus:bg-sky-100 focus:text-sky-950 sm:text-lg';
        }
    })

    input.className = 'bg-sky-200 w-72 h-12 px-4 rounded-l-lg text-sky-950 placeholder:text-sky-600 focus:outline-none focus:border-2 focus:border-green-400 focus:bg-sky-100 focus:text-sky-950 sm:text-lg';
    const ic = data.weather[0].icon
    const src = `https://openweathermap.org/img/wn/${ic}@2x.png`
    cont++;
    arr.length % 2 === 0 ? bg = 'bg-sky-300' : bg = 'bg-green-400';
    console.log(cont);
    const article = `
         <article id="${data.id}" class="${bg} rounded-lg w-36 h-56  sm:w-48 sm:h-56">
                <div class="mx-3 py-2 flex flex-col items-center text-sky-950">
                    <div class=" w-full font-semibold flex justify-between items-center">
                        <h1>
                            ${data.name}
                        </h1>
                        <svg  width="13" height="13" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.0721 0.355072C10.0721 0.239056 9.97714 0.144135 9.86112 0.144135L8.12089 0.152045L5.49999 3.27656L2.88173 0.154682L1.13886 0.146771C1.02284 0.146771 0.927917 0.239057 0.927917 0.357709C0.927917 0.407807 0.946374 0.455268 0.978015 0.494819L4.40839 4.58173L0.978015 8.66601C0.946154 8.70466 0.928475 8.75304 0.927917 8.80312C0.927917 8.91914 1.02284 9.01406 1.13886 9.01406L2.88173 9.00615L5.49999 5.88164L8.11825 9.00351L9.85849 9.01142C9.9745 9.01142 10.0694 8.91914 10.0694 8.80048C10.0694 8.75039 10.051 8.70293 10.0193 8.66337L6.59423 4.5791L10.0246 0.492182C10.0562 0.455268 10.0721 0.40517 10.0721 0.355072Z"
                                class="fill-sky-950 hover:fill-sky-600  cursor-pointer" onclick="cerrar(${data.id})"></path>
                        </svg>

                    </div>
                    <div class="flex">
                        <p class="text-7xl font-bold tracking-tighter">
                            ${kToC(data.main.temp)}°
                        </p>
                        <span class="text-6xl font-semibold self-end">C</span>
                    </div>
                    <img class="w-26 -my-2" src="${src}" alt="">
                    <p class="font-normal">${data.weather[0].description}</p>
                </div>
            </article>
    `
    main.innerHTML += article;
    arr.push(data.id)
    console.log(arr);


})
function cerrar(id) {
    const card = document.getElementById(id);
    main.removeChild(card);

}
