// 05 : 02:30

import React, { useState, useEffect } from 'react';
// by default runs after every re-render
// cleanup function
// second parameter

// by default use effect will run after every render
// const UseEffectBasics = () => {
//   const [value,setValue] = useState(0);
//   // useEffect(()=>{
//   //   console.log('call useEffect');
//   //   document.title = `New Messages(${value})`;
//   // });


//   // this will give error because we can't call hooks conditionally
//   // if(value > 0)
//   // {
//   //     useEffect(()=>{
//   //     console.log('call useEffect');
//   //     document.title = `New Messages(${value})`;
//   //   });
//   // }

//     useEffect(()=>{
//     console.log('call useEffect');
//     if(value>0) document.title = `New Messages(${value})`;
//   });

//   console.log('render component');
//   return (
//     <>
//       <h1>{value}</h1>
//       <button type='button' className="btn" onClick={()=> setValue(value+1)}> click me</button>  
//     </>
//   );
// };



// Understanding the second parameter
// by the use of [] as the second argument use effect will
// only work on first render
// const UseEffectBasics = () => {
//   const [value,setValue] = useState(0);
//   // useEffect(()=>{
//   //   console.log('call useEffect');
//   //   document.title = `New Messages(${value})`;
//   // });


//   // this will give error because we can't call hooks conditionally
//   // if(value > 0)
//   // {
//   //     useEffect(()=>{
//   //     console.log('call useEffect');
//   //     document.title = `New Messages(${value})`;
//   //   });
//   // }

//     useEffect(()=>{
//     console.log('call useEffect');
//     if(value>0) document.title = `New Messages(${value})`;
//   },[]);

//   console.log('render component');
//   return (
//     <>
//       <h1>{value}</h1>
//       <button type='button' className="btn" onClick={()=> setValue(value+1)}> click me</button>  
//     </>
//   );
// };


// by the use of [value as the second argument use effect will
// only work on first render and when the value will change
const UseEffectBasics = () => {
  const [value,setValue] = useState(0);

  // we can setup mjltiple use effects

  useEffect(()=>{
    console.log('call useEffect');
    if(value>0) document.title = `New Messages(${value})`;
  },[value]); // DEPENDENCY ARRAY


  useEffect(()=>{
    console.log('hello world');
  },[]);
  console.log('render component');
  return (
    <>
      <h1>{value}</h1>
      <button type='button' className="btn" onClick={()=> setValue(value+1)}> click me</button>  
    </>
  );
};


export default UseEffectBasics;
 