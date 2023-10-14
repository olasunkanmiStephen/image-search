// const searchForm = document.getElementById('search-form');
// const searchBox = document.getElementById('search-box');
// const searchResult = document.getElementById('search-result');
// const showMoreBtn = document.getElementById('show-more-btn');

// let keyword = "";
// let page = 1;

// async function searchImages(){
//     keyword = searchBox.value;
// const url = 'https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=O2ovLYkYrLJpv4y60ZXqBxy_pIXrFru5m-gae6wyh-k';
//     const response = await fetch(url);
//     const data = await response.json();

//     const results = data.results;
    
//     results.map((result) =>{
//         const image = document.createElement("img");
//         image.src = result.urls.small;
//         const imageLink = document.createElement("a");
//         imageLink.href = result.links.html;
//         imageLink.target = "_blank";

//         imageLink.appendChild(image);
//         searchResult.appendChild(imageLink);
//     })
// }

// searchForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     page = 1;
//     searchImages();
// })

// // console.log('Happy new day');

// // fetch("https://api.unsplash.com/search/photos?page=1&query=search.value&client_id=${accesskey}").then(function (res ){
// //     console.log(res.json())
// // })

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.querySelector('#search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;
let displayedImages = 0; // Track the displayed image count

async function searchImages() {
    keyword = searchBox.value;
    const url = 'https://api.unsplash.com/search/photos?page=' + page + '&query=' + keyword + '&client_id=O2ovLYkYrLJpv4y60ZXqBxy_pIXrFru5m-gae6wyh-k';
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = '';
    }

    const results = data.results;

    results.forEach(function(result) {
        if (displayedImages < 9) { // Check if the limit is reached
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);

            displayedImages++; // Increment the count
        }
    });
    // Update the display of the "Show more" button based on the limit
    if (displayedImages >= 5) {
        showMoreBtn.style.display = 'block'; // Hide the button
    } else {
        showMoreBtn.style.display = 'none'; // Show the button
    }
}

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    page = 1;
    displayedImages = 0; // Reset the displayed image count
    searchImages();
});

showMoreBtn.addEventListener("click", function() {
    page++;
    searchImages();
});

// Initial search on page load
searchImages();



 