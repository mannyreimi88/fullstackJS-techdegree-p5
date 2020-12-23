// step 1 (done) – link js and jQuery library (optional) files to index.html

// step 2 (done) – dynamically inject HTML

    // select DOM elements for use
const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us,ca,nz&exc=login,id,registered';
const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.getElementById('gallery');

    // the search markup
const search = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

    // inject the search bar into the page
searchDiv.insertAdjacentHTML('beforeend', search);

// step 3 (done) – structure, style, and CSS
    // all elements match the mockups
    // there is a way to remove the modal window (press the button with the "X")

/** 
 * Generates HTML for each user object and injects it to the page
 * @param {Object[]} data - an array of user objects
 */
function generateCards(data) {
    data.results.map(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        const cardChildren = `
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        `;
        galleryDiv.insertAdjacentElement('beforeend', card);
        card.insertAdjacentHTML('beforeend', cardChildren);

        // recursive loop code adapted from @Rotareti https://stackoverflow.com/a/41550077 
        function saveObjInDataAttrs (obj, element) {
            Object.entries(obj).forEach(([key, val]) => {
              if (val && typeof val === "object") saveObjInDataAttrs(val, card); // recurse.
              else element.dataset[key] = val; // or do something with key and val.
            });
        };
        saveObjInDataAttrs(user, card);
    });
}

/** 
 * Generates HTML for each user object and injects it to the page
 * @param {DOMStringMap} user - a pseudo-object representing data attributes in an element 
 */
function generateModal(user) {
    const cell = user.cell.replace(/(\d{3})-(\d{3})-(\d{4})/, '($1) $2-$3');
    const birthday = user.date.replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$2/$3/$1');
    const address = user => `${user.number} ${user.name}, ${user.city}, ${user.state} ${user.postcode}`;
    
    const modal = document.createElement('div');
    modal.classList.add('modal-container')
    const modalChildren = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.large}" alt="${user.first} ${user.last}">
                <h3 id="name" class="modal-name cap">${user.first} ${user.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.city}</p>
                <hr>
                <p class="modal-text">${cell}</p>
                <p class="modal-text">${address(user)}</p>
                <p class="modal-text">Birthday: ${birthday}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    `;
    document.body.insertAdjacentElement('beforeend', modal);
    modal.insertAdjacentHTML('beforeend', modalChildren);

    document.getElementById('modal-close-btn').addEventListener('click', () => {
        modal.remove();
    })
}

// step 4 (done) – get and display 12 random users
    // single request to Random User Generator API
    // include image, first and last name, email, city / location
    // displayed image matches mockups on index.html

fetch(randomUserUrl)
    .then(response => response.json())
    .then(generateCards);

// step 5 (done) – create a modal window
    // modal displays the 

galleryDiv.addEventListener('click', event => {
    if (/^card/.test(event.target.classList)) {
        const card = event.target.closest('.card');
        const user = card.dataset;
        generateModal(user);
    }
});