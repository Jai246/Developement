import React, { useState, useEffect } from 'react';


// We earlier solved the problem for Many event Listners
// but Here we have Hide and Unhide as well
// so every time we unhide , a new evenet listner is added
// we need to save that by the cleanup function 
const ShowHide = () => {

  const [show , setShow] = useState(false);
  return (
  <>
    <button className='btn' onClick={()=> setShow(!show)}>
      show/hide
    </button>
    {show && <Item/>}
  </>
  );
};

const Item = () => {

  const [size,setSize] = useState(window.innerWidth);
  const checkSize = ()=>{
    setSize(window.innerWidth);
  }
  useEffect(()=>{
    window.addEventListener('resize', checkSize);
    return ()=>{
      window.removeEventListener('resize', checkSize);
    }
  },[]);
  return <div style={{marginTop:'2rem'}}>
    <h1>Window</h1>
    <h2>Size : {size} PX</h2>
  </div>
}


export default ShowHide;
