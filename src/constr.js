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


// api
const API_URL = 'https://pixabay.com/api';
const API_KEY = '25854357-73cc9e97f6c573caedd14922c';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';
const BASE_URL = `${API_URL}/?key=${API_KEY}&${options}`;

export default class феч {
    constructor() {
        this.request = ``;
        this.page = 1;
        this.per_page = 40;
        this.totalHits = 1;
    }

    async getPhotos() {
        const url = `${BASE_URL}&q=${this.request}&page=${this.page}&per_page=${this.per_page}`;
        try {
            const response = await axios.get(url);
            this.page += 1;
            
            return await response.data.hits;
        }
        catch (error) {
            console.log(error)
        }
    }

    pageReset() {
        this.page = 1;
    }
    
    get request() {
        return this.request;
    }
  
    set request(newRequest) {
        this.request = newRequest;
    }
}