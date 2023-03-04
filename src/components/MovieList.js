import React, { useState } from 'react'
import './index.css'

const MovieList = () => {
  const [year, setYear] = useState()
  const [movies, setMovies] = useState([])
  const [noResult, setNoResult] = useState(true)

  const handleClick = () => {
    let url = `https://jsonmock.hackerrank.com/api/movies?Year=${year}`
    fetch(url)
      .then(response => response.json())
      .then(resp => {
        if (resp.data.length > 0) {
          setMovies(resp.data)
          setNoResult(false)
        } else {
          setNoResult(true)
          setMovies([])
        }
      })
      .catch(error => setNoResult(true))
  }

  return (
    <div className='layout-column align-items-center mt-50'>
      <section className='layout-row align-items-center justify-content-center'>
        <input
          onChange={e => setYear(e.target.value)}
          type='number'
          className='large'
          placeholder='Enter Year eg 2015'
          data-testid='app-input'
        />
        <button
          onClick={() => handleClick()}
          className=''
          data-testid='submit-button'
        >
          Search
        </button>
      </section>
      {movies.length > 0 ? <p data-testid='app-title'>Movie List</p> : ''}
      <ul className='mt-50 styled' data-testid='movieList'>
        {movies.map(m => {
          return (
            <li key={m.imdbID} className='slide-up-fade-in py-10'>
              {m['Title']}
            </li>
          )
        })}
      </ul>

      {noResult ? (
        <div className='mt-50 slide-up-fade-in' data-testid='no-result'>
          No Results Found
        </div>
      ) : (
        ''
      )} 
    </div>
  )
}
export default MovieList
