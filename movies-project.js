
let url = 'https://faithful-marsh-soprano.glitch.me/movies'


// Page Loading Animation
window.onload = function(){
    $('.loader-wrapper').fadeOut('slow');
};


// Retrieve Movies List
// todo: sort to present alphabetically
// todo: create function to create cards under data.map
fetch(url)
    .then(response => response.json())
    .then(data => {
        let div = document.createElement('div');
        div.classList.add("container");
        let mov;
        data.map(function(movieObj) {
                mov = `Movie Title: ${movieObj.title}  -  ID: ${movieObj.id}  -  Rating: ${movieObj.rating}  -  Genre: ${movieObj.genre}`
                div.append(mov);
                document.body.append(div);
        })
    });


// Post New Movie
$("#submit-btn").click(function(e) {
    e.preventDefault();
    const searchSound = new Audio("audio/search.wav");
    searchSound.play();

    // Set Movie Object and Properties
    let moviePost = {};
    let movieTitle = document.getElementById("movieTitle").value;
    let genre = document.getElementById("genre").value;
    let rating = document.getElementById("rating").value;
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
    // todo: make a function
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let div = document.createElement('div');
            div.classList.add("container");
            let mov;
            data.map(function(movieObj) {
                mov = `Movie Title: ${movieObj.title}  -  ID: ${movieObj.id}  -  Rating: ${movieObj.rating}  -  Genre: ${movieObj.genre}`
                div.append(mov);
                document.body.append(div);
            })
        });
})


// IDEAS:
// Sound bites
// Highlight reels to preview
// Add Movie Posters
// Customize Ratings Bar

