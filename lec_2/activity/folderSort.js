let fs = require("fs");

let testFolderPath = "./Downloads";

let currentFolder = "./";

let extensionMapping = require("./util.js");

let allFiles = fs.readdirSync(currentFolder);// used to read the directory

let check = false;

for(let i = 0;i<allFiles.length;i++)
{
    sortFile(allFiles[i]);
}
function sortFile(file)
{
    let extension = getExtension(file);
    let extensionFolderName = checkExtensionFolder(extension[1]);
    if(check) moveFile(file , extensionFolderName);
    check = false;
}
function getExtension(file)
{
    file = file.split(".");
    return file;
}
function checkExtensionFolder(extension)
{
    let extensionFolderName = testFolderPath;
    for(let key in extensionMapping)
    {
        let extensions = extensionMapping[key];
        if(extensions.includes(extension))
        {
            check = true;
            extensionFolderName = extensionFolderName + "/" + key;
            break;
        }
    }
    if(check)
    {
        let isFolderExist = fs.existsSync(extensionFolderName);
        if(!isFolderExist)
        {
            fs.mkdirSync(extensionFolderName);
        }
        return extensionFolderName;
    }
}
function moveFile(file , extensionFolderName)
{
    let sourceFile = currentFolder + "/" + file;
    let destinationFile = extensionFolderName+"/"+file;

    fs.copyFileSync(sourceFile , destinationFile);
    fs.unlinkSync(sourceFile);
}