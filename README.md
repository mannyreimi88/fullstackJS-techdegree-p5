# fullstackJS-techdegree-p5
 
An API-generated employee directory app with the following functionality:
-   on load, the app sends a request to the Random User Generator API (https://randomuser.me) and fetches information on 12 'employees'.
-   the app processes the response from JSON to JavaScript objects that are used to dynamically inject a 'card' visual element for each employee. Each card contains the employee's name, image, email, city, and state/territory.
-   the app also parses and generates a 'dataset' of stored key-value pairs that are injected in the `data-*` attributes of each card's HTML, to faciliate extensibility (HTML5).
-   each card can be clicked. On click, using extensible HTML, the stored 'dataset' of key-value pairs is used to reconstruct a JavaScript object and generate a modal window that provides additional information about each employee (like his phone number, full street address, and birthday).
    -   there is no data loss and no need to send a second API request, as all necessary information to generate the modal has been stored in the clicked element via `data-*` attributes.
    -   phone numbers and birthdays are standardized using regex.
    -   street addresses are generated via template literal interpolation.
-   the modal window can be closed by clicking the 'X' button generated with the modal itself.
-   the script powering this app has been structured to show the coding process and all functions and listeners have been documented with [JSDoc](https://jsdoc.app/). Complex functions (e.g. recursively flattening deeply-nested objects without data loss) have been commented inline for readability.

The following functionality has been added for **extra credit**:
-   **search by name** via a dynamically injected search box (progressive enhancement) that displays substring matches keyed in the search input and hides other cards in real-time.
-   a **modal toggle** that uses two dynamically inserted buttons in each modal, to toggle back and forth between employees respectively without having to leave the modal window.
-   **CSS personalization** from the template provided by [Team Treehouse](https://github.com/treehouse):
    -   the background color has been changed for a shade of *light cyan*.
    -   an 'x'-like decoration that appears by default in search inputs in certain browsers has been removed to improve the search experience.