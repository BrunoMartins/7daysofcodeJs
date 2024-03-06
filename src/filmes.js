let movies = [];
const url = `https://api.themoviedb.org/3/movie/popular?api_key=2f15e111681bd6ea1812059f4a12c9ea&language=en-US&page=1`;


async function getPopularMovies() {
  const res = await fetch(url);
  const data = await res.json();
  movies = data.results;
  criarFilme(movies);
  
} 
getPopularMovies();


