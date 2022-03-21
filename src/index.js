import Notiflix from 'notiflix';
import axios from 'axios';

// refs
const form = document.querySelector('#search-form');
const input = document.querySelector('[name=searchQuery]');
const button = document.querySelector('[type=submit]');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

// events
form.addEventListener('submit', onFormSubmit);
input.addEventListener('input', onFormInput);
loadBtn.addEventListener('click', onLoadClick);
loadBtn.hidden = true;

let dataInput = '';
let page = 1;
let timerId = null;

// api
const API_URL = 'https://pixabay.com/api';
const API_KEY = '25854357-73cc9e97f6c573caedd14922c';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';
const per_page = 40;
const BASE_URL = `${API_URL}/?key=${API_KEY}&per-page=${per_page}&${options}`;


async function fetchImage(input, page) {
    try {
        const response = await axios.get(`${BASE_URL}&page=${page}&q=${input}`);
        return await response.json();
        console.log(response.json());
    } catch (error) {
        console.log(error.message);
    }
}


// events
function onFormSubmit(e) {
    e.preventDefault();

    loadBtn.hidden = true;
    gallery.innerHTML = '';

    if (dataInput !== '') {
        fetchImage(dataInput).then(renderImageCard).catch(noResults).finally(() => form.reset());
  }
  page = 1;
}

function onFormInput(e) {
  dataInput = e.target.value();
}

function onLoadClick() {
    page += 1;
    // ????
}


// image card
function renderImageCard(images) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `
            <div class="photo-card">
                <a class="gallery__link" href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes ${likes}</b>
                        </p>
                        <p class="info-item">
                            <b>Views ${views}</b>
                        </p>
                        <p class="info-item">
                            <b>Comments ${comments}</b>
                        </p>
                        <p class="info-item">
                            <b>Downloads ${downloads}</b>
                        </p>
                    </div>
                </a>
            </div>`;
    })
    .join("");
    
    gallery.innerHTML = markup;
}



// console
function noResults() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

