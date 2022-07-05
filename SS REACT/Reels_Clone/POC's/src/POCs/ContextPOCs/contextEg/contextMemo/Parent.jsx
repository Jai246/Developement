import React from 'react'
import Children from './Children';

function Parent() {
    console.log("Parent Rendered"); 
    return(
        <>
            <div>Parent</div>
            <Children></Children>
        </>
    )
}

export default React.memo(Parent);