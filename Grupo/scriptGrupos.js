let datosTabla = document.querySelector('#datos');
let formulario = document.getElementById('formulario');
let nombrePagina = document.title;
let nombreModuloListar = 'Lista Grupos';
let nombreModuloCrear = 'Crear Grupo';


let url= "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaGrupo.php";
let insertar = "InsertarGrupo.php";



//spinner de carga de los datos//
let spinner= ` <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div> `




/////  EVENTOS  //////
if (nombrePagina == nombreModuloCrear) {

    formulario.addEventListener('submit', 
    function (e){
        e.preventDefault();

        let datos = new FormData(formulario);

        let datosEnviar = {
            nombre: datos.get('nombre'),
            
        }

            fetch(url + insertar, 
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                }
            )


            .then (respuesta => respuesta.json())
            .then ( (datosrespuesta) =>{
            //console.log(datosrespuesta)
            mensajeInsertar(datosrespuesta)
        })
           .catch(console.log)

           console.log(datosEnviar);
        //console.log(datos.get('correoelectronico'));
        //alert('1');
    })
}





///  FUNCIONES Y METODOS ////
function mensajeInsertar(datos){
    if (datos.code == 200) {
        alert("Ingreso exitoso");
    } 
    else 
    {
        alert("El correo ya fue utilizado");
    }
}


function cargarDatos(){
    loadspinner();
    fetch(url + listar)
    .then (respuesta => respuesta.json())
    .then ( (datosrespuesta) =>{
        //console.log(datosrespuesta)
        mostrarDatos(datosrespuesta)
    })
    .catch(console.log)
}

function mostrarDatos(datos){
    //console.log(datos)
   
    if (datos.code == 200) {

       for(const iterator of datos.data){

        datosTabla.innerHTML += `

        <tr class= "">
            <td>
            <a
            name=""
            id=""
            class="btn btn-success"
            onclick="editar('${encodeURIComponent(JSON.stringify(iterator))}')"
            role="button"
            ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg></a
        >                    
        
        <a
            name=""
            id=""
            class="btn btn-danger"                        
            role="button"
            onclick="eliminar('${iterator.id}')"
            ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg></a
        >
            
            
            </td>
            <td>${iterator.nombre}</td> `
       }
       

    } else {
        alert("algo salio mal");
        
    }

    document.getElementById("spinnerload").innerHTML = "";

}

function loadspinner(){

    document.getElementById("spinnerload").innerHTML = spinner;

}




///SECCION DE EJECUCIOND DE LOS DATOS/////
if (nombrePagina == nombreModuloListar) {
    cargarDatos();
}