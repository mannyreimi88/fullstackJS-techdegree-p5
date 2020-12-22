// reminder of fetch 

    // fetch('https://randomuser.me/api/')
    //     .then(response => response.json())
    //     .then(data => console.log(data));

// step 1 (done) – link js and jQuery library (optional) files to index.html

// step 2 (done) – dynamically inject HTML

    // select DOM elements for use
const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.getElementById('gallery');

    // the search markup
const search = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

    // the card markup
const card = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">first last</h3>
            <p class="card-text">email</p>
            <p class="card-text cap">city, state</p>
        </div>
    </div>
`;

    // inject the search bar into the page
searchDiv.insertAdjacentHTML('beforeend', search);

    // inject a gallery card into the page
galleryDiv.insertAdjacentHTML('beforeend', card);
