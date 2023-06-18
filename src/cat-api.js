const KEY = 'live_s5ZhN7B1SEFMCrAKbYl4oedjpzWq5pt8HyKxIm7SHCGgDJ2cV1IbtOJ03aGfWn6d';

function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds?api_key=KEY')
        .then(response => response.json())
};

function fetchCatByBreed(breedId) {return fetch(`https://api.thecatapi.com/v1/images/${breedId}?api_key=KEY&has_breeds=1`)
        .then(response => response.json())}

export { fetchBreeds, fetchCatByBreed };