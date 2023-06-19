const API_KEY = 'live_s5ZhN7B1SEFMCrAKbYl4oedjpzWq5pt8HyKxIm7SHCGgDJ2cV1IbtOJ03aGfWn6d';
const BASE_URL = 'https://api.thecatapi.com/v1'

function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(response => {

            if (!response.ok) {
                throw new Error()
            }
            return response.json()
        }
        )
};

function fetchCatByBreed(breedId) {return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(response => {

            if (!response.ok) {
                throw new Error()
            }
            return response.json()
        }
        )
};

export { fetchBreeds, fetchCatByBreed };