
/* global $ */
// 'https://developer.nps.gov/api/v1/parks?parkCode=acad'


const apiKey = 'fAvwKXa8AAXHrlhhywnH2TgzzE4pSjTjhpZ1QPwc';
//const searchUrl = 'https://developer.nps.gov/api/v1/alerts';
const searchUrl = 'api.nps.gov/api/v1/parks?stateCode=,fl,&limit=10';
// const stateSearchUrl = 'api.nps.gov/api/v1/parks?stateCode=,fl&limit=10';

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
//   return queryItems.join('&');
// }

function displayParkResults(responseJson) {
  (responseJson);
  $('#js-results-list').empty();
  for (let i = 0; i < responseJson.items.length; i++) {
    $('#js-results-list').append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    );
  }
  $('#js-results').removeClass('hidden');
}




// function getNatlParks(stateCode, maxResults = 10) {
//   const params = {
//     key: apiKey,
//     q: stateCode,
//     maxResults,
//     type: 'string'
//   };

// const queryString = formatQueryParams(params);
// const url = searchUrl + '?' + queryString;
function getNatlParks() {
  fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body: JSON.stringify({

    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayParkResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}




function parkSearch() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getNatlParks(searchTerm, maxResults);
  });

}

$(parkSearch);