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
        title.className = 'text-xl text-green-100 font-semibold'

        const price = document.createElement('div');
        price.textContent = formatPrice(element.price);
        price.className = 'text-md text-green-100'

        const content = document.createElement('div');
        content.appendChild(price);
        content.appendChild(title);
        content.className = 'w-full h-12 bg-gradient-to-r from-green-700 via-green-900 to-green-700 flex justify-around items-center rounded-b-xl cursor-pointer'

        const container = document.createElement('div');
        container.append(img, content);
        container.className = 'w-80 border-2 border-green-500 rounded-xl transform transition-all hover:-translate-y-2 hover:shadow-2xl'

        container.addEventListener('click', () => {
            modal.innerHTML = ''
            modal.showModal();
            const article = document.createElement('article');
            article.className = 'flex items-center gap-8'

            const img = document.createElement('img');
            img.src = `https://platzi-avo.vercel.app/${element.image}`;
            img.className = 'rounded-full'

            const info = document.createElement('div');

            const tittle = document.createElement('h2');
            tittle.textContent = element.name;
            tittle.className = 'text-2xl font-bold text-green-950 mb-4'

            const description = document.createElement('p');
            description.textContent = element.attributes.description;
            description.className = 'text-green-950 mr-16'
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