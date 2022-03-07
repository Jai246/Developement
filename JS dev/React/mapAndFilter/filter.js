let arr = ["apple","mango","banana","orange","grapes","guava"];

// let narr = arr.filter((value)=>{
//     return value.length>=6;
// })

let narr = arr.filter((value,idx)=>{
    return value.length>=idx+5;
})

console.log(narr);