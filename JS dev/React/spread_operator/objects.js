let obj = {
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

let obj3 = {...obj,marks:{...obj.marks,amityId:{...obj.marks.amityId}}}; // Important
let obj4 = JSON.parse(JSON.stringify(obj)); // ShortCut;
// Note that strings are made on stacks on not on heap
let obj2 = obj;
obj2.name = "Jai Bhambri";
console.log(obj2);
console.log(obj);

console.log(obj3);