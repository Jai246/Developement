const fs = require("fs");
const path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

let keys = Object.keys(types);

function organizeFn(src) 
{
    let dir = fs.readdirSync(src);
    for(let i = 0;i<dir.length;i++)
    {
        let fileName = dir[i];
        let ext = fileName.split(".");
        let flag = 0;
        for(let j = 0;j<keys.length;j++)
        {
            let flag = 0;
            let arr = types[keys[j]];
            for(let k = 0;k<arr.length;k++)
            {
                if(ext[1] == arr[k])
                {
                    if(!fs.existsSync(path.join(src,keys[j]))) fs.mkdirSync(path.join(src,keys[j]));
                    console.log(path.join(src,keys[j]));
                    fs.copyFileSync(path.join(src,dir[i]),path.join(src,keys[j],dir[i]));
                    flag = 1;
                    break;
                }
            }
        }
        if(flag == 0 && dir[i].split(".").size > 1 && dir[i].split(".")[1]!="js")
        {
            if(!fs.existsSync(path.join(src,"other"))) fs.mkdirSync(path.join(src,"other"));
            fs.copyFileSync(path.join(src,dir[i]),path.join(src,"other",dir[i]));
            break;
        }
    }
    console.log("organize  command executed with path: " + path.basename(src));
}
module.exports = {
    organizefxn: organizeFn
}