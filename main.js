// API URL with the API KEY
//API FOR IMAGES
//API FOR SEARCHING

const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

//async is a promise
async function getMovies(url) {

    const response = await fetch(url); //awaits the url
    const data = await response.json(); //awaits the response
    console.log(data); //logs the data to the console
    showMovies(data.results); // sends data into showMovies function to get iterates through
}

function showMovies(movies) {
    main.innerHTML = ""; // clears content
    //iterates through movies using movie as element
    movies.forEach(movie => {
    const { poster_path, title,overview, vote_average } = movie; // creates variables and copies attributes
    const movieEl = document.createElement("div"); // creates a new <div></div>
    movieEl.classList.add("movie"); //adds CSS movie class to newly made element

    //inserting data into the new element with the movie class
    movieEl.innerHTML = `
    <img src="${IMGPATH + poster_path} "alt="${title}"> 
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview:</h3>
        ${overview}
    </div>
    `;
    //appends newly created movie element <div></div> and makes it a child of main content
    main.appendChild(movieEl);
    });
    }


//sets the color depending on the vote
function getClassByRate(vote) {
    if(vote >= 8) {
        return  "green";
    }
    else if(vote >= 5) {
        return "orange";
    }
    else {
        return "red";
    }
}

// listens for "submit" action in form which is tied to form element
//by either pressing ENTER or clicking submit on form
form.addEventListener("submit", (e) => { 
    e.preventDefault(); //prevents refreshing
    
    const searchTerm = search.value; //retrieves value from search input element
    
    //if searchItem exists
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm); //retrive the movies
        search.value = ""; //clear the search bar
    }
    });

