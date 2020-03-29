import React from 'react';
import {render} from 'react-dom';

let bookList = [
{"title": "Just one look", "author":"Harlan Coben", "pages": 275},
{"title": "The Sun Also Rises", "author":"Ernest Hemingway", "pages": 260},
{"title": "Stay Close", "author":"Harlan Coben", "pages": 194},
]

const Book = ({title, author, pages, freeBookmark}) =>
{
  return(
    <section>
      <h2>{title}</h2>
      <p>written by: {author}</p>
      <p>Pages: {pages} pages.</p>
      <p>Free Bookmark Today?: {freeBookmark ? 'yes':'no'}</p>
    </section>
  )
}

const Hiring = () =>
<div>The library is hiring. Go to www.library.com/jobs for more.</div>

const notHiring = () =>
<div>The library is not hiring. Follow our page at www.library.com to stay current.</div>

class Library extends React.Component{

  state = {
    open: true, 
  freeBookmark: true
}
  
  toggleOpenClosed = () =>
  {
    this.setState(prevState=>({
      open: !prevState.open
    }))
  }
  render(){
    const { books } = this.props

  return(
    <div>
      {this.state.hiring? <Hiring /> : <NotHiring />}
      <h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
      <button onClick = {this.toggleOpenClosed}>Change</button>
     {books.map(
       (book, i) => 
       <Book 
       key = {i}
       title = {book.title} 
       author = {book.author} 
       pages = {book.pages}
       freeBookmark = {this.state.freeBookmark}
       />
     )}
    </div>
  )
}}

render(
  <Library books = {bookList}/>,
  document.getElementById('root')
);
