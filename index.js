
/* global $ */


const apiKey = 'fAvwKXa8AAXHrlhhywnH2TgzzE4pSjTjhpZ1QPwc';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayParkResults(responseJson) {

  $('#js-results-list').html(generateParkResults(responseJson.data));
  $('#js-results').removeClass('hidden');
}


function generateParkResults(data) {
  let html = '';
  data.forEach(item => {
    html += `
    <li><h3>${item.fullName}</h3>
      <p>${item.description}</p>
      </li>
    `;
  });
  return html;
}



function getNatlParks(stateCode, limit = 10) {
  const params = {
    'api_key': apiKey,
    stateCode,
    limit,
  };

  const queryString = formatQueryParams(params);
  const url = searchUrl + '?' + queryString;


  fetch(url)
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