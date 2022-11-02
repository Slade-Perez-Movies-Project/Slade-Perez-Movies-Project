let url = 'https://faithful-marsh-soprano.glitch.me/movies'

// Retrieve Movies List
// todo: sort to present alphabetically
// todo: create function to create cards under data.map
// todo: loading animation
fetch(url)
    .then(response => response.json())
    .then(data => {
        let div = document.createElement('div');
        console.log(data);
        let mov;
        data.map(function(movieObj) {
                mov = `Movie Title: ${movieObj.title}  -  ID: ${movieObj.id}  -  Rating: ${movieObj.rating}  -  Genre: ${movieObj.genre}`
                div.append(mov);
                document.body.append(div);
        })
        // mov = data[0].title + data[0].id;
            console.log(mov);
    });



// Random Ideas:
// Sound bites
// Highlight reels to preview

