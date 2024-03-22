function searchYouTube() {
    var searchTerm = document.getElementById('search-input').value;
    var url = 'https://www.youtube.com/user/ABC7/videos?view=0&sort=p&flow=grid';

    // You can use AJAX, Fetch API, or any other method to fetch data from the YouTube URL
    // For simplicity, let's assume we're using fetch()
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Process the data and extract the search results
            var results = extractResults(data, searchTerm);
            
            // Display the results on the page
            displayResults(results);
        })
        .catch(error => console.error('Error:', error));
}

function extractResults(data, searchTerm) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(data, 'text/html');
    var results = [];

    // Extracting search results from the parsed HTML
    var videoElements = doc.querySelectorAll('ytd-grid-video-renderer');
    videoElements.forEach(item => {
        var titleElement = item.querySelector('.yt-simple-endpoint');
        var videoTitle = titleElement.textContent.trim();
        var videoUrl = 'https://www.youtube.com' + titleElement.getAttribute('href');
        var videoThumbnail = item.querySelector('.style-scope img').getAttribute('src');

        // Check if the video title contains the search term
        if (videoTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
            // Creating an object for each video and adding it to the results array
            var video = {
                title: videoTitle,
                url: videoUrl,
                thumbnail: videoThumbnail
            };
            results.push(video);
        }
    });

    return results;
}

function displayResults(results) {
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    // Display each search result on the page
    results.forEach(result => {
        var resultElement = document.createElement('div');
        resultElement.classList.add('result');

        var thumbnailElement = document.createElement('img');
        thumbnailElement.src = result.thumbnail;
        resultElement.appendChild(thumbnailElement);

        var infoElement = document.createElement('div');
        infoElement.classList.add('info');

        var titleElement = document.createElement('h3');
        var titleLink = document.createElement('a');
        titleLink.href = result.url;
        titleLink.textContent = result.title;
        titleElement.appendChild(titleLink);
        infoElement.appendChild(titleElement);

        resultElement.appendChild(infoElement);

        resultsContainer.appendChild(resultElement);
    });
}
