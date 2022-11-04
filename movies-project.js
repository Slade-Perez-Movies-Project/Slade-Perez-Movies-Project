
let url = 'https://faithful-marsh-soprano.glitch.me/movies'
let movieList = document.getElementById('movieList')
let moviesArray = [];

// Page Loading Animation
window.onload = function(){
    $('.loader-wrapper').fadeOut('slow');
    document.getElementById("my_audio").play();
};

//Delete a movie
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
            console.log(data);
            data.forEach(function(movieObj) {

                // Create Card Body
                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                // Creating Card
                let card = document.createElement("div");
                card.classList.add("card", "m-3");
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
                cardDescription.innerText = movieObj.rating;

                // Create Edit Button
                let editBtn = document.createElement("a");
                editBtn.href = ("#");
                editBtn.classList.add("btn", "btn-primary");
                editBtn.innerText = ("Edit");

                // Create Delete Button
                let delBtn = document.createElement("a");
                delBtn.classList.add("btn", "btn-success");
                delBtn.innerText= ("Delete");


                $(delBtn).click( async e => {
                    console.log("test")
                    e.preventDefault();
                    const nicRageSound = new Audio('audio/that-was-wrong-what-you-did.mp3');
                    nicRageSound.play();
                    let confirm = window.confirm(`Are you sure you want to delete ${movieObj.title}?`)
                    if (confirm) {
                        await deleteMovie(movieObj.id)
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

})


// IDEAS:
// Sound bites
// Highlight reels to preview
// Add Movie Posters
// Customize Ratings Bar

