import React, { Component, useState, useEffect } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

function App() {

  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzAxNDA3ZWIwMmYxNTU0ZTZhMzkwZjEwODE4NmM3OSIsIm5iZiI6MTc1MDk3MTkyMC4zMzEsInN1YiI6IjY4NWRiNjEwMjMzNGJmOGM2MDdiM2Y0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g5nEoDfYoGO7cllR4gjp3DrCkNo52CkcJoza6xOSRt4';

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const API_BASE_URL = 'https://api.themoviedb.org/3'


  const [searchTerm, setSearchTerm] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(()=> setDebouncedSearchTerm(searchTerm),500, [searchTerm])

  const fetchMovies = async (query='') => {
    setLoading(true);
    const endpoint = query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
    const response = await fetch(endpoint, API_OPTIONS);

    const data = await response.json();

    setMoviesList(data.results || []);
    setLoading(false);
    console.log(data.results, moviesList)
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])


  return (
    <main>
      <div className='pattern'>

        <div className='wrapper'>
          <header>
            <img src="./hero-img.png" alt="Hero" />
            <h1>Sriman's <span className='text-gradient'>OTT Platform</span></h1>
               <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='all-movies'>
            <h2 className='mt-[40px]'>All Movies</h2>
          {loading ? (<p className='text-white'> Loading...</p>):
          (
          <ul>
            {moviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
            ))}
            </ul>)}


          </section>
        </div>

      </div>
    </main>
  );
}

export default App;  