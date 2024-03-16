let currentPage = 1;
let currentPagePesquisa = 1
const totalPages= 100;
let currentpageFavoritos = 1;

let campoNumeroPagination = document.querySelector('.campo-numero');
campoNumeroPagination.textContent = 1;



const firstPageButton = document.querySelector('.first');
const prevPageButton = document.querySelector('.prev');
const nextPageButton = document.querySelector('.next');
const lastPageButton = document.querySelector('.last');

firstPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== '' && !inputCheckFavoritos.checked){
        currentPagePesquisa = 1;
    }else if (inputCheckFavoritos.checked){
        currentpageFavoritos = 1;
    }else{
        currentPage = 1;
    }
    updateMovies();
});

prevPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== '' && !inputCheckFavoritos.checked){
        if (currentPagePesquisa > 1){
            currentPagePesquisa--;
        }
    }else if (inputCheckFavoritos.checked){
        if (currentpageFavoritos > 1){
            currentpageFavoritos--;
        }
    }else{
        if (currentPage > 1) {
            currentPage--;   
        }   
    }
    
    updateMovies();
});

nextPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== '' && !inputCheckFavoritos.checked){
        currentPagePesquisa++;
    }else if (inputCheckFavoritos.checked){
        currentpageFavoritos++;
        verificaUltimaPaginaFavorito();
    }else{
        currentPage++;
    }

    updateMovies();
    
    
});

lastPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== '' && !inputCheckFavoritos.checked){
        currentPagePesquisa = totalPages;
    }else if (inputCheckFavoritos.checked){
        const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
        let totalPaginas = Math.ceil(favoritos.length / favotirosPorPagina);
        currentpageFavoritos = totalPaginas;
    }
    else{
        currentPage = totalPages;

    }
    
    updateMovies();
});

async function updateMovies() {
    cleanAllMovies();
    if (inputPesquisa.value !== '' && !inputCheckFavoritos.checked) {
        campoNumeroPagination.textContent = currentPagePesquisa;
        await searchMovie();
    } else if (inputCheckFavoritos.checked) {
        campoNumeroPagination.textContent = currentpageFavoritos;
        await updateFavoritos();
    }else {
        campoNumeroPagination.textContent = currentPage;
        await getPopularMovies(currentPage).then(movies => exibirFilmes(movies));
    }

    if(inputCheckAvaliacao.checked){
        await ordenarAvaliacao();
    }
    
    
}



