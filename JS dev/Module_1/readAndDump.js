const fs = require("fs");
const path = require("path");
let pathCWD = process.cwd();
console.log(pathCWD);
let content = "";
function dump(pathCWD)
{
    let list = fs.readdirSync(pathCWD);
    for(let i = 0;i<list.length;i++)
    {
        let check = list[i].split("");
        if(check.includes("."))
        {
            let Npath = path.join(pathCWD,list[i]);
            console.log(Npath);
            content += "\n" +  fs.readFileSync(Npath,"utf-8");
        }
        else
        {
            let newPath = path.join(pathCWD,list[i]);
            dump(newPath);
        }
    }
}

dump(pathCWD);

console.log(content);

fs.appendFileSync(path.join(pathCWD,"summary.txt") , content);


// let add = path.join(process.cwd(),"file.js");
// console.log(add);
// console.log(path.basename(add));
// let pathSplit = path.basename(add).split(".");
// console.log(path.basename(add,"." + pathSplit[1])); // this removes the extension