import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


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

// api
const API_URL = 'https://pixabay.com/api';
const API_KEY = '25854357-73cc9e97f6c573caedd14922c';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';
const per_page = 40;
const BASE_URL = `${API_URL}/?key=${API_KEY}&per_page=${per_page}&${options}`;


async function fetchImage(dataInput) {
    try {
        const response = await axios.get(`${BASE_URL}&page=${page}&q=${dataInput}`);
        console.log(response);
        return await response.data;
    } catch (error) {
        console.log(error);
    }
}

// events
function onFormSubmit(e) {
    e.preventDefault();

    gallery.innerHTML = '';
    loadBtn.hidden = true;

    if (dataInput !== '') {
        fetchImage(dataInput).then(makeGallery).catch(noResults).finally(() => form.reset());
    }
  page = 1;
}

function onFormInput(e) {
  dataInput = e.target.value.trim();
}

function onLoadClick() {
    page += 1;
    fetchImage(dataInput, page).then(makeGallery).catch(noResults);
    pageScroll();   
}


// image card
function makeGallery(images) {
    if (images.totalHits === 0) {
        noResults();
    } else {
        renderImageCard(images);
        loadBtn.hidden = false;
    }

    if (images.hits.length < per_page && images.totalHits !== 0) {
        finishGallery();
        loadBtn.hidden = true;
    }

    if (page === 1 && images.totalHits !== 0) {
        allResults(images);
    }
}


function renderImageCard(images) {
  const markup = images.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
            <div class="photo-card">
                <a class="gallery__link" href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            <span>${likes}</span>
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            <span>${views}</span>
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            <span>${comments}</span>
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            <span>${downloads}</span>
                        </p>
                    </div>
                
            </div>`;
    })
    .join("");
    
    gallery.innerHTML = markup;

    let lightbox = new SimpleLightbox('.gallery a');
    lightbox.on('show.simplelightbox', function () {});
    lightbox.refresh();
}

// scroll
function pageScroll() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
});
}


// console
function noResults() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}


function finishGallery() {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

function allResults(images) {
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
}

// export default class феч {
//     constructor() {
//         this.запрос = ``;
//         this.page = 1;
//         this.perp_age = 40;
//         this.totalHits = 1;
//     }
    
//     async getPhotos() {
//         const url = `${URL}?key=${API_KEY}&q=${this.запрос}&${OPTIONS}&page=${this.page}&per_page=${this.per_page}`;
//         try {
//             const response = await axios.get(url); this.page += 1;
//             return await response.data.hits;
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }
    
//     pageReset() {
//         this.page = 1;
//     }
//     getзапрос() {
//         return this.request;
//     }
//     setзапрос(новый запрос) {
//         this.request = newReply;
//     }
// }