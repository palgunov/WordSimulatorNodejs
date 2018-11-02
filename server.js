const express = require("express");
// const fs =require("fs");
const app = express();
const port = 3000;
let currentQuestion = 0;
let limitQuestions = 0;
let dictionary = [
    "apple", "word", "coffee", "green" , "red", "blue", "awesome", "amazing", "function", "artist", "singer", "black",
    "five", "for", "about", "what", "restaurant", "silence", "hotel", "luxury", "woman", "cat", "dog", "sister", "mother",
    "wallet", "pharmacy", "mountain", "box", "road", "interesting", "capital", "hope", "pain"
];
let shuffle = (array) => {
    array.forEach((value, index) => {
        let rand = Math.floor(Math.random() * array.length);
        array[index] = array[rand];
        array[rand] = value;
    });
};

let wordArr ="";
let displayCurrentQuestion = () => {
    let word = dictionary[currentQuestion];
    wordArr = word.split("");
    shuffle(wordArr);
};
app.use(express.static(__dirname + "/public/"));

app.post("/make", (req, res) => {
    currentQuestion = parseInt(req.query.currentQuestion);
});
app.post("/transfer", (req, res) => {
    limitQuestions = parseInt(req.query.limitQuestions);
});

app.get("/dictionary",(request, response)=> {
    shuffle(dictionary);
    let json = JSON.stringify(dictionary.slice(0,limitQuestions));
    currentQuestion = 0;
    return response.send(json);
});
app.get("/words",(request, response)=> {
    displayCurrentQuestion();
    let json = JSON.stringify(wordArr);
    return response.send(json);
});
app.listen(port , ()=>
console.log("3000")
);