const fs = require("fs");
let cwdPath = process.cwd();
console.log(cwdPath);
let folderPath = cwdPath + "/" + "WebDev";
fs.mkdirSync(folderPath);

let folderNames = process.argv.slice(" ");
console.log(folderNames);
for(let i = 2;i<folderNames.length;i++)
{
    let webTech = folderNames[i];
    let techPath = folderPath + "/" + webTech;
    console.log(techPath);
    fs.mkdirSync(techPath);
    for(let i = 1;i<=5;i++)
    {
        moduleFolder = techPath + "/" + "Module_" + i; 
        fs.mkdirSync(moduleFolder);
        fs.writeFileSync(moduleFolder +"/"+ "content.txt","Hi Welcome to " + webTech + " Folder .");
    }
}
