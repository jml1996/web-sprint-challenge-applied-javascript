// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardsDiv = document.querySelector(".cards-container");

axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then((response) => {
        // console.log(response.data.articles);
        const articlesObjectByTopic = response.data.articles;
        const completeTopicsArray = ["javascript", "bootstrap", "technology", "jquery", "node"];
        completeTopicsArray.forEach((topic) =>  articlesObjectByTopic[topic].forEach((topicData) => cardsDiv.appendChild(cardMaker(topicData))));
        
        // console.log(articleArrayNoCat);
        // response.data.articles.forEach((articleCat) => {
        //     console.log(articleCat);
        //     articleCat.forEach((article) => cardsDiv.appendChild(cardMaker(article)));
        // });
    })
    // .then(() => {
    //     const cardsArray = Array.from(document.querySelectorAll(".card"));
    //     console.log(cardsArray);
    //     cardsArray.forEach((card) => card.addEventListener("click", () => console.log(card.headline)));
    // })
    .catch(() => console.log("Error:")) //error
    .finally(() => console.log("Done"));

function cardMaker (obj) {
    // debugger;
    // console.log(obj);
    const cardDiv = document.createElement("div"); //.card
    const headlineDiv = document.createElement("div"); //.headline, text: {headline}
    const authorDiv = document.createElement("div"); //.author
        const imgDiv = document.createElement("div"); //.img-container
            const image = document.createElement("img");
        const span = document.createElement("span"); // text: By {author's name}

    cardDiv.classList.add("card");
    headlineDiv.classList.add("headline");
    authorDiv.classList.add("author");
    imgDiv.classList.add("img-container");

    headlineDiv.textContent = obj.headline;
    image.src = obj.authorPhoto;
    span.textContent = `By ${obj.authorName}`;


    //img source


    cardDiv.appendChild(headlineDiv);
    cardDiv.appendChild(authorDiv);
    authorDiv.appendChild(imgDiv);
    imgDiv.appendChild(image);
    authorDiv.appendChild(span);

    // const cardsArray = Array.from(document.querySelectorAll(".card"));
    //     console.log(cardsArray);
    //     cardsArray.forEach((card) => card.addEventListener("click", () => console.log(card.headline)));
    // })
    cardDiv.addEventListener("click", () => console.log(headlineDiv.textContent));

    return cardDiv;
}