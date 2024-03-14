// Função para verificar se um filme é favorito
function isFilmeFavorito(movieId) {
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    return favoritos.some(movie => movie.id === movieId);
}

// Função para adicionar um filme aos favoritos
function adicionarFilmeFavorito(movie) {
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    favoritos.push(movie);
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
}

// Função para remover um filme dos favoritos
function removerFilmeFavorito(movie) {
    let favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    favoritos = favoritos.filter(favMovie => favMovie.id !== movie.id);
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
}

const inputCheckFavoritos = document.getElementById('favoritos');

inputCheckFavoritos.addEventListener('change', verificarCheckbox);

async function verificarCheckbox() {
    const inputPesquisa = document.getElementById('movie-name').value;
    const isChecked = inputCheckFavoritos.checked;
    if (isChecked) {
        cleanAllMovies();
        ocultaPagination();
        const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
        criarFilme(favoritos);
    } else if (inputPesquisa !== ''){
        cleanAllMovies();
        exibePagination();
        moviesPesquisados = await searchMovieByName(inputPesquisa,currentPagePesquisa); 
            criarFilme(moviesPesquisados);
            
    } else {
        cleanAllMovies();
        exibePagination();
        exibirFilmes();
    }
    
}

function ocultaPagination (){
    firstPageButton.style.display = 'none';
        prevPageButton.style.display = 'none';
        nextPageButton.style.display = 'none';
        lastPageButton.style.display = 'none';
        campoNumeroPagination.style.display = 'none';

}

function exibePagination(){
    firstPageButton.style.display = 'flex';
        prevPageButton.style.display = 'flex';
        nextPageButton.style.display = 'flex';
        lastPageButton.style.display = 'flex';
        campoNumeroPagination.style.display = 'flex';

}


    