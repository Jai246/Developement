let fs = require("fs");

let f1_data = fs.readFileSync("./f1.txt" , "utf-8");
let f2_data = fs.readFileSync("./f2.txt" , "utf-8");

//console.log(f1_data + " ");

//let bothData = f1_data + "\n" + f2_data;

//console.log(bothData + " ");


// let splitted_data = f1_data.split("\r\n");

// console.log(splitted_data);

let file = [
    "./f1.txt",
    "./f2.txt"
]

function getFilesData(file)
{
    let filesData = "";

    for(let i = 0;i<file.length;i++)
    {
        if(!fs.existsSync(file[i])){
            console.log("One Or More Files Doesn't Exists !!!!!!!");
            return;
        }
        if(i == file.length - 1)
        {
            filesData += fs.readFileSync(file[i] , "utf-8");
        }
        else
        {
            filesData += fs.readFileSync(file[i] , "utf-8") + "\r\n";
        }
    }
    return filesData;
}
console.log(getFilesData(file));
console.log();
console.log();
// -s remove extra spaces 

function applySflag(data)
{
    let final_data = [];

    let splitted_data = data.split("\r\n");
    //console.log(splitted_data);
    let space_inc = false;
    
    for(let i = 0 ; i < splitted_data.length ; i++)
    {
        if(splitted_data[i] != "")
        { 
            final_data.push(splitted_data[i]);
            //if(i == splitted_data.length - 2) space_inc = false;
            if(i+1 < splitted_data.length && splitted_data[i] != "" && splitted_data[i+1] == "") space_inc = false;
        }
        else if(splitted_data[i] == "" && space_inc == false)
        {
            final_data.push(" ");
            space_inc = true;
        }
    }
    return final_data.join("\r\n")
}

let ans1 = applySflag(f1_data);
console.log("-s output ->");
console.log();
console.log();
console.log(ans1);

// -b flag implementation

function applyBflag(data)
{
    let count = 1;
    let splitted_data = data.split("\r\n");

    for(let  i = 0;i<splitted_data.length;i++)
    {
        if(splitted_data[i] != "") splitted_data[i] = (count++) + ". " + splitted_data[i];
    }

    return splitted_data.join("\r\n");
}

let ans2 = applyBflag(f1_data);
console.log();
console.log();
console.log();
console.log("-b output ->");
console.log();
console.log();
console.log(ans2);
console.log();
console.log();
console.log();


function applyNflag(data)
{
    let splitted_data = data.split("\r\n");

    let count = 1;

    for(let i = 0;i<splitted_data.length;i++)
    {
        splitted_data[i] = (count++) + ". " + splitted_data[i]; 
        //splitted_data[i] = `${count++}.  ${splitted_data[i]}`; // latest way of doing this
    }
    return splitted_data.join("\r\n");
}

let ans3 = applyNflag(f1_data);
console.log();
console.log();
console.log();
console.log("-n output ->");
console.log();
console.log();
console.log(ans3);
console.log();
console.log();
console.log();


module.exports = {
    getFilesData,
    applySflag,
    applyBflag,
    applyNflag
}