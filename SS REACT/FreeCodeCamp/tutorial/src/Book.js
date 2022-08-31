import React from 'react'

const Book = (props)=>{
    // console.log(props.book);
    // const{img,title,author} = props.book;
    const{img,title,author} = props;

    // we can access the event as well
    const clickHandler = (e) =>{
        console.log(e);
        alert('hello world');
    }

    const complexExample = (author) =>{
        console.log(author);
    }
    return (
        <article className='book' onMouseOver={()=>{
            console.log(title);
        }}>
            <img src={img} alt="jai"/>
            <h1 onClick={() =>{console.log(title)}}>{title}</h1>
            <h4>{author}</h4>
            <button type="button" onClick={clickHandler}>RefrenceExample</button>
            {/* // if i do complexExample(author) then it will get 
            // invoked as application renders
            // but we don't want this behaviour 
            // we want this to be invoked only after clicking it  
            // so we are using arrow function */}
            <button type="button" onClick={()=> complexExample(author)}>Complex Ex</button>
        </article>
    );
};


// only one default export per file
export default Book