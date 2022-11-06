
let url = 'https://faithful-marsh-soprano.glitch.me/movies'
let movieList = document.getElementById('movieList')
var editMovieModal = document.getElementById("editMovieModal");

// Page Loading Animation
window.onload = function(){
    $('.loader-wrapper').fadeOut('slow');
    // document.getElementById("my_audio").play();
};

// Delete movie
const deleteMovie = async (id) => {
    try{
        let deleteRequest = await fetch(url + `/${id}`,{
            method : 'DELETE'
        })

        return deleteRequest
    }catch(err){
        console.error(err)
    }
}


// Edit Movie
const editMovie = async(id, movieObj) => {
    try{
        let editRequest = await fetch(url + `/${id}`, {
            method: 'POST',
            body: JSON.stringify(movieObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return editRequest
    } catch(err) {
        console.log(err)
    }
}

const clearMovies = () => {
    let div = document.getElementById("movieList");
    div.innerHTMl = '';
}

// Retrieve Movies List
// todo: sort to present alphabetically
// todo: create function to create cards under data.map

const presentMovies = () => {
    // Grab Placeholder Div from HTML
    let container = document.getElementById('movieList');
    container.classList.add("flex-wrap", "align-items-start");

    clearMovies();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(function(movieObj) {

                // Create Card Body
                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                // Creating Card
                let card = document.createElement("div");
                card.classList.add("card", "m-3", "d-flex");
                // card.style = ("width: 18rem;");

                // Create Card IMG
                let cardImg = document.createElement("img");
                cardImg.classList.add("card-img-top", "poster");
                cardImg.src = ("img/matrix-niccage.jpeg");
                cardImg.alt = ("...");


                // Create Card Title
                let cardTitle = document.createElement("h5");
                cardTitle.classList.add("card-title", "title");
                cardTitle.innerText = movieObj.title

                // Create Card Description
                let cardDescription = document.createElement("p");
                cardDescription.classList.add("card-text");
                cardDescription.innerText = `${movieObj.rating} - ${movieObj.genre}`;

                // Create Edit Button
                let editBtn = document.createElement("a");
                editBtn.href = ("#");
                editBtn.classList.add("btn", "btn-primary", "d-inline-flex", "justify-content-start");
                editBtn.innerText = ("Edit");

                // Create Delete Button
                let delBtn = document.createElement("a");
                delBtn.classList.add("btn", "btn-success", "d-inline-flex", "justify-content-end");
                delBtn.innerText= ("Delete");


                $(delBtn).click( async e => {
                    e.preventDefault();
                    const nicRageSound = new Audio('audio/that-was-wrong-what-you-did.mp3');
                    nicRageSound.play();
                    let confirm = window.confirm(`Are you sure you want to delete ${movieObj.title}?`)
                    if (confirm) {
                        await deleteMovie(movieObj.id)
                    }
                })

                $(editBtn).click( async e => {
                    e.preventDefault();
                    const nicRageSound = new Audio('audio/that-was-wrong-what-you-did.mp3');
                    nicRageSound.play();
                    let confirm = window.confirm(`Are you sure you want to edit ${movieObj.title}?`)
                    if (confirm) {
                        editMovieModal.style.display = "block";
                        let currentMovie = movieObj;

                        // Populate Inputs with Current Movie Info
                        document.getElementById("edit-title").placeholder = `${movieObj.title}`;
                        document.getElementById("edit-genre").value = `${movieObj.genre}`
                        document.getElementById("edit-rating").value = `${movieObj.rating}`;

                        await editMovie(`${movieObj.id}`, movieObj)
                    }
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


// Post New Movie
$("#new-submit-btn").click(function(e) {
    e.preventDefault();
    const searchSound = new Audio("audio/search.wav");
    searchSound.play();

    // Set Movie Object and Properties
    let moviePost = {};
    let movieTitle = document.getElementById("new-movie-title").value;
    let genre = document.getElementById("new-movie-genre").value;
    let rating = document.getElementById("new-rating").value;
    moviePost.title = movieTitle;
    moviePost.genre = genre;
    moviePost.rating = rating;

    // Set fetch Options for POST method
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost),
    };

    // Post New Movie
    fetch(url, postOptions)
        .then(response => response.json())
        .catch(response => console.log(response))

    // Present Movies to Include New Movie
    // todo: happening before post is complete, need find way to wait
})

// Modal Functionality
// Get the modal
var newMovieModal = document.getElementById("newMovieModal");

// Get the button that opens the modal
var newMovieBtn = document.getElementById("newMovieBtn");

var newSubmitBtn = document.getElementById("new-submit-btn");
var editSubmitBtn = document.getElementById("edit-submit-btn");

// Get the <div> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
span.onclick = function() {
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

