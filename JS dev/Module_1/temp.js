const fs = require("fs");
let path = "";
let list = fs.readdirSync(path);
console.log(list);

for(let i = 0;i<list.length;i++)
{
    let check = list[i].split("");
    if(check.includes("."))
    {
        let data = fs.readFileSync(path+list[i]);
        fs.writeFileSync("summary.txt",data);
    }
}
