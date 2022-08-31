// 6:50:20
import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {


  const [firstName,setFirstName] = useState('');
  const [email,setEmail] = useState('');

  const [people,setPeople] = useState([]);



  // we are not able to see hello world on the screen because
  // by default the prowser will try to submit the data and automatically
  // reset the page
  const handelSubmit = (e) => {
    e.preventDefault();
    // by adding this we will be able to see 'hello'.
    // because now we are not refreshing the page
    console.log('hello');
    console.log(firstName,email);

    if(firstName && email) {
      const person = {
        id : new Date().getTime().toString(),
        firstName: firstName,
        email: email
      }

      setPeople((people)=>{
        return [...people,person];
      });

      setFirstName('');
      setEmail('');

    } else {
      console.log('empty values');
    }
  };

  return (
    // note that in forms we can either put handle submit on the form
    // or we can also put that on button both will work
    <article>
      <form className='form' >
          <div className='form-control'>
            <label htmlFor='firstName'>Name : </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={firstName}
              onChange={(e)=>{
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email : </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />
          </div>
          <button type='submit' onClick={handelSubmit}>add person</button>
        </form>

        {
          people.map((person,index)=>{
            const {id,firstName,email} = person;
            return <div className='item' key = {id}>
              <h4>{firstName}</h4>
              <p>{email}</p>
            </div>
          })
        }
    </article>
  )
};

export default ControlledInputs;
