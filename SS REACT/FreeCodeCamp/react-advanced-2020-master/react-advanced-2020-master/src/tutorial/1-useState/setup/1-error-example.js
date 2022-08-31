import React from 'react';


// this way title is not gonna change
// on console it's gonna change 
// but in the website it's not gonna change
const ErrorExample = () => 
{
  let title = 'random title';
  // const handleClick = ()=>{
  //   title = 'hello people';
  //   console.log(title);
  // }

  

  return (
    <React.Fragment>
      <button type='button' className='btn' onClick={handleClick}> change title </button>
      <h2>{title}</h2>
    </React.Fragment>  
  )
};

export default ErrorExample;
