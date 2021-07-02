// In Developement folder
// npm init -y
// npm install cheerio

const fs = require("fs");
const cheerio = require("cheerio");


let htmlKaData = fs.readFileSync("./index.html" , "utf8");
// console.log(htmlKaData); // we have stringified html file !!!

// html file is loaded in cheerio
let myDocument = cheerio.load(htmlKaData); // loading html file in cheerio

// document.querySelector("h1");

//console.log(myDocument);

let h1Element = myDocument("h1");
let h1KaData = myDocument("h1").text();

// console.log(h1Element); //element => cheerio => object form me data
// console.log(h1KaData);

// since we have choosen an index in pe we again need to put this in
// cheerio to convert it in the text file
let secondPTag = myDocument((myDocument("p")["1"])).text();
//console.log(secondPTag);

//Selectors
// p tag in ul
//console.log(myDocument("ul p").text());

// a tag

// here we will get all the tags inside li
//console.log(myDocument("a").text());

//console.log(myDocument("ul li a").text());
// go to google.com

// only direct child
//console.log(myDocument("ul>a").text());
// go to youtube.com

// classes and ids
// dot
//console.log(myDocument(".inside.main").text());
//Hey i am the main p tag !!!

// all the p tags which are in inside
// since we have two classes starting with name inside
// console.log(myDocument(".inside").text());

// ids
// #
// console.log(myDocument("#main-heading").text());
// Heading 2

// 
// it is necessary to give space if we are using

//  use of class and id together 
// console.log(myDocument(".hello #main-heading").text());
// Heading 2
