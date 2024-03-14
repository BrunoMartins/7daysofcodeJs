let movies = [];



async function getPopularMovies(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=2f15e111681bd6ea1812059f4a12c9ea&language=en-US&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  movies = data.results;
  return movies;
  
  
} 

async function exibirFilmes() {
  const popularMovies = await getPopularMovies(currentPage);
  criarFilme(popularMovies);
}

exibirFilmes();


