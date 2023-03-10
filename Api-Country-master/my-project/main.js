import { debounce } from 'lodash/function.js';
const cards = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const filter = document.getElementById('filter');

let db = [];
const RenderCard = (data, isLoading) => {
  cards.innerHTML = '';
  if (isLoading) {
    data.map((item) => {
      const html = `
    <div
            class=" bg-dark-me-400 p-2 rounded-md shadow flex flex-col h-[25rem] gap-2 justify-between"
          >
            <div class=' w-full h-32 overflow-hidden rounded-full' style="overflow: hidden; border-radius: 5px ">
              <img src="${item.flags.png}" alt="" class="w-full h-32" />
            </div>
            
            <div>
            <h3 class="text-dark-me-100 font-semibold text-2xl my-6">${item.name.common}</h3>
            <div class="flex gap-10">
              <h4 class="text-dark-me-100">Country Code:</h4>
              <p class="text-dark-me-100">${item.idd.root}${item.idd.suffixes}</p>
            </div>
            <div class="flex gap-10">
              <h4 class="text-dark-me-100">Neighbor:</h4>
              <p class="text-dark-me-100 w-4 break-me">${item.borders}</p>
            </div>
            <div class="flex gap-10">
              <h4 class="text-dark-me-100">Capital:</h4>
              <p class="text-dark-me-100">${item.capital}</p>
            </div>
            </div>
            
            <button class="bg-dark-me-200 rounded-3xl p-2 text-dark-me-100">
              More ...
            </button>
          </div>`;
      cards.innerHTML += html;
    });
  } else {
    cards.innerHTML = `<div aria-label="Loading..." role="status">
    <svg class="p- h-12 w-12 animate-spin" viewBox="3 3 18 18">
      <path
        class="fill-gray-200"
        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
      <path
        class="fill-gray-800"
        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
    </svg></svg>`;
  }
};

const Data = async function () {
  try {
    RenderCard('_', false);

    const resource = await fetch('http://localhost:3000/countries');

    console.log(resource);
    const getJson = await resource.json();
    RenderCard(getJson, true);
    return getJson;
  } catch (error) {
    alert(error.message);
  }
};
Data();
// .............................search......................./
searchInput.addEventListener('keyup', debounce(searchHandler, 1000));

function searchHandler(e) {
  const seachValue = e.target.value;
  const responseSearch = fetch(
    `http://localhost:3000/countries?q=${seachValue}`
  )
    .then((data) => data.json())
    .then((data) => RenderCard(data));
}
// ..........................filter........................../
filter.addEventListener('change', filterHandler);
function filterHandler(e) {
  const filterValue = e.target.value;
  if (filterValue == 'All') {
    const result = Data();
    RenderCard(result, true);
  }
  const responseFilter = fetch(
    `http://localhost:3000/countries?region=${filterValue}`
  )
    .then((data) => data.json())
    .then((data) => RenderCard(data, true));
}
