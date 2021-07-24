let files = ["../f1.txt","../f2.txt","../f3.txt"];

const fs = require("fs");

console.log("starting...");

for(let i = 0;i<files.length; )
{
    fs.readFile(files[i],function(err,data){
        console.log(data + "");
        i++;
    })
}

console.log("end");


// for(let i = 0;i<files.length; )
// {
//     fs.readFile(files[i],function(err,data){
//         console.log(data + "");
//         i++;
//     })
// }

// This will just print starting........
// because i is in the callback function which is async
// so i will go in the node API it won't gets
// incremented 