// step 1 – this file has been linked to index.html

// step 2 – dynamically inject HTML

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

    // inject the search bar into the page
searchDiv.insertAdjacentHTML('beforeend', search);

// step 3 – structure, style, and CSS
    // all elements match the mockups
    // there is a way to remove the modal window (press the button with the "X")
    /* exceeds – extra credit */ 
        // background color for the body has been changed
        // input search box decoration has been removed for better functionality

/** 
 * Generates HTML for each user object and injects it to the page
 * @param {Object[]} data - an array of user objects
 */
function generateCards(data) {
    data.results.map((user, index) => {
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

        // iterable code adapted from @Rotareti https://stackoverflow.com/a/41550077 
        Object.entries(flatten(user)).forEach(([key, val]) => card.dataset[key] = val);
        
        // add an index to each card
        card.dataset['index'] = index;
    });
}

/** 
 * Generates HTML for a modal containing more info about the user, as well as the modal's interaction logic
 * @param {DOMStringMap} user - a pseudo-object representing data attributes in an element
 * @param {HTMLDivElement} card - the div containing the card HTML and other user info in its data attributes
 */
function generateModal(user, card) {
    const cell = user.cell.replace(/(\d{3})-(\d{3})-(\d{4})/, '($1) $2-$3');
    const birthday = user.dobDate.replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$2/$3/$1');
    const address = user => `${user.locationStreetNumber} ${user.locationStreetName}, ${user.locationCity}, ${user.locationState} ${user.locationPostcode}`;
    
    const modal = document.createElement('div');
    modal.classList.add('modal-container')
    const modalChildren = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.pictureLarge}" alt="${user.nameFirst} ${user.nameLast}">
                <h3 id="name" class="modal-name cap">${user.nameFirst} ${user.nameLast}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.locationCity}</p>
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

    /**
     * Removes the modal on clicking the 'X' button
     */
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        modal.remove();
    });

    /* exceeds — extra credit */

    /**
     * Handles the toggle logic for the modal buttons 'PREV' and 'NEXT'
     * @param {MouseEvent} event - interface triggered by the user action 
     */
    document.querySelector('.modal-btn-container').addEventListener('click', event => {
        if (event.target.tagName === 'BUTTON') {
            const cards = document.querySelectorAll('div[data-index]');
            const thisIndex = +card.dataset.index;
            let clickIndex;
            if (event.target.id === 'modal-prev') {
                if (thisIndex > 0) clickIndex = thisIndex-1;
                else clickIndex = cards.length-1;
            } 
            if (event.target.id === 'modal-next') {
                if (thisIndex < cards.length-1) clickIndex = thisIndex+1;
                else clickIndex = 0;
            };
            const clickCard = document.querySelector(`div[data-index='${clickIndex}']`);
            const clickUser = clickCard.dataset;
            modal.remove();
            generateModal(clickUser, clickCard);
        }
    });
}

// step 4 (done) – get and display 12 random users
    // single request to Random User Generator API
    // include image, first and last name, email, city / location
    // displayed image matches mockups on index.html

const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us,ca,nz&exc=login,id,registered';

fetch(randomUserUrl)
    .then(response => response.json())
    .then(generateCards)
    .catch(error => console.error('Error', error));

// step 5 – create a modal window
    // modal displays the data stored in the data attributes of the div.card container

/**
 * Handles the display of the modal window when clicking on the user card
 * @param {MouseEvent} event - interface triggered by the user action 
 */
galleryDiv.addEventListener('click', event => {
    if (event.target.className.includes('card')) {
        const card = event.target.closest('.card');
        const user = card.dataset;
        generateModal(user, card);
    }
});

/* helper functions */

/**
 * Converts strings from snake_case and kebab-case to camelCase
 * adapted from @author Robert <https://hisk.io/javascript-snake-to-camel/>
 * @param {string} str - a hyphen (-) or underscore (_) separated string
 */
function snakeToCamel(str) {
    return str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
} 

/**
 * Flattens a nested object while constructing a string for the path towards the nested values
 * adapted from @author muratgozel <https://stackoverflow.com/a/61602592>
 * @param {Object} obj - the nested object to be flattened
 * @param {Array} path - an accumulator variable for the path of keys towards the nested value
 * @param {string} sep - the symbol (in this case a hyphen) that separates the keys that form the path
 */
function flatten (obj, path = [], sep = '-') {
    return Object.keys(obj).reduce((mem, prop) => Object.assign(
        // target is a new object
        {},
        // first source is the previously returned object
        mem,
        // subsequent sources are iterations over the nested objjects
        Object.prototype.toString.call(obj[prop]) === '[object Object]'
        // recursion if value is an object while adding props to path
        ? flatten(obj[prop], path.concat([prop]))
        // include current prop and value and prefix prop with the path previously stored
        // added snakeToCamel to pass the kebab-case path and turn it to camelCase
        : {[snakeToCamel(path.concat([prop]).join(sep))]: obj[prop]}
    ), {});
}

/* exceeds — extra credit */

// search by name
const searchInput = document.querySelector('#search-input');

/**
 * Hides/Shows cards that match the input value of the search box by name
 * adapted from @author W3Schools <https://www.w3schools.com/howto/howto_js_search_menu.asp)>
 */
searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toUpperCase();
    const names = galleryDiv.querySelectorAll('#name');

    for (i = 0; i < names.length; i++) {
        const name = names[i];
        const card = names[i].parentNode.parentNode;
        if (name.innerText.toUpperCase().indexOf(filter) > -1) {
            card.style.display = 'inherit';
        } else {
            card.style.display = 'none';
        }
    }
});

// remove default submit behaviour from form button
document.getElementById('search-submit').addEventListener('submit', e => e.preventDefault());