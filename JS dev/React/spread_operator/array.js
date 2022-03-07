let arr = [1,2,3,4,5,6];
let arr2 = arr;
arr.push(10);

// Without Spread Operator Changes Will Be done in both the Arrays
// console.log(arr);
// console.log(arr2);

// With Spread Operator
// Spread operator basically returns a list of elements in an array;

console.log(...arr);
// 1 2 3 4 5 6 10 list of elements in array without []
// So by the use of this list we can create new Array;

// Now we have created a new array from arr so this newely created array will point to some new adddress location and not to the
// location where arr is pointing
let arr3 = [...arr];
console.log(arr3);

// so if we do any changes in arr no changes will be done in arr3;
