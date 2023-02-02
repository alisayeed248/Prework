/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (let i = 0; i< games.length; i++) {
        
        const gameElement = document.createElement("gameElement");
        gameElement.classList.add("game-card");
        gameElement.innerHTML = `<img class="game-img" src="${games[i].img}">
        <h2>${games[i].name}
        <p>${games[i].description}</p>
        <p>Backers: ${games[i].backers}</p>`;
        gamesContainer.appendChild(gameElement);
    }


    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((contrib, game) => {
    return contrib + game.backers;
}, 0);
console.log(totalContributions);

contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((pledged, game) => {
    return pledged + game.pledged;
}, 0);

raisedCard.innerHTML = "$" + totalRaised.toLocaleString('en-US');

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    let listOfUnfundedGames = games.filter ((game) => {
        return game.pledged < game.goal;
    });
    console.log(listOfUnfundedGames.length);
    // now we have a list of unfunded games
    deleteChildElements(gamesContainer);
    // delete all child elements and add list
    addGamesToPage(listOfUnfundedGames);

    /* function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    */

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly(games) {
    let listOfFundedGames = games.filter ((game) => {
        return game.pledged >= game.goal;
    });
    console.log(listOfFundedGames.length);
    deleteChildElements(gamesContainer);
    addGamesToPage(listOfFundedGames);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames(games) {
    deleteChildElements(gamesContainer);
    addGamesToPage(games);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", function() {filterUnfundedOnly(GAMES_JSON)});
fundedBtn.addEventListener("click", function() {filterFundedOnly(GAMES_JSON)});
allBtn.addEventListener("click", function() {showAllGames(GAMES_JSON)});

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter(((game) => {
    return game.pledged < game.goal;
}));
const unfundedGamesCount = unfundedGames.length;


let displayStr = `A total of ${totalRaised} has been raised for ${GAMES_JSON.length} games. 
Currently, ${unfundedGamesCount} ${{unfundedGamesCount} === 1 ? "game remains" : "games remain"} 
unfunded. We need your help to fund these amazing games!`;
console.log(displayStr);

const pledgedString = document.createElement("pledgedString");
pledgedString.innerHTML = `<p>A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. 
Currently, ${unfundedGamesCount} ${{unfundedGamesCount} === 1 ? "game remains" : "games remain"} 
unfunded. We need your help to fund these amazing games!</p>`;
descriptionContainer.appendChild(pledgedString);


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [first, second, ...others] = sortedGames;

let {name, desc, pl, goal, bkrs, img} = first;
const topGame = document.createElement("top-game");
topGame.innerHTML = `${name}`;
firstGameContainer.appendChild(topGame);

// issue with destructuring second variable, had to use array notation
const secondName = sortedGames[1].name;
const secondGame = document.createElement("second-game");
secondGame.innerHTML = `${secondName}`;
secondGameContainer.appendChild(secondGame);


const searchInput = document.getElementById("search");
searchInput.addEventListener("input", e => {
    const value = e.target.value;
    console.log(value);
    // our map is GAMES_JSON

});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item