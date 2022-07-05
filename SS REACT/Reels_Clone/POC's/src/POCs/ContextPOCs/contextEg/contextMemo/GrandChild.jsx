import React,{useState,useContext} from 'react'
import {Context} from "./ContextNormal.jsx";
function GrandChild() {
    let message = React.useContext(Context);
    console.log("GrandChild rendered");
    return(
        <>
            <div>---------------------</div>
            <div>GrandChild</div>
            <div>I am a grandchild</div>
            <div>God sent this {message}</div>
        </>
    )
}

export default GrandChild