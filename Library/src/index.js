import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import Library from './Library';

let bookList = [
{"title": "Just one look", "pages": 275},
{"title": "The Sun Also Rises", "author":"Ernest Hemingway", "pages": 260},
{"title": "Stay Close", "author":"Harlan Coben", "pages": 194},
]

render(
  <Library books = {bookList}/>,
  
  document.getElementById('root')
);
