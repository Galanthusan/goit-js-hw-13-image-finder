import galleryApi from './apiService';
import galleryTemplate from '../templates/gallery-item.hbs';
import 'toastr';
import '..//../node_modules/toastr/build/toastr.css';

const refs = {
  searchForm: document.getElementById('search-form'),
  inputResult: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onSearchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', onloadMoreImagesHandler);

function onSearchFormSubmitHandler(event) {
  event.preventDefault();
  clearSearchList();
  const inputValue = event.currentTarget.elements.query.value;

  if (inputValue === '') {
    toastr.info('Please enter a more spicific query!');
    return;
  } else {
    galleryApi.resetPage();
    galleryApi.searchQuery = inputValue;
    galleryApi.fetchImages().then(onGalleryHandlerMarkup);
  }
}

function onGalleryHandlerMarkup(items) {
  const yCoordinateToScroll = document.body.offsetHeight;
  const markup = galleryTemplate(items);
  if (markup === '') {
    toastr.error('No matches found!');
    refs.loadMoreBtn.classList.remove('active-btn');
    return;
  } else {
    toastr.success('We found what you are looking for!');
  }

  refs.inputResult.insertAdjacentHTML('beforeend', markup);
  windowScroll(yCoordinateToScroll);
  refs.loadMoreBtn.classList.add('active-btn');
}

function onloadMoreImagesHandler() {
  galleryApi.fetchImages().then(onGalleryHandlerMarkup);
}

function clearSearchList() {
  refs.inputResult.innerHTML = '';
}

function windowScroll(yCoordinateToScroll) {
  window.scrollTo({
    top: yCoordinateToScroll,
    behavior: 'smooth',
  });
}
