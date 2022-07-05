import React,{useState,useContext} from 'react'
import Parent from './Parent'
export let Context = React.createContext("Hello");
export default function ContextNormal() {
    const[message,setMessage] = React.useState("fake Message");
    const changeMessage=()=>{
        setMessage("Message Updated");
    }
    console.log("rendered context normal");
  return (
    <>
        <div>contextNormal</div>
        <button onClick={changeMessage}>
            ClickButton
        </button>
        <Context.Provider value={message}>
            <Parent></Parent>
        </Context.Provider>
    </>
  )
}

// export default Contex

// Without Memoization
// Outpyut on console
// Parent and children also getting rerendered but only rendering og GrandChild was required
// So we use memo to stop unwanted renders

// rendered context normal
// ContextNormal.jsx:23 Parent Rendered
// ContextNormal.jsx:32 Children Rendered
// ContextNormal.jsx:42 GrandChild rendered
// ContextNormal.jsx:8 rendered context normal
// ContextNormal.jsx:23 Parent Rendered
// ContextNormal.jsx:32 Children Rendered
// ContextNormal.jsx:42 GrandChild rendered



// After Memoization

// rendered context normal
// Parent.jsx:5 Parent Rendered
// Children.jsx:4 Children Rendered
// GrandChild.jsx:5 GrandChild rendered
// The deferred DOM Node could not be resolved to a valid node.
// ContextNormal.jsx:9 rendered context normal
// GrandChild.jsx:5 GrandChild rendered

// Note that memoization can be done on once on (Parent)
// and not on all components in row







