import React from 'react';
import {Book} from './Book.js';
import {Hiring} from './Hiring.js';
import {notHiring} from './NotHiring.js';
import PropTypes from 'prop-types';

export class Library extends React.Component{

    state = {
      open: true, 
      freeBookmark: false,
      hiring: true,
      data: [],
      loading: false
  }
  
  componentDidMount() // build in function
  {
    this.setState({loading: true})
    fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1') // catching data from api
    .then(data => data.json()) // changing to json format
    .then(data => this.setState({data, loading: false})) // data 'updated' in state ( line 30 ) and the state 'loading' is changed to true as well
  }
  
  componentDidUpdate() // build in function as well (doesnt change anything in our app, just an example how the life-cycle in react works)
  {
    console.log("The component just updated")
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
        {this.state.hiring? <Hiring /> : <notHiring />}
        {this.state.loading ? "loading..." : <div>
          {this.state.data.map(product => { //mapping over api data (table)
            return(
              <div key = {product.id}> 
                <h3>Library Products of the week!</h3>
                <h4>{product.name}</h4>
                <img src = {product.image} alt = {product.name} height = {100}/> 
              </div>
              //1. key is relevant feature, that needs an unique id (for more information check my repository "Javascript-step-by-step", part 2. "newobj_ES6" ) 
              //2. alt if anything went wrong with the image.
            )
          })}
          </div>
          }
  
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
  
  Library.propTypes = {
    books: PropTypes.array // propTypes allows us to set a strictly required type of object to be provided. (useful for debugging)
  }
  
  Book.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    pages: PropTypes.number,
    freeBookmark: PropTypes.bool
  }
  
  export default Library