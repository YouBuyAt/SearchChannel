function search() {
    var query = document.getElementById("search-input").value;
    var url = "https://www.youtube.com/@ABC7/search?app=desktop&q=" + encodeURIComponent(query);

    fetch(url)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");
            var searchResults = doc.querySelectorAll('.style-scope ytd-video-renderer');

            var resultsContainer = document.getElementById("search-results");
            resultsContainer.innerHTML = "";

            searchResults.forEach(result => {
                var title = result.querySelector("#video-title").textContent;
                var videoUrl = "https://www.youtube.com" + result.querySelector("#video-title").getAttribute("href");
                var thumbnail = result.querySelector("#img").getAttribute("src");

                var resultItem = document.createElement("div");
                resultItem.classList.add("result");

                var titleElement = document.createElement("a");
                titleElement.textContent = title;
                titleElement.href = videoUrl;
                titleElement.target = "_blank";
                resultItem.appendChild(titleElement);

                var thumbnailElement = document.createElement("img");
                thumbnailElement.classList.add("thumbnail");
                thumbnailElement.src = thumbnail;
                resultItem.appendChild(thumbnailElement);

                resultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => console.error('Error:', error));
}
