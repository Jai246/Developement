import React, { useEffect, useRef } from 'react';


// it works a lot like useEffect
// it also saves vallue bw two renders just like use state
// preserves value

// DOES NOT trigger re-render
// target DOM nodes/elements


// here we are not setting up any controlled input ie we don't have any state values
// which reflects the value in the output
// we also don't call onchange each and every time we type something
const UseRefBasics = () => {
  const refContainer = useRef(null);
  const divContainer = useRef(null);
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(refContainer);
    console.log(divContainer.current);
    // console.log(refContainer.current.value);
  }

  // useref doesn't trigger rerender
  // so there is no need of passing [] as dependency list..
  useEffect(() => {
    console.log(refContainer.current);
    refContainer.current.focus();
  })

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <input type='text' ref={refContainer}/>
          <button type='submit'> Submit</button>
        </div>
      </form>
      <div ref={divContainer}> Hello</div>
    </>
    
  )
};

export default UseRefBasics;
