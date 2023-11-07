import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

import { MovieCard } from '../components/MovieCard'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MoviesGrid.css'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [movies, setMovies] = useState([])

  const getSearchedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    // setMovies(data.results)
  }

  useEffect(() => {
    // const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`
    // getSearchedMovies(searchWithQueryURL)
    search();
  }, [])

  const search = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=YOUR_OMDB_API_KEY`);
      if (response.data.Search) {
        setMovies(response.data.Search);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="container">
      <h2 className="title">Results for: <span className="query_text">{query}</span></h2>
      <div className="movies_container">
        {movies.length === 0 && <p>Loading...</p>}
        {movies.length > 0 && movies.map((movie)=>(
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}