let currentPage = 1;
let currentPagePesquisa = 1
const totalPages= 100;

let campoNumeroPagination = document.querySelector('.campo-numero');
campoNumeroPagination.textContent = 1;



const firstPageButton = document.querySelector('.first');
const prevPageButton = document.querySelector('.prev');
const nextPageButton = document.querySelector('.next');
const lastPageButton = document.querySelector('.last');

firstPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== ''){
        currentPagePesquisa = 1
    }else{
        currentPage = 1;
    }
    updateMovies();
});

prevPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== ''){
        if (currentPagePesquisa > 1){
            currentPagePesquisa--;
        }
    }else{
        if (currentPage > 1) {
            currentPage--;   
        }   
    }
    
    updateMovies();
});

nextPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== ''){
        currentPagePesquisa++;
    }else{
        currentPage++;
    }

    updateMovies();
    
    
});

lastPageButton.addEventListener('click', () => {
    if (inputPesquisa.value !== ''){
        currentPagePesquisa = totalPages;
    }else{
        currentPage = totalPages;

    }
    
    updateMovies();
});

function updateMovies() {
    cleanAllMovies();
    if (inputPesquisa.value !== '') {
        campoNumeroPagination.textContent = currentPagePesquisa;
        searchMovie();
    } else {
        campoNumeroPagination.textContent = currentPage;
        getPopularMovies(currentPage).then(movies => exibirFilmes(movies));
    }
}



