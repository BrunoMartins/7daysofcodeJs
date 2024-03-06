function favoriteButtonPressed(event, movie) {
    const favoriteState = {
      favorited: 'images/heart-fill.svg',
      notFavorited: 'images/heart.svg'
    }
  
    if(event.target.src.includes(favoriteState.notFavorited)) {
      // aqui ele será favoritado
      event.target.src = favoriteState.favorited
      saveToLocalStorage(movie)
    } else {
      // aqui ele será desfavoritado
      event.target.src = favoriteState.notFavorited
      removeFromLocalStorage(movie.id)
    }
  }

  function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies'))
  }

  function saveToLocalStorage(movie) {
    const movies = getFavoriteMovies() || [];
    movies.push(movie);
    const moviesJSON = JSON.stringify(movies);
    localStorage.setItem('favoriteMovies', moviesJSON);
  }

  function checkMovieIsFavorited(id) {
    const movies = getFavoriteMovies() || []
    return movies.find(movie => movie.id == id)
  }

  function removeFromLocalStorage(id) {
    const movies = getFavoriteMovies() || []
    const findMovie = movies.find(movie => movie.id == id)
    const newMovies = movies.filter(movie => movie.id != findMovie.id)
    localStorage.setItem('favoriteMovies', JSON.stringify(newMovies))
  }

  const botaoFavorito = document.querySelectorAll('.filmes__favoritos-botao');

botaoFavorito.forEach(btn => btn.addEventListener('click', (event) => favoriteButtonPressed(event, movie)));

  