let obj = {
    name : "steve",
    then : function(fn){
        console.log(fn);
        return {
            name : "jai"
        };
    }
}
function scb(){
    console.log("hello");
}

let rval = obj.then(scb);
console.log("rval",rval);