const inputCheckAvaliacao = document.getElementById('avaliacao');

inputCheckAvaliacao.addEventListener('change', ordenarAvaliacao);


async function ordenarAvaliacao() {
    const isChecked = inputCheckAvaliacao.checked;
    const inputPesquisa = document.getElementById('movie-name').value;

    if (isChecked) {
        cleanAllMovies();
        let movies;
        if (inputPesquisa !== '' && !inputCheckFavoritos.checked) {
            movies = await searchMovieByName(inputPesquisa,currentPagePesquisa);
        } else if (inputCheckFavoritos.checked) {
            favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
            movies = updateFavoritosInformation();
        } else {
            movies = await getPopularMovies(currentPage);
        }
        filmesOrdenados = movies.sort((a, b) => b.vote_average - a.vote_average);
        criarFilme(filmesOrdenados);
    } else {
        cleanAllMovies();
        if (inputPesquisa !== '' && !inputCheckFavoritos.checked ) {
            await searchMovie();
        } else if (inputCheckFavoritos.checked) {
            favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
            moviesFavoritosSemOrdem = updateFavoritosInformation();
            criarFilme(moviesFavoritosSemOrdem);
        } else {
            exibirFilmes();
        }
    }
}

