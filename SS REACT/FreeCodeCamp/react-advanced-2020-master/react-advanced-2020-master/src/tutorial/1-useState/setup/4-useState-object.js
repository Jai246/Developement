import React, { useState } from 'react';

const UseStateObject = () => {
  const [person,setPerson] = useState(
    {
      name : 'peter',
      age: 14, 
      message:'random message'
    });

    const [name,setName] = useState('peter');
    const [age,setAge] = useState(24);
    const [message,setMessage] = useState('Random message');
    const changeMessage = ()=>{
      // this will change the message but wipe out other data
      // setPerson({message:'Hello World'});

      // so we should use spread operator
      // setPerson({...person,message:'Hello World'});

      setMessage('hello World')
  
    }
  return (
    <>
      {/* <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.message}</h3> */}

      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{message}</h3>

      {/* both has same output */}
      <button className='btn' onClick={changeMessage}> change Message</button>
      {/* <button className='btn' onClick={()=>setMessage('jai')}> change Message</button> */}
    </>
  )
};

export default UseStateObject;
