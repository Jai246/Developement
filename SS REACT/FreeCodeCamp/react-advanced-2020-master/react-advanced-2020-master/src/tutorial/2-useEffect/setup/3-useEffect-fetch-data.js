import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users';

// we can't make useeffect Async Await
// use effect can't return Promise
// it only looks for cleanup function


const UseEffectFetchData = () => {
  const [users,setUsers] = useState([]);

  const getUsers = async () =>{
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    // we can't simpley go wirh the above piece of code because
    // useEffect runs after every re-render so with the above line we
    // will go into an infinite loop and our browser will crash
    // console.log(users);
  }

  // gointo infinite loop
  // useEffect(()=>{
  //   getUsers();
  // })

  useEffect(()=>{
    getUsers();
  },[]);

  return (
    
    <>
      <h2>fetch data</h2>
      <ul className="users">
        {users.map((user)=>{
          const {id,login,avatar_url,html_url} = user;
          return <li key={id}>
            <img src={avatar_url} alt={login}/>
            <div>
              <h4>{login}</h4>
              <a href={html_url}>profile</a>
            </div>
          </li>
        })}
      </ul>
    </>
  )
};

export default UseEffectFetchData;
