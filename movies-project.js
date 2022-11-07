
let url = 'https://faithful-marsh-soprano.glitch.me/movies/'
var editMovieModal = document.getElementById("editMovieModal");
var search = document.querySelector('#movie-search');
var genreFilter = document.querySelector("#filter-genre");
var ratingFilter = document.querySelector("#filter-rating");
const loader = document.querySelector("#loading");
var currentMovie = null;
var movieCollection = [];


// Loading Animation Functions
function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}
function hideLoading() {
    loader.classList.remove("display");
}

function renderSearchedMovies(arr) {
    let html = '';

    html += `<div class="card-body p-0 border-0">`
    html += `<div class="card movie-card m-3 d-flex bg-light text-center border-0 grow">`
    html += `<img class="card-img-top poster" src="img/matrix-niccage.jpeg">`
    html += `<h5 class="card-title title m-2 grow">${arr.title}</h5>`
    html += `<p class="card-text grow">${arr.rating} Stars -- ${arr.genre}</p>`
    html += `<a class="btn btn-dark alter-movie d-inline-flex p-1 rounded-circle bottom" href="#">Trash Btn</a>`
    html += `<a class="btn btn-dark alter-movie d-inline-flex p-1 rounded-circle bottom">Edit Btn</a>`
    html += `</div>`
    html += `</div>`

    return html
}

function searchResults(arr) {
    let html = '';
    for (let i = 0; i < arr.length; i++) {
        html += renderSearchedMovies(arr[i]);
    }
    return html;
}

function searchMovies(searchedStr) {
    let matchArray = [];

    movieCollection.forEach(function (movieObj) {
        if (movieObj.title.toLowerCase().includes(searchedStr.toLowerCase())) {
            matchArray.push(movieObj);
        }
    })
    // $("#movieList").html(searchResults(matchArray));
    $("#movieList").html((searchResults(matchArray)))
}

// Movie Search Function
$("#movie-search").keyup(function(e) {
    e.preventDefault();
    searchMovies(search.value);
})


function searchGenre(movieGenre) {
    let genreArray = [];
    movieCollection.forEach(function (movieObj) {
        if (movieObj.genre.toLowerCase().includes(movieGenre.toLowerCase())) {
            genreArray.push(movieObj);
            console.log(genreArray);
        }
    })
    // $("#movieList").html(searchResults(matchArray));
    $("#movieList").html((searchResults(genreArray)))
}


// Filter By Genres
$("#filter-genre").change(function(e) {
    e.preventDefault();
    let genreChoice = genreFilter.value;
    console.log(genreChoice);
    searchGenre(genreFilter.value)
})

function searchRatings(range) {
    let genreArray = [];
    movieCollection.forEach(function (movieObj) {
        if (movieObj.rating === range) {
            genreArray.push(movieObj);
        }
    })
    $("#movieList").html((searchResults(genreArray)))
}

// Filter By Ratings
$("#filter-rating").change(function(e) {
    e.preventDefault();
    searchRatings(ratingFilter.value)
})

// Grab Updated Movies
const updateMovies = async () => {
    try {
        let updateRequest = await fetch(url)
        let moviesData = await updateRequest.json()
        allMovies = moviesData
    }catch(err){
        console.error(err)
    } }

// Add New Movie
$("#new-submit-btn").click(async function(e) {
    e.preventDefault();
    const searchSound = new Audio("audio/search.wav");
    searchSound.play();

    // Set Movie Object and Properties
    let moviePost = {
        title: $("#new-movie-title").val(),
        genre: $("#new-movie-genre").val(),
        rating: $("#new-rating").val(),
    };

    // Set fetch Options for POST method
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost),
    };

    // Post New Movie
    try {
        await fetch(url, postOptions)
        presentMovies()
    } catch(err) {
        console.log(err);
    }


    // Present Movies to Include New Movie
    // todo: happening before post is complete, need find way to wait
})


// Delete movie
const deleteMovie = async (id) => {
    try {
        await fetch(url + `${id}`,{
            method : 'DELETE'
        })
    } catch(err) {
        console.error(err)
    }
}


// Edit Movie
const editMovie = async(id, movieObj) => {
    try{
        await fetch(url + `${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieObj),
        })
    } catch(err) {
        console.log(err)
    }
}


// Clear Movie List Div
const clearMovies = () => {
    $("#movieList").empty();
}

// Retrieve Movies List
const presentMovies = () => {
    // Grab Placeholder Div from HTML
    let container = document.getElementById('movieList');
    container.classList.add("flex-wrap", "align-items-start");

    displayLoading();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            clearMovies();
            hideLoading();
            data.map(function(movieObj) {
                movieCollection.push(movieObj);
                // Create Card Body
                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body", "p-0", "border-0");

                // Creating Card
                let card = document.createElement("div");
                card.classList.add("card", "movie-card", "m-3", "d-flex", "bg-light", "text-center", "border-0", "grow");
                // card.style = ("width: 18rem;");

                // Create Card IMG
                let cardImg = document.createElement("img");
                cardImg.classList.add("card-img-top", "poster");
                cardImg.src = ("img/matrix-niccage.jpeg");
                cardImg.alt = ("...");

                // Create Card Title
                let cardTitle = document.createElement("h5");
                cardTitle.classList.add("card-title", "title", "m-2", "grow");
                cardTitle.innerText = movieObj.title

                // Create Card Description
                let cardDescription = document.createElement("p");
                cardDescription.classList.add("card-text", "grow");
                cardDescription.innerText = `${movieObj.rating} Stars - ${movieObj.genre}`;

                // Create Edit Button
                let editBtn = document.createElement("a");
                editBtn.href = ("#");
                editBtn.classList.add("btn", "btn-dark", "alter-movie", "d-inline-flex","p-1", "rounded-circle", "bottom");
                editBtn.innerHTML = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-fill\" viewBox=\"0 0 16 16\">\n" +
                    "  <path d=\"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z\"/>\n" +
                    "</svg>");

                // Create Delete Button
                let delBtn = document.createElement("a");
                delBtn.classList.add("btn", "btn-dark", "alter-movie", "d-inline-flex", "p-1", "rounded-circle", "bottom");
                delBtn.innerHTML= ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3-fill\" viewBox=\"0 0 16 16\">\n" +
                    "  <path d=\"M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z\"/>\n" +
                    "</svg>");


                $(delBtn).click( async e => {
                    e.preventDefault();
                    const nicRageSound = new Audio('audio/that-was-wrong-what-you-did.mp3');
                    nicRageSound.play();
                    let confirm = window.confirm(`Are you sure you want to delete ${movieObj.title}?`)
                    if (confirm) {
                        await deleteMovie(movieObj.id);
                        await presentMovies();
                    }
                })

                $(editBtn).click( async e => {
                    e.preventDefault();
                    const nicRageSound = new Audio('audio/that-was-wrong-what-you-did.mp3');
                    nicRageSound.play();
                    let confirm = window.confirm(`Are you sure you want to edit ${movieObj.title}?`)
                    if (confirm) {
                        currentMovie = movieObj;
                        editMovieModal.style.display = "block";

                        // Populate Inputs with Current Movie Info
                        document.getElementById("edit-title").placeholder = `${movieObj.title}`;
                        document.getElementById("edit-genre").value = `${movieObj.genre}`
                        document.getElementById("edit-rating").value = `${movieObj.rating}`;

                        await editMovie(movieObj.id, movieObj);
                        await presentMovies();
                    }

                    // Edit Movie
                    $("#edit-submit-btn").click(async function(e) {
                        e.preventDefault();
                        const searchSound = new Audio("audio/search.wav");
                        await searchSound.play();

                        // Set Movie Object and Properties
                        let moviePut = {};
                        let movieTitle = document.getElementById("edit-title").value;
                        let genre = document.getElementById("edit-genre").value;
                        let rating = document.getElementById("edit-rating").value;
                        moviePut.title = movieTitle;
                        moviePut.genre = genre;
                        moviePut.rating = rating;
                        moviePut.id = currentMovie.id;

                        await editMovie(currentMovie.id, moviePut);
                        await updateMovies();
                        await presentMovies();

                        // Present Movies to Include New Movie
                        // todo: happening before post is complete, need find way to wait
                    })
                })


                // Append Everything
                cardBody.appendChild(cardImg);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardDescription);
                cardBody.appendChild(editBtn);
                cardBody.appendChild(delBtn);
                card.appendChild(cardBody);
                container.appendChild(card);
            });
        });
}

presentMovies();


// Page Loading Animation
window.onload = function(){
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
    // document.getElementById("my_audio").play();
};


// Modal Functionality
// Get the modal
var newMovieModal = document.getElementById("newMovieModal");

// Get the button that opens the modal
var newMovieBtn = document.getElementById("newMovieBtn");

var newSubmitBtn = document.getElementById("new-submit-btn");
var editSubmitBtn = document.getElementById("edit-submit-btn");

// Get the <div> element that closes the modal
var closeNewModal = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
newMovieBtn.onclick = function() {
    newMovieModal.style.display = "block";
}

newSubmitBtn.onclick = function() {
    newMovieModal.style.display = "none";
}

editSubmitBtn.onclick = function(e) {
    e.preventDefault()
    editMovieModal.style.display = "none";
}


// When the user clicks on <span> (x), close the modal
closeNewModal.onclick = function() {
    newMovieModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == newMovieModal) {
        newMovieModal.style.display = "none";
    }
}


// IDEAS:
// Sound bites
// Highlight reels to preview
// Add Movie Posters
// Customize Ratings Bar
// Optional Image URL for New Movie

