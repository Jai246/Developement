let files = ["../f1.txt","../f2.txt","../f3.txt"];

const fs = require("fs");

// function recursion(files , l)
// {
//     fs.readFile(files[l] , function(err,data){
//         console.log(data + " ");
//         // console.log(data + " ");
//     })
//     if(l<files.length-1) recursion(files,l + 1);
// }

function recursion(files , l)
{
    fs.readFile(files[l] , function(err,data){
        if(l<files.length-1) recursion(files,l + 1);
        console.log(data + " ");
        // console.log(data + " ");
    })
}

recursion(files,0);