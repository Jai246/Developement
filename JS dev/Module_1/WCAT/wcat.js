const fs = require("fs");

const path = require("path");

const utf8 = require('utf8');


let add = path.join(process.cwd(),"f2.txt");

let fileData = fs.readFileSync(add , "utf-8");

function sFunc(fileData)
{
    let finalData = "";
    let splittedData = fileData.split("\r\n");
    let check = false;
    for(let i = 0;i<splittedData.length;i++)
    {
        if(splittedData[i] != "")
        {
            finalData += splittedData[i] + "\n";
            check = false;
        }
        else if(splittedData[i] == "" && check == false)
        {
            finalData += "\n";
            check = true;
        }
    }
    console.log(finalData);
    return utf8.encode(fileData); // DOING THIS SO THAT DATA CAN BE USED FURTHER;
}

function nFunc(fileData)
{
    let finalData = "";
    let splittedData = fileData.split("\r\n");
    let count = 1;
    for(let i = 0;i<splittedData.length;i++)
    {
        finalData += "\n" + count++ + "." + " " + splittedData[i]; 
    }

    console.log(finalData);
    return utf8.encode(fileData); // DOING THIS SO THAT DATA CAN BE USED FURTHER;
}

function bFunc(fileData)
{
    let finalData = "";
    let splittedData = fileData.split("\r\n");
    let count = 1;
    for(let i = 0;i<splittedData.length;i++)
    {
        if(splittedData[i]!="") finalData += "\n" + count++ + "." + " " + splittedData[i];
        else finalData += "\n"; 
    }
    console.log(finalData);
    return utf8.encode(fileData); // DOING THIS SO THAT DATA CAN BE USED FURTHER;
}

sFunc(fileData)

module.exports = {
    s : sFunc,
    n : nFunc,
    b : bFunc
}