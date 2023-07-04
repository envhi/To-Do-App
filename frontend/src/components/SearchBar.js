import React from 'react'
import './SearchBar.css'

const SearchBar = ({search, setSearch}) => {
  return (
    <div className='searchbar-container'>
        <h2>Search task</h2>
        <input type='text' value={search} onChange={event => setSearch(event.target.value)} placeholder='Type the task you want to find'/>
    </div>
  )
}

export default SearchBar