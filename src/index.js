import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getBreedList, fetchCatByBreed } from './cat-api';

const el = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

el.select.classList.add('js-hidden');
el.select.addEventListener('change', handlerChoice);

getBreedList()
  .then(data => {
    // console.log(data);
    const markup = createMarkup(data);
    // console.log(markup);
    el.select.innerHTML = '<option data-placeholder="true"></option>' + markup;

    new SlimSelect({
      select: el.select,
      settings: {
        placeholderText: 'Select cat breed',
      },
    });
    el.select.classList.remove('js-hidden');
  })
  .catch(error => {
    Notify.failure(`Error: ${error}`);
  })
  .finally(() => {
    el.loader.classList.add('js-hidden');
  });

function createMarkup(breedArray) {
  return breedArray
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
}

function handlerChoice(event) {
  el.catCard.classList.add('js-hidden');
  el.loader.classList.remove('js-hidden');
  const catId = event.currentTarget.value;

  fetchCatByBreed(catId)
    .then(data => {
      const url = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      el.catCard.innerHTML = createCatMarkup(
        url,
        name,
        description,
        temperament
      );
      el.catCard.classList.remove('js-hidden');
    })
    .catch(error => {
      Notify.failure(`Error: ${error}`);
    })
    .finally(() => {
      el.loader.classList.add('js-hidden');
    });
}

function createCatMarkup(img, name, decsr, temperament) {
  return `<div class="img-container">
        <img class="img" src="${img}" alt="${name}" />
      </div>
      <div class="text-container">
        <h2 class="name">${name}</h2>
        <p class="descr">${decsr}</p>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
      </div>`;
}
