const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');
let imageArray = [];
let count = 5;
const key = '';
let url = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;
loader.hidden = false;

let isLoaded = false;
let totalIamge = 0;
let imagesLoaded = 0;

function imageLoaded() {
    imagesLoaded++
    if (totalIamge === imagesLoaded) {
        isloaded = true;
        count = 30;
        url = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;
    }
}

async function getImages() {
    const res = await fetch(url);
    imageArray = await res.json();
    paintImage();
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function paintImage() {
    imagesLoaded = 0;
    totalIamge = imageArray.length;
    imageArray.forEach(item => {
        const link = document.createElement('a');
        setAttributes(link, {
            'href': item.links.html,
            'target': '_blank'
        })

        const img = document.createElement('img')
        setAttributes(img, {
            'src': item.urls.regular,
            'alt': item.id
        })
        img.addEventListener('load', imageLoaded)


        link.appendChild(img);
        imageContainer.appendChild(link)
        loader.hidden = true;
    })
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.clientHeight - 1000 && isloaded) {
        getImages();
    }
})

getImages();