
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

fetch(url)
    .then(response => response.json())
    .then(data => {
        clearMovies();

        data.map(function(movieObj) {
            let container = document.getElementById('movieList');

            // Creating Card
            let cardHTML = document.createElement("div");
            cardHTML.classList.add("card", "m-3");
            cardHTML.style = ("width: 18rem");

            // Create Card Body
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            // Create Card IMG
            let cardImg = document.createElement("img");
            cardImg.classList.add("card-img-top");
            cardImg.src = ("img/matrix-niccage.jpeg");
            cardImg.alt = ("...");


            // Create Card Title
            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.innerText = movieObj.title

            // Create Card Description
            let cardDescription = document.createElement("p");
            cardDescription.classList.add("card-text");
            cardDescription.innerText = movieObj.rating;

            // Create Edit Button
            let editBtn = document.createElement("a");
            editBtn.href = ("#");
            editBtn.classList.add("btn");
            editBtn.innerText = ("Edit");

            // Create Delete Button
            let delBtn = document.createElement("a");
            delBtn.classList.add("btn");
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
            document.body.append(container);
            container.appendChild(cardBody);


            cardBody.append(cardImg);
            cardBody.append(cardTitle);
            cardBody.append(cardDescription);
            cardBody.append(editBtn);
            cardBody.append(delBtn);

        });

    });

// fetchMovies();


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
            // <div className="card" style="width: 18rem;">
            //     <img src="..." className="card-img-top" alt="...">
            //         <div className="card-body">
            //             <h5 className="card-title">Card title</h5>
            //             <p className="card-text">Some quick example text to build on the card title and make up the bulk
            //                 of the card's content.</p>
            //             <a href="#" className="btn btn-primary">Go somewhere</a>
            //         </div>
            // </div>
            let container = document.createElement('div');
            container.innerHTML = '';


            data.map(function(movieObj) {
                let container = document.createElement('div');
                container.classList.add("d-inline-block", "justify-content-center");
                container.innerHTML = '';
                let cardHTML = `<div class="card m-3" style="width: 18rem">`;
                cardHTML += `<img src="img/matrix-niccage.jpeg" class="card-img-top" alt="...">`;
                cardHTML += `<div class="card-body">`;
                cardHTML += `<h5 class="card-title">${movieObj.title}  -  ID: ${movieObj.id}</h5>`;
                cardHTML += `<p class="card-text">Rating: ${movieObj.rating} Genre: ${movieObj.genre}</p>`;
                cardHTML += `<a href="#" class="btn btn-primary">Edit</a>`;
                cardHTML += `<a href="#" class="btn btn-primary">Delete</a></div></div>`;
                // let movieCard = document.createElement('div');
                // movieCard.classList.add("card");
                // movieCard = `Movie Title: ${movieObj.title}  -  ID: ${movieObj.id}  -  Rating: ${movieObj.rating}  -  Genre: ${movieObj.genre}`
                // movieList.innerHTML(cardHTML);
                container.innerHTML = cardHTML;
                document.body.append(container);
            })
        });
})


// IDEAS:
// Sound bites
// Highlight reels to preview
// Add Movie Posters
// Customize Ratings Bar

