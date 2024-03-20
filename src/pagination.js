let currentPage = 1;
let currentPagePesquisa = 1
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

lastPageButton.addEventListener('click', async () => {
    if (inputPesquisa.value !== '' && !inputCheckFavoritos.checked){
        currentPagePesquisa = await ultimaPaginaFilmesPesquisados ();
    }else if (inputCheckFavoritos.checked){
        const favoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];
        let totalPaginas = Math.ceil(favoritos.length / favotirosPorPagina);
        currentpageFavoritos = totalPaginas;
    }
    else{
        currentPage = await ultimaPaginaFilmesGeral ();

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

async function ultimaPaginaFilmesPesquisados (){
    const title = inputPesquisa.value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2f15e111681bd6ea1812059f4a12c9ea&query=${title}&language=en-US`;
  const res = await fetch(url);
  const data = await res.json();
  let ultimaPaginaPesquisados = data.total_pages;
return ultimaPaginaPesquisados;
}

async function ultimaPaginaFilmesGeral (){
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=2f15e111681bd6ea1812059f4a12c9ea&language=en-US`;
  const res = await fetch(url);
  const data = await res.json();
  let ultimaPaginaGeral = data.total_pages;
return ultimaPaginaGeral;
}
