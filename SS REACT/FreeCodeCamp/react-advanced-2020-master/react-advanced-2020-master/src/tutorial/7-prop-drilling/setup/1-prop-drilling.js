import React, { useState } from 'react';
import {data} from '../../../data';
// more components
// fix - context api, redux (for more complex cases)

const PropDrilling = () => {


  const[people,setPeople] = useState(data);
  const removePerson = (id)=>{
    setPeople((people)=>{
      return people.filter((person)=>id!=person.id);
    });
  }

  return <section>
    <h3>prop drilling</h3>
    <List people={people} removePerson={removePerson}/>
  </section>
};

// List Component DoesNot need the remove component
// but atleast for now there is no ither way
// So if we have more components under it then it would be a hectic to keep this
// passing props again and agaiin

// so we should avoide this using context Api

const List = ({people,removePerson})=>{
  return <>
  {people.map((person)=>{
    return <SinglePerson key={person.id} {...person} removePerson={removePerson}/>
  })}
  </>
}

const SinglePerson = ({id,name,removePerson})=>{
  return (
  <div className='item'>
    <h4>{name}</h4>
    <button onclick={()=> removePerson(id)}>Remove</button>
  </div>
  )
}

export default PropDrilling;




