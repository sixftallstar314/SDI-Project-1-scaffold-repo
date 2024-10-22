const movieInput = document.getElementById('movie-input');
const searchButton = document.getElementById('search-button');
const ratingResult = document.getElementById('rating-result');
const moviePlot = document.getElementById('movie-plot');
const posterResult = document.getElementById('movie-poster');
const searchHistoryList = document.getElementById('search-history');
const searchHistory = [];

function userSearch() {
    const movieTitle = movieInput.value;
    if (!movieTitle) {
        alert('Please enter a movie title.');
        return;
    }

    searchHistory.push(movieTitle);
    updateSearchHistoryList();
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=3e1d0aef`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                posterResult.innerHTML = `<img src="${data.Poster}">`;
                ratingResult.textContent = `The Movie "${data.Title}" is rated:${data.Rated}`;
                moviePlot.innerHTML = `The Movie "${data.Title}" plot is:<br><br> ${data.Plot}`;
                if (data.Rated === 'R' || data.Rated === 'NC-17' || data.Rated === 'TV-MA' || data.Rated ) {
                    ratingResult.style.color = 'red';
                    ratingResult.textContent += " - Do Not Play this Movie or TV Show per Detachment Policy";
                } else {
                    ratingResult.style.color = 'black';
                }
            } else {
                alert("Movie not found");
            }
        })
}


searchButton.addEventListener('click', userSearch);
movieInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        userSearch();
    }
});

function updateSearchHistoryList() {
    searchHistoryList.innerHTML = '';
    searchHistory.slice(-5).forEach(title => {
        const listItem = document.createElement('li');
        listItem.textContent = title;
        searchHistoryList.appendChild(listItem);
    });
}