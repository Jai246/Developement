// Rendering ke time par poora code vapis chalta hei except usestate
// functions and objects ko bhi nay memory allocate hoti hei as we know it and new refrence is passed
// So we need to memoize funtions and objects ans well
// agar humm aais nahi karnege and hum fun ya obj props mei bhi bhejenge to bhi re rendring hogi oos component ki bhi jise humne 
//  change bhi nahi kiya
// fun and obj ko even React.memo bhi memoize nahi karskta
import React, { useState, useMemo, useCallback } from 'react';
import Counter from "./Counter";
function CounterParent() {
    let [count, setCount] = useState(0);
    let [count1, setCount1] = useState(0);
    const increment = () => {
        setCount((count) => {
            return count + 1;
        });
    }
    const increment1 = () => {
        setCount1((count1) => {
            return count1 + 1;
        });
    }
    // yeh poora function memoize kar leta hei
    const incrementChild = useCallback(() => { // for memoising funcctions
        setCount((count) => {
            return count + 1;
        })
    }, [count]);
    // useMemo is a hook -> that will only run your function
    // when the depended state variable changes  

    // Use memo count aane par function run karta hei
    const isEven = useMemo(() => {
        // console.log(count);
        let i = 0;
        while (i < 3000000000) i++;
        return count % 2 === 0;
    }, [count]);

    // jab count chang hoga tabhi new memory milegi
    const randomObj = useMemo(() => { // for memoising objects
        return {
            name: "child component"
        }
    }, [count]);
    // const randomObj = {
    //     name: "child component"
    // }


    console.log("Parent Rendered");
    return (
        <div>
            <button
                onClick={increment}
            >Count - {count}
            </button>
            <span>  {isEven ? "even" : "odd"}</span>
            <br></br>
            <button
                onClick={increment1}
            >Count - {count1}</button>
            <Counter count={count} incrementChild={incrementChild}
                randomObj={randomObj}
            ></Counter>
        </div>
    )
}
export default CounterParent