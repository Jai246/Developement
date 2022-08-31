import React, { useState } from 'react';
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {

  const [text,setText] = useState('Jai');
  const [isError,setIsError] = useState(false);
  // const firstValue = text || 'hello world'; // ret first value
  // const secondValue = text && 'hello world'; // ret second value



  return <>
  {/* {if(){console.log('hello')}}; // not allowed in react */}
  {/* <h1>{firstValue}</h1>
  <h1> value : {secondValue}</h1> */}

    <h1>{text || 'Jai Bhambri'}</h1>
    <button className='btn' onClick={()=>{setIsError(!isError)}}>toggle error</button>
    {isError && <h1>Jai</h1>}
    {isError ? <p>there is an error</p> : <div>
        <h2>no error</h2>
      </div>}
  {/* {!text && <h1>Jai</h1>} */}
  </>
};

export default ShortCircuit;
