const inputPesquisa = document.getElementById('movie-name');

const iconePesquisa = document.querySelector('.searchIcon')

iconePesquisa.addEventListener('click', () => {
  currentPagePesquisa = 1;
  searchMovie();
});

inputPesquisa.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') { 
    currentPagePesquisa=1;
    searchMovie()
    return
  }
})


async function searchMovie() {
    const filmePesquisado = inputPesquisa.value;
    if (filmePesquisado != '') {
      cleanAllMovies()
      campoNumeroPagination.textContent = currentPagePesquisa;
      const filmesFiltrados = await searchMovieByName(filmePesquisado,currentPagePesquisa);
      criarFilme(filmesFiltrados);
    }else{
      cleanAllMovies();
      campoNumeroPagination.textContent = currentPage;
      const movies =  await getPopularMovies(currentPage);
      criarFilme(movies);
      
    }
  }



async function searchMovieByName(title,page) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2f15e111681bd6ea1812059f4a12c9ea&query=${title}&language=en-US&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    const movies = data.results
    return movies;
  }

  function cleanAllMovies() {
    movieElement.innerHTML = '';
  }
  