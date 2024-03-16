const favotirosPorPagina = 20;
let paginaAtualFavoritos;
    let start;
    let end ;


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
        currentpageFavoritos=1;
        campoNumeroPagination.textContent = currentpageFavoritos;
        await updateFavoritos();
    } else if (inputPesquisa !== ''){
        cleanAllMovies();
        campoNumeroPagination.textContent = currentPagePesquisa;
        await searchMovie();         
    } else {
        cleanAllMovies();
        campoNumeroPagination.textContent = currentPage;
        exibirFilmes();
        
    }
    
    

    
    
}



function verificaUltimaPaginaFavorito (){
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    let totalPaginas = Math.ceil(favoritos.length / favotirosPorPagina);
    const lastPage = currentpageFavoritos > totalPaginas
    if(lastPage){
        currentpageFavoritos--
        campoNumeroPagination.textContent = currentpageFavoritos;
    }

}

async function updateFavoritos (){
    let parametroPagination = updateFavoritosInformation();
    criarFilme(parametroPagination);
    window.scrollTo(0, 0);
}

function updateFavoritosInformation (){
    const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
    let paginaAtualFavoritos = currentpageFavoritos -1;
    let start = paginaAtualFavoritos * favotirosPorPagina;
    let end = start + favotirosPorPagina;
    let favoritosPagination = favoritos.slice(start,end);
    return favoritosPagination;

}


    