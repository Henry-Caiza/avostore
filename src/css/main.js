const url = "https://platzi-avo.vercel.app/api/avo";
const appNode = document.querySelector('#app');
const modal = document.querySelector('#modal');


const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price)
    return newPrice;
}


async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    const data = json.data;
    //console.log(json);
    appNode.innerHTML = ""
    const allElements = [];
    data.forEach(element => {
        const img = document.createElement('img');
        img.src = `https://platzi-avo.vercel.app/${element.image}`;
        img.className = 'rounded-t-xl cursor-pointer'

        const title = document.createElement('h2');
        title.textContent = element.name;
        title.className = 'text-xs md:text-xl text-green-100 font-semibold'

        const price = document.createElement('div');
        price.textContent = formatPrice(element.price);
        price.className = 'text-xs md:text-md text-green-100'

        const content = document.createElement('div');
        content.appendChild(price);
        content.appendChild(title);
        content.className = 'w-full h-12 bg-gradient-to-r from-green-700 via-green-900 to-green-700 flex justify-around items-center rounded-b-xl cursor-pointer'

        const container = document.createElement('div');
        container.append(img, content);
        container.className = 'w-36 sm:w-60 md:w-80 border-2 border-green-500 rounded-xl transform transition-all hover:-translate-y-2 hover:shadow-2xl'

        container.addEventListener('click', () => {
            modal.innerHTML = ''
            modal.showModal();
            const article = document.createElement('article');
            article.className = 'flex flex-col justify-items-center sm:flex-row items-center gap-2 sm:gap-8'

            const img = document.createElement('img');
            img.src = `https://platzi-avo.vercel.app/${element.image}`;
            img.className = 'rounded-full w-32 h-32 lg:w-64 lg:h-64'

            const info = document.createElement('div');

            const tittle = document.createElement('h2');
            tittle.textContent = element.name;
            tittle.className = 'sm:text-lg lg:text-2xl font-bold text-green-950 mb-2 sm:mb-4'

            const description = document.createElement('p');
            description.textContent = element.attributes.description;
            description.className = 'text-xs sm:text-sm md:text-lg text-green-950 sm:mr-16'
            const btn = document.createElement('button');
            btn.textContent = 'Cerrar';
            btn.className = 'font-bold'

            btn.addEventListener('click', () => {
                modal.close();
            })

            info.appendChild(tittle);
            info.appendChild(description);

            article.appendChild(img);
            article.appendChild(info);

            modal.appendChild(article);
            modal.appendChild(btn);

            //console.log(element.attributes.description);
        })

        allElements.push(container);
        //allElements.push(container);
    });
    appNode.append(...allElements);
}
fetchData();