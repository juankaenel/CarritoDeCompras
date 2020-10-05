//--------------------- Variables ---------------------

const carrito = document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = [];

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

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);  //si algun elemento es igual al existente no agregamos sino actualizamos la cantidad 
    
    if(existe){ //si existe
        //Actualizamos cantidad
        const cursos = articulosCarrito.map(curso => { //creo un nuevo arreglo 
            if(curso.id === infoCurso.id){ //si el curso que queremos agregar tiene el mismo id que está en el carrito -> debido a que es un nuevo arreglo debo volver a comprobar si existe el mismo curso
                curso.cantidad ++;
                return curso; //retorna el objeto actualizado
            }
            else{
                return curso; //retorna el objeto que no son duplicados
            }
        })
        articulosCarrito = [...cursos] //cursos es el nuevo arreglo creado con map entonces lo copio a articulos carrito
    }
    else{
        //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; //hacemos una copia del carrito anterior asi no se van los articulos agregados anteriormente
    }

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el html
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
        //realizamos un destructuring así no estamos escribiendo curso.titulo sino titulo solo
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Eliminar los cursos del tbody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //forma óptima
    while(contenedorCarrito.firstChild){ //si el contenedor del carrito tiene un hijo, se ejecuta
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); //se va a eliminar el primer hijo del contenedor carrito
    }
}