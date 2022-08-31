import React, { useState, useEffect } from 'react';

// cleanup function
// second argument

// const UseEffectCleanup = () => {

//   const [size,setSize] = useState(window.innerWidth);
//   const checkSize = () =>{
//     setSize(window.innerWidth);
//   }

//   // before we add a new event listner we clean the prev one
//   // useeffect -> render -> cleanup > useeffect
//   // before we run the use effect after the render
//   // we first run the cleanup functions
//   useEffect(() => {
//     console.log('useEffect')
//     window.addEventListener('resize',checkSize)
//     // addEventLister is called a lot of times because of rerendring
//     // rerendering due to change in window width
//     // this will take a lot of memory usage
//     // so to handle this we need cleanup FUNCTIONS

//     return ()=>{
//       console.log('cleanup');
//       window.removeEventListener('resize',checkSize);
//     };

//   });
//   console.log('render');
//   return (
//     <>
//       <h1>Window</h1>
//       <h2>{size} PX</h2>
//     </>
//   )
// };

// The above thing can be achieved using this as well
const UseEffectCleanup = () => {

  const [size,setSize] = useState(window.innerWidth);
  const checkSize = () =>{
    setSize(window.innerWidth);
  }

  // before we add a new event listner we clean the prev one
  // useeffect -> render -> cleanup > useeffect
  // before we run the use effect after the render
  // we first run the cleanup functions
  useEffect(() => {
    console.log('useEffect')
    window.addEventListener('resize',checkSize)

  },[]); // event listner will be added only once
  console.log('render');
  return (
    <>
      <h1>Window</h1>
      <h2>{size} PX</h2>
    </>
  )};

export default UseEffectCleanup;
