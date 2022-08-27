import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const myKey = '29439208-f38af98baaba958e5883525eb';
const otherQueryCriteria = 'image_type=photo&orientation=horizontal&safesearch=true';
const itemsPerPage = 40;

export default class PhotosApiService {
    constructor() {
        this.searchWord = '';
        this.page = 1;
     }
    
    async getPhotos() { 
        try {
            const response = await axios.get(`${BASE_URL}?key=${myKey}&q=${this.searchWord}&${otherQueryCriteria}&page=${this.page}&per_page=${itemsPerPage}`);
            const photoItems = await response.data;

            if (photoItems.hits.length > 0) {
                this.page += 1;

                return photoItems;
            } else {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
        }
        catch(error) {
           console.log(error);
        };
    }

    resetPage() {
        this.page = 1;
    }

    get searchQuery() {
    return this.searchWord;
    }
    
    set searchQuery(newWord) {
    this.searchWord = newWord;
    }
}

