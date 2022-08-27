import { refs } from './refs';
import PhotosApiService from './photo-service';
import makeMarkupOfPhotoCards from './make-markup';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const photosApiService = new PhotosApiService();
let lightbox = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(evt) {
    evt.preventDefault();

    clearGalleryContainer();

    addClass(refs.loadMoreBtn, 'is-hidden');

    photosApiService.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    
    if (photosApiService.searchQuery === '') {
        return Notiflix.Notify.warning('Enter your request please.');
    }

    photosApiService.resetPage();
    photosApiService.getPhotos().then(photoItems => {
        Notiflix.Notify.success(`Hooray! We found ${photoItems.totalHits} images.`);
        renderCardsMarkup(photoItems.hits);

        removeClass(refs.loadMoreBtn, 'is-hidden');

        lightbox.refresh();
    });  
}

function onLoadMoreBtnClick() {
    photosApiService.getPhotos().then(photoItems => {
        renderCardsMarkup(photoItems.hits);

        lightbox.refresh();
    });
}

function renderCardsMarkup(photoItems) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', makeMarkupOfPhotoCards(photoItems));
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}

function removeClass(ref, className) {
    ref.classList.remove(className);
}

function addClass(ref, className) {
    ref.classList.add(className);
}


