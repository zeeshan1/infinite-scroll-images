const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container')
let imagesArray = [];
const YOUR_ACCESS_KEY = ''
const url = `https://api.unsplash.com/photos/?client_id=${YOUR_ACCESS_KEY}`;
loader.hidden = false;



async function getimages() {
    const response = await fetch(url);
    const content = await response.json();
    imagesArray = [...imagesArray, ...content]
    paintImage();
}

function paintImage() {
    let ele = ''
    let img = ''
    imagesArray.forEach((item) => {
        ele = document.createElement('a');
        img = document.createElement('img');
        ele.setAttribute('href', item.links.html);
        img.setAttribute('src', item.urls.regular);
        img.setAttribute('alt', item.id);
        ele.appendChild(img);
        imageContainer.appendChild(ele);
    })
    loader.hidden = true;
}

document.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.clientHeight - 1000) {
        console.log(imagesArray)

        getimages();
    }

})

getimages();