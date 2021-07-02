let name = "steve";

// by default exports is an object and we are also passing 
// name by creating an object

// module.exports = {
//     name : name
// }

// here exports will now behave like a string
//module.exports = name;

// Since we know that this will create a key called name 
// and name (steve) will be assigned to the key name
module.exports.name = name;