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
// const completeTopicsObj = document.querySelectorAll(".tab");
// const completeTopicsArray2 = Array.from(completeTopicsObj);
// console.log(completeTopicsArray2);
axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then((response) => {
        let completeTopicsArray = ["javascript", "bootstrap", "technology", "jquery", "node"];
        

        // Below for stretch
        const allTabDivs = document.querySelectorAll(".tab");
        const allTabDivsArray = Array.from(allTabDivs);
        let indexToRemove;
        allTabDivsArray.forEach((tab) => tab.addEventListener("click", (event) => {
            const tabToRemove = event.target.textContent;
            indexToRemove = completeTopicsArray.indexOf(tabToRemove);
            completeTopicsArray.splice(indexToRemove, 1);

            cardsDiv.innerHTML = '';
            const articlesObjectByTopic = response.data.articles;
            completeTopicsArray.forEach((topic) =>  articlesObjectByTopic[topic].forEach((topicData) => cardsDiv.appendChild(cardMaker(topicData))));
            completeTopicsArray = ["javascript", "bootstrap", "technology", "jquery", "node"];
        }));
        // Above for stretch

        const articlesObjectByTopic = response.data.articles;
        completeTopicsArray.forEach((topic) =>  articlesObjectByTopic[topic].forEach((topicData) => cardsDiv.appendChild(cardMaker(topicData))));
    })
    .catch((err) => console.log("Error: ", err))
    .finally(() => console.log("Done"));

function cardMaker (obj) {
    // console.log(obj);
    const cardDiv = document.createElement("div");
    const headlineDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
        const imgDiv = document.createElement("div"); 
            const image = document.createElement("img");
        const span = document.createElement("span"); 

    cardDiv.classList.add("card");
    headlineDiv.classList.add("headline");
    authorDiv.classList.add("author");
    imgDiv.classList.add("img-container");

    headlineDiv.textContent = obj.headline;
    image.src = obj.authorPhoto;
    span.textContent = `By ${obj.authorName}`;

    cardDiv.appendChild(headlineDiv);
    cardDiv.appendChild(authorDiv);
    authorDiv.appendChild(imgDiv);
    imgDiv.appendChild(image);
    authorDiv.appendChild(span);

    cardDiv.addEventListener("click", () => console.log(headlineDiv.textContent));

    return cardDiv;
}

function tabChecker() {
    console.log(document.querySelectorAll(".tab").textContent);
}