const fs = require("fs");
const path  = require("path");
let cwdPath = process.cwd();
let folderPath = path.join(cwdPath,"WebDev");
fs.mkdirSync(folderPath);
let folderNames = process.argv.slice(" ");
for(let i = 2;i<folderNames.length;i++)
{
    let webTech = folderNames[i];
    let techPath = path.join(folderPath,webTech);
    fs.mkdirSync(techPath);
    for(let i = 1;i<=5;i++)
    {
        moduleFolder = path.join(techPath,"Module_" + i); 
        fs.mkdirSync(moduleFolder);
        fs.writeFileSync(path.join(moduleFolder,"content.txt"),"Hi Welcome to " + webTech + " Folder .");
    }
}