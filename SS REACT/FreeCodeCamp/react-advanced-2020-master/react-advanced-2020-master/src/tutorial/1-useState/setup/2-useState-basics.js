import React, { useState } from 'react';

const UseStateBasics = () => {
  // console.log(useState('hello')); // default value is necessssay
  // const value = useState(1)[0]; // value
  // const handler = useState(1)[1]; // handler function


  const [text,setText] = useState('random title');
  const handleClick=()=>{
    if(text === 'random title') setText('Hello World');
    else setText('random title');
    
  }
  // console.log(value,handler);
  return (
    <React.Fragment>
      <h1>{text}</h1>
      <button type='button' className='btn' onClick={handleClick}>Change</button>
    </React.Fragment>
  )
}
export default UseStateBasics;
