import React, { useState, useEffect } from 'react';
const url = 'https://api.github.com/users/QuincyLarson';


const MultipleReturns = () => {
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);
  const [user,setUser] = useState('default user');


  // the problem with fetch is than it only identifies the network error
  // it won't be able to catch 404 error
  useEffect(() => {
    fetch(url)
      .then((resp)=> {
        if(resp.status >= 200 & resp.status <= 299)
        {
          return resp.json();
        }
        else
        {
          setIsLoading(false);
          setIsError(true);
          throw new Error(resp.statusText);
        }
      })
      .then((user)=> {
        const {login} = user;
        setUser(login);
        setIsLoading(false);
        
      })
      .catch(error => console.log(error))
  },[])

  if(isLoading)
  {
    return <div>
      <h1>Loading...</h1>
    </div>
  }
  if(isError)
  {
     return <div>
      <h1>Error...</h1>
    </div>
  }
  return <div>
      <h1>{user}</h1>
    </div>
};

export default MultipleReturns;



