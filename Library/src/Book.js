import React from 'react';

//Now we add some default props if we dont have data for some elements provided
export const Book = ({title = "No Author provided", author = "No Author", pages = 0, freeBookmark}) =>
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