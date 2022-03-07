let obj = { 
    name : "jai",
    course : "B.Tech",
    branch : "CS",
    enroll : "A2305219533",
    roll : "19533",
    cgpa : 7.54
}

// let {name,course,branch,enroll,roll} = obj; // note that we have to give tha same key names while destructuring
// console.log(name,course,branch,enroll,roll); 


// let {name,course,branch,enroll,roll,cgpa = 9.0,gender = "Male"} = obj; // note that we have to give tha same key names while destructuring
// console.log(name,course,branch,enroll,roll,cgpa,gender); 

// let {name:firstName,course,branch,enroll,roll,cgpa = 9.0,gender = "Male"} = obj;// we can change the variable name as well
// console.log(name,course,branch,enroll,roll,cgpa,gender); 


let obj1 = {
    name : "jai",
    course : "B.Tech",
    marks :{
        cl10 : 9.2,
        cl12 : 83,
        BTech : 7.54,
        amityId:{
            enrollmentNo : "A2305219533",
            rollNo : 19533
        }
    }
}

let {name} = obj1;
let {marks:{amityId:{enrollmentNo:ID}}} = obj1;
console.log(ID);