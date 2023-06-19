const btnSelectBread = document.querySelector('.breed-select');
const articleCat = document.querySelector('.cat-info');
const loader = document.querySelector('.backdrop');

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

btnSelectBread.classList.add('is-hidden');
articleCat.classList.add('is-hidden');


fetchBreeds().
    then(onMarkupList).
    catch(onError);

function onMarkupList(array) {
    array.forEach(e => btnSelectBread.insertAdjacentHTML("beforeend",
        `<option value=${e.id}>${e.name}</option>`));
    

    btnSelectBread.classList.remove('is-hidden');
    loader.classList.add('is-hidden');

}


btnSelectBread.addEventListener('change', onSelect);

function onSelect() {

    loader.classList.remove('is-hidden');
    articleCat.classList.add('is-hidden');


    const breedId = btnSelectBread.value;
    console.log(breedId)

    fetchCatByBreed(breedId).
        then(onCreateCatProfile).
        catch(onError)
        
    
}

function onCreateCatProfile(arr) {
    const { url, breeds } = arr[0];
    articleCat.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400" /><div class="cat-list"><p class="cat-name">${breeds[0].name}</p class="cat-about"><p>${breeds[0].description}</p><p><span class="cat-temp">Temperament: </span>${breeds[0].temperament}</p></div>`;

    loader.classList.add('is-hidden');
    articleCat.classList.remove('is-hidden');
  
}

function onError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page!', { timeout: 100000 });
    loader.classList.add('is-hidden')
}



