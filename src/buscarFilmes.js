const inputPesquisa = document.getElementById('movie-name');

const iconePesquisa = document.querySelector('.searchIcon')

iconePesquisa.addEventListener('click', searchMovie);

inputPesquisa.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') { 
    searchMovie()
    return
  }
})


async function searchMovie() {
    const filmePesquisado = inputPesquisa.value;
    if (filmePesquisado != '') {
      cleanAllMovies()
      const filmesFiltrados = await searchMovieByName(filmePesquisado);
      criarFilme(filmesFiltrados);
    }else{
      cleanAllMovies();
      const movies =  await getPopularMovies();
      exibirFilmes(movies)
      
    }
  }



async function searchMovieByName(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2f15e111681bd6ea1812059f4a12c9ea&query=${title}&language=en-US&page=1`
    const res = await fetch(url);
    const data = await res.json();
    const movies = data.results
    return movies;
  }

  function cleanAllMovies() {
    movieElement.innerHTML = '';
  }
  