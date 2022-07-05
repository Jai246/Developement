import React from 'react'
import GrandChild from './GrandChild'
function Children() {
    console.log("Children Rendered"); 
    return(
        <>
            <div>Children</div>
            <GrandChild></GrandChild>
        </>
    )
}

export default Children;