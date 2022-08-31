// 2:59:00 
import React from "react";
import ReactDom from 'react-dom';
import './index.css';
import {books} from './books';
import Book from './Book'; // default export we can change Book name in import 
// JSX Rules
// return single element
// div / section / srticle / fragment
// use camecase for HTML attribute
// className instead of class
// close every element
// formatting

// function Greeting() {
//     return <h1>Helolo World</h1>
// }

// const Greeting=()=>{
//     return React.createElement('h1',{},"Hello World");
// }

// function Greetings(){
//     return (
//         <div>
//             <h1>Hello World</h1>
//         </div>
//     )
// }

// const Greetings=()=>{
//     return React.createElement('div',
//     {},
//     React.createElement('h1',{},'hello world'));
// }

// function Greetings(){
//     return (
//         <div>
//             <div>
//                 <h3>hello world</h3>
//                 <ul>
//                     <li>
//                         <a href='#'> HELLO JAI BHAMBRI</a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// function Greetings(){
//     return (
//         <React.Fragment>
//             <div>
//                 <h3>hello world</h3>
//                 <ul>
//                     <li>
//                         <a href='#'> HELLO JAI BHAMBRI</a>
//                     </li>
//                 </ul>
//             </div>
//         </React.Fragment>
//     );
// }


// function Greetings(){
//     return (
//         <div>
//             <Person/>
//             <Message/>
//         </div>
//     );
// }


// const Person = () => <h2>john doe</h2>;
// const Message = () => {
//     return <p>  this is my message</p>
// }



// const Book = () =>{
//     return (
//         <article className = 'book'>
//             <Image/>
//             <Title/>
//             <Author/>
//         </article>
//     );
// }




// const firstbook = {
//     img:'https://images-eu.ssl-images-amazon.com/images/I/71MHvaGXFNL._UX300__PJku-sticker-v7,TopRight,0,-50_AC_UL600_SR600,400_.jpg',
//     title: "I love you to the Moon and Back",
//     author: "Amelia Hepworth"
// }
// const secondbook = {
//     img:'https://images-eu.ssl-images-amazon.com/images/I/81beG+MvrmL._UX300__PJku-sticker-v7,TopRight,0,-50_AC_UL600_SR600,400_.jpg',
//     title: "One Indian Girl",
//     author: "Chetan Bhagat"
// }
// const title = "One Indian Girl";
// const author = "Chetan bhagat";
// const img = 'https://images-eu.ssl-images-amazon.com/images/I/81beG+MvrmL._UX300__PJku-sticker-v7,TopRight,0,-50_AC_UL600_SR600,400_.jpg'; 

// function BookList() 
// {
//     return (
//         <section className='booklist'>
//             <Book 
//                 img={firstbook.img} 
//                 title={firstbook.title} 
//                 author={firstbook.author}
//             >
//             {/* // Children prop */}
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore magnam, unde repellendus a perspiciatis aliquid eius rem quisquam ea fuga!</p>
//             </Book>


//             <Book img={secondbook.img} title={secondbook.title} author={secondbook.author}/>
//         </section>
//     );
// }
// props is nothing but an object

// const Book = (props) =>{
//     // console.log(props);
//     return (

//         <article>
//             <img src={props.img} alt="jai"/>
//             <h1>{props.title}</h1>
//             <h4>{props.author}</h4>
//             <p>{props.job}</p>
//             <p>{props.title}</p>
//             <p>{props.number}</p>
//         </article>
//     )
// }


// const Book = (props) =>{
//     // console.log(props);
//     const{img,title,author} = props;
//     return (

//         <article>
//             <img src={img} alt="jai"/>
//             <h1>{title}</h1>
//             <h4>{author}</h4>
//             {props.children}
//         </article>
//     )
// }

// const Book = ({img,title,author,children}) =>{
//     return (

//         <article>
//             <img src={img} alt="jai"/>
//             <h1>{title}</h1>
//             <h4>{author}</h4>
//             {children}
//             {/* // Children prop  */}
//         </article>
//     )
// }


// Inline CSS priority >>>>> imported file CSS

// const Title = () => <h1>I love you to the Moon and Back</h1>
// const Author = () => <h4 style={{color:'#617d98',fontSize:'0.75rem',marginTop:'0.25rem'}}>Amelia </h4>
// const Image = () => <img src='https://images-eu.ssl-images-amazon.com/images/I/71MHvaGXFNL._UX300__PJku-sticker-v7,TopRight,0,-50_AC_UL600_SR600,400_.jpg' alt="jai"/>

// ReactDom.render(<BookList/>,document.getElementById('root'));

// ReactDom.render(<Greetings />,document.getElementById('root'));




// const names = ['john','pater','susan'];

// // React can't render array of objects or simple objects

// const newNames = names.map((name)=>{
//     return <h1>{name}</h1>
// });

// // console.log(newNames);

// function BookList() {
//     return <section className="booklist">{newNames}</section>
// }




// With props
function BookList() {
    return(
        <section className='booklist'>
            {
                books.map((book,index)=>
                {
                    // return <Book key={book.id}  book={book}></Book>
                    // Copying it directly as props no into a new variable
                    return <Book key={book.id}  {...book}></Book>
                })
            }
        </section>
    )
};



ReactDom.render(<BookList/>,document.getElementById('root'));




