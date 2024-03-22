function searchYouTube() {
    var searchTerm = document.getElementById('search-input').value;
    var url = 'https://www.youtube.com/@ABC7/search?app=desktop&q=' + encodeURIComponent(searchTerm);

    // You can use AJAX, Fetch API, or any other method to fetch data from the YouTube URL
    // For simplicity, let's assume we're using fetch()
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Process the data and extract the search results
            var results = extractResults(data);
            
            // Display the results on the page
            displayResults(results);
        })
        .catch(error => console.error('Error:', error));
}

function extractResults(data) {
    // Extract the search results from the HTML data (you may need to parse the HTML)
    // For simplicity, let's assume we have a function named extractResults() to do this
    // You may need to use DOM manipulation or regular expressions to extract the relevant information
    var results = ...; // Extracted search results
    return results;
}

function displayResults(results) {
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    // Display each search result on the page
    results.forEach(result => {
        var resultElement = document.createElement('div');
        resultElement.innerHTML = result.title; // Assuming 'title' is a property of each search result
        resultsContainer.appendChild(resultElement);
    });
}
