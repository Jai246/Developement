let arr = ["jai","amity","step","by","step"];

// let[a,b,c,d,e] = arr;
// console.log(a,b,c,d,e);

// let[a,b,,d,e] = arr;
// console.log(a,b,d,e);


// let [a,b,c,d,e,extra = "bhambri"] = arr; // We can assign a default value ,  if we dont then we will get undefined
// console.log(a,b,c,d,e,extra);

let [a,b,c,d,e,extra] = arr;
console.log(extra); // undefined
// because there is no value to be mapped