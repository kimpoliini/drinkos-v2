import React, { FC, useState } from 'react'
import './search.css'
import { ReactImageTint } from 'react-image-tint';

const Search: FC = () => {
  return (
    <div className='search-bar'>
      <input placeholder='Search drinks...' />
      <div
        onClick={() => { console.log("search") }}>

        <ReactImageTint src={require('../assets/icons/search.png')} color="#a8b0c0" />
      </div>
    </div>
  )
}

export default Search