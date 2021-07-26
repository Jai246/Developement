const fs = require("fs");
const path = require("path");
function treeFn(src) 
{
    let dir = fs.readdirSync(src);
    for(let i = 0;i<dir.length;i++)
    {
        let check = dir[i].split(".");
        let s = check.length;
        if(s == 2) console.log(dir[i]);
        else if(s == 1)
        {
            console.log(dir[i]);
            treeFn(path.join(src,dir[i]));
        }
    }
    console.log("tree command executed with path : " + src);
}

module.exports = {
    treefxn: treeFn
}