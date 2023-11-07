document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.getElementById('search-button');
    var searchInput = document.getElementById('search');
    var resultsDiv = document.getElementById('results');
    var timeTakenDiv = document.getElementById('time-taken');
    var totalSearchCountDiv = document.getElementById('total-search-count'); // New div
    function fetchTotalSearchCount() {
        fetch('search_count.txt')
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                totalSearchCountDiv.textContent = 'Total Searches: ' + data;
            });
    }
    fetchTotalSearchCount();
    searchButton.addEventListener('click', function() {
        var searchTerm = searchInput.value.toLowerCase();
        var startTime = performance.now();
        fetch('search.php?searchTerm=' + searchTerm)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var endTime = performance.now();
                var totalTime = endTime - startTime;
                timeTakenDiv.innerHTML = 'Time taken to retrieve results: ' + totalTime.toFixed(2) + ' milliseconds';
                fetch('search_count.txt')
                    .then(function(response) {
                        return response.text();
                    })
                    .then(function(data) {
                        var currentCount = parseInt(data);
                        currentCount++;
                        totalSearchCountDiv.textContent = 'Total Searches: ' + currentCount;
                        fetch('update_search_count.php?count=' + currentCount);
                    });
                displayResults(data);
            });
    });
    function displayResults(results) {
        resultsDiv.innerHTML = '';
        if (results.length > 0) {
            resultsDiv.innerHTML += '<h3>Search Results:</h3>';
            results.forEach(function(rock) {
                resultsDiv.innerHTML += '<p><strong>Rock Name:</strong> ' + rock.RockName + '<br><strong>Rock Details:</strong> ' + rock.RockDetails + '</p>';
            });
        } else {
            resultsDiv.innerHTML += '<p>No results found.</p>';
        }
    }
});
