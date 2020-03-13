
/* global $ */
// 'https://developer.nps.gov/api/v1/parks?parkCode=acad'


const apiKey = 'fAvwKXa8AAXHrlhhywnH2TgzzE4pSjTjhpZ1QPwc';
//const searchUrl = 'https://developer.nps.gov/api/v1/alerts';
const searchUrl = 'https://developer.nps.gov/api/v1';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getNatlParks(query, maxResults = 10) {
  const params = {
    key: apiKey,
    q: query,
    part: 'somethinghere?',
    maxResults,
    type: 'somethinghere?'
  };
  const queryString = formatQueryParams(params);
  const url = searchUrl + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json(),
          console.log(response.json());
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function userInput() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getNatlParks(searchTerm, maxResults);
  });

}

$(userInput);