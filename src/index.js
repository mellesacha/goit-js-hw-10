const btnSelectBread = document.querySelector('.breed-select');
const articleCat = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// new SlimSelect({
//     select: '.breed-select',
//     settings: {
//     placeholderText: 'Select a cat breed',
//     hideSelected: true,
//   },
//     events: {
//         beforeChange: btnSelectBread.insertAdjacentHTML("beforeend", `<option>3</option><option>2</option>`)
//     }
// })

// btnSelectBread.style.display = "none";
// articleCat.style.display = "none";

btnSelectBread.classList.add('is-hidden');
articleCat.classList.add('is-hidden');


fetchBreeds().
    then(onMarkupList).
    catch(error => Notify.failure('Oops! Something went wrong! Try reloading the page!', {timeout: 100000}));

function onMarkupList(array) {
    array.forEach(e => btnSelectBread.insertAdjacentHTML("beforeend",
        `<option value=${e.reference_image_id}>${e.name}</option>`));
    
    // btnSelectBread.style.display = "block";
    // loader.style.display = "none";

    btnSelectBread.classList.remove('is-hidden');
    loader.classList.add('is-hidden');

}

btnSelectBread.addEventListener('change', onSelect);

function onSelect() {

    // loader.style.display = "block";
    // articleCat.style.display = "none";

    loader.classList.remove('is-hidden');
    articleCat.classList.add('is-hidden');


    const breedId = btnSelectBread.value;

    fetchCatByBreed(breedId).
        then(onCreateCatProfile).
        catch(error => Notify.failure('Oops! Something went wrong! Try reloading the page!', {timeout: 100000}));
    
}

{/* <p>${breeds[0].name}</p><p>${breeds[0].description}</p><p>Temperament: ${breeds[0].temperament}</p> */ }
{/* <ul class=""><li>${breeds[0].name}</li><li>${breeds[0].description}</li><li>Temperament: ${breeds[0].temperament}</li></ul>` */}

function onCreateCatProfile(obj) {
    const { url, breeds } = obj;
    articleCat.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400" /><div class="cat-list"><p class="cat-name">${breeds[0].name}</p class="cat-about"><p>${breeds[0].description}</p><p><span class="cat-temp">Temperament: </span>${breeds[0].temperament}</p></div>`;
    // loader.style.display = "none";
    // articleCat.style.display = "block";

    loader.classList.add('is-hidden');
    articleCat.classList.remove('is-hidden');
 
}



