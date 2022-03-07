// Browser Mode and Non Strict Mode
// Global Object for browser is windows

console.log(this);// Window 

const test = {
    prop: 42,
    func: function() {
      return this.prop;
    },
  };
  
  console.log(test.func());

// In web browsers, the window object is also the global object:

// The strict equality operators (=== and !==) use the Strict Equality Comparison Algorithm to compare two operands.

// If the operands are of different types, return false.
// If both operands are objects, return true only if they refer to the same object. Important
// If both operands are null or both operands are undefined, return true.
// If either operand is NaN, return false.
// Otherwise, compare the two operand's values:
// Numbers must have the same numeric values. +0 and -0 are considered to be the same value.
// Strings must have the same characters in the same order.
// Booleans must be both true or both false.
// The most notable difference between this operator and the equality (==) operator is that if the operands are of different types, 
// the == operator attempts to convert them to the same type before comparing.


console.log(this === window); // true
window.a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"


// The call() method calls a function with a given this value and arguments provided individually.
// The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object).
let obj = {a: 'Custom'};

// We declare a variable and the variable is assigned to the global window as its property.
let a = 'Global';

function whatsThis() {
  return this.a;  // The value of this is dependent on how the function is called
}

whatsThis();          // 'Global' as this in the function isn't set, so it defaults to the global/window object
whatsThis.call(obj);  // 'Custom' as this in the function is set to obj
whatsThis.apply(obj); // 'Custom' as this in the function is set to obj

// function fn()
// {
//     console.log(this);// {Fname: 'jai', Lname: 'bhambri', func: ƒ}
//     function abc(){
//         console.log(this);
//     }
//     abc();
// }



// function fn()
// {
//     console.log(this);// {Fname: 'jai', Lname: 'bhambri', func: ƒ}
//     function abc(){
//         console.log(this);
//     }
//     let ret = abc.bind(this); // {Fname: 'jai', Lname: 'bhambri', func: ƒ}
//     ret();
// }

// ShortCut
// Using Arrow
// Arrow Function Parent ke this ko apna this bana leta hei
function fn()
{
    console.log(this);// {Fname: 'jai', Lname: 'bhambri', func: ƒ}
    abc = () => {
        console.log(this);
    }
    abc(); // {Fname: 'jai', Lname: 'bhambri', func: ƒ}
}

let det = {
    Fname : "jai",
    Lname : "bhambri",
    func :fn
}

det.func();

function fnn(){
    console.log(this);
}

let obj3 = {
    name : "jai",
    func : fnn
}

obj3.func(); // Self Object