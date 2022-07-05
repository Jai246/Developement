import React,{useState} from 'react'

function UseState() {
    let [count,setCount] = useState(0);
    const IncrementCount=()=>{
        setCount(count+1);
    }
    const DecrementCount=()=>{
        setCount(count-1);
    }

    const IncrementByFive=()=>{
        
        // for(let i = 0;i<=5;i++) setCount(count+1); // this will not work because loop runs very fast and rendering takes time
        // This will only increase bby 1 and Not 5

        for(let i = 1;i<=5;i++) 
        {
            setCount((count)=>{
                return count+1;
            });
        }
    }
    return (
        <>
            <button onClick={IncrementCount}>Increment</button>
            <span>  {count}  </span>
            <button onClick={DecrementCount}>Decrement</button>
            <button onClick={IncrementByFive}>____Five</button>
        </>
    )
}

export default UseState