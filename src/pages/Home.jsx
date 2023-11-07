import { useState, useEffect } from 'react'
import { MovieCard } from '../components/MovieCard'

import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getTopRatedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setTopMovies(data.results)
  }

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`
    getTopRatedMovies(topRatedUrl)
  }, [])

  return (
    <div className="container">
      <div className="movies_container">
        {topMovies.length === 0 && <p>Loading please wait...</p>}
        {topMovies.length > 0 && topMovies.map((movie)=>(
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}