let helpObj = require("./help");
let treeObj = require("./tree");
let organizeObj = require("./organize");
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let src = process.cwd();
console.log(src);
switch (command) 
{
    case "tree":
        treeObj.treefxn(src);
        break;
    case "organize":
        organizeObj.organizefxn(src);
        break;
    case "help":
        helpObj.helpfxn();
        break;
    default:
        console.log("🙏 kindly enter the correct cmd");
        break;
}