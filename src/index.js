import './sass/main.scss';
import ImageApiService from './js/apiService';
import cardImagesTpl from './templates/card-images';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { error } = require('@pnotify/core');

const basicLightbox = require('basiclightbox');

const refs = {
  galleryListEl: document.querySelector('.gallery'),
  formEl: document.querySelector('.search-form'),
  btnSearch: document.querySelector('.btn-search'),
  btnMore: document.querySelector('.btn-more'),
  modalCloseEl: document.querySelector('.basicLightbox'),
  body: document.querySelector('body'),
};
refs.btnMore.style.visibility = 'hidden';

const imgApiService = new ImageApiService();

refs.formEl.addEventListener('submit', onSearch);
refs.btnMore.addEventListener('click', onBtnMore, false);
refs.galleryListEl.addEventListener('click', onModal);

function onSearch(e) {
  e.preventDefault();
  clearRequest();
  imgApiService.query = e.currentTarget.elements.query.value;
  if (imgApiService.query === '') {
    return error({
      title: 'Empty',
      text: 'Please, enter information',
    });
  }
  imgApiService.resetPage();
  const df = imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}

function onBtnMore() {
  imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}
function addMarkupHits(hits) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', cardImagesTpl(hits));
  if (hits.length >= 12) {
    refs.btnMore.style.visibility = 'visible';
  }
  omScroll();
}
function clearRequest() {
  refs.galleryListEl.innerHTML = '';
}
function omScroll() {
  if (imgApiService.page > 2) {
    const el = document.querySelector('.btn-more');
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}
function onModal(e) {
  let instance = basicLightbox.create(`<img src=${e.target.getAttribute('data-src')}>`);
  instance.show();
}
