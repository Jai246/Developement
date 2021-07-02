
const fun =  require("./wCat.js");

let test = require("./wCat.js");

let contents  = process.argv.slice(2); // slicing from index 2 because befor it we have some more things
// check this by printing process.argv obj

const flags = [];
const files = [];

for(let i = 0;i<contents.length;i++)
{
    if(contents[i].startsWith("-")) flags.push(contents[i]);
    else files.push(contents[i]);
}

let filesData = fun.getFilesData(files);

if(flags.includes("-s")) filesData = fun.applySflag(filesData);
if(flags.includes("-b") && flags.includes("-n"))
{
    if(flags.indexOf("-b") < flags.indexOf("-n"))
    {
        filesData = fun.applyNflag(filesData);
    }
    else filesData = fun.applyBflag(filesData);
}
else if(flags.includes("-b")) filesData = fun.applyBflag(filesData);
else if(flag.includes("-n")) filesData = fun.applyNflag(filesData);

console.log(filesData);