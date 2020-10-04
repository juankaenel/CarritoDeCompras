//--------------------- Variables ---------------------

const carrito = document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); 


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregando al carrito"
    listaCursos.addEventListener('click',agregarCurso);

}

//--------------------- Funciones ---------------------
function agregarCurso(e){
    e.preventDefault();
    //Event bubbling
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement; //accedo al div que lo contiene haciendo traversing, el padre del padre del elemento  
        leerDatosCurso(cursoSeleccionado);
    }
}

//lee el contenido del Html al que le dimos click y extrae información del curso
function leerDatosCurso(curso){
    //console.log(curso);
    //Crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }
    console.log(infoCurso);

}