const MAIN_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_PCDG99sEkiNxZe1SDpqUR84908l4nGx99n9kNvrdAVzQ6fh0Bae6yVgYqTRn2Bdj';

function getBreedList() {
  return fetch(`${MAIN_URL}/breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  const options = {
    headers: {
      'x-api-key': API_KEY,
    },
  };
  return fetch(`${MAIN_URL}/images/search?${params}`, options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }
  );
}

export { getBreedList, fetchCatByBreed };
