const fs = require("fs");

let f1_data = fs.readFileSync("./f1.txt" , "utf-8");
let f2_data = fs.readFileSync("./f2.txt" , "utf-8");

//console.log(f1_data + " ");

//let bothData = f1_data + "\n" + f2_data;

//console.log(bothData + " ");


// let splitted_data = f1_data.split("\r\n");

// console.log(splitted_data);

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
    return final_data
}

let ans = applySflag(f1_data);
console.log(ans);