// fs -> file system;
// fs is a library which has a lot of functions
const fs = require("fs");
//console.log(fs);

// utf - 8 => format for plain text

//let fileData = fs.readFileSync("./f1.txt");

//console.log(fileData) // if i print it like this then this is not a human readable format

// let fileData = fs.readFileSync("./f1.txt" , "utf-8");
// console.log(fileData); //  will print human readable format

let filedata = fs.readFileSync("./f1.txt");
console.log(filedata + " "); // this will also convert it into human readable format
