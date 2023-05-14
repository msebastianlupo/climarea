'use strict'

const elementos = [
    "",
    "",
    "temperatura",
    "termica",
    "minima",
    "maxima",
    "humedad",
    "presion",
    "viento",
    "descripcion"
];
let main = document.querySelector("main");
let info = document.querySelector("#info");
let inputCiudad = document.querySelector("#input-ciudad");
let btnCiudad = document.querySelector("#btn-ciudad");
let datosLocal = localStorage.getItem("datos");
const modal = new Modal("Información");

info.addEventListener("click", () =>{
    modal.mostrarInfo("Climarea", "Una app más de clima\n© Matías Godoy. v23.05.14");
});

btnCiudad.addEventListener("click", (e) => {    
    //la búsqueda por estado solo está presente para Estados Unidos
    if(inputCiudad.value.length > 2 && (inputCiudad.value.match(/,/g) ?? []).length < 3){
        modal.mostrarCarga();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&appid=06a7045dc2ac34881406850c24a7ce12&lang=sp&units=metric`)
        .then(resp => {
           return resp.json();
        })
        .then(json => {
            modal.quitarModal();
            if(json.name){
                const datos = new Datos(json);
                datos.setearTags(elementos, "img-clima-icono", "iframe-mapa", "AIzaSyAIB0EP17T743hCNhKMD_KJq0yS7iQdV1M");
                inputCiudad.value = `${json.name}, ${json.sys.country}`;
                main.className = "visible";
                inputCiudad.classList.remove("error");
            }else{
                console.warn("No se encuentra esa ciudad");
                modal.mostrarInfo("Error en localización", "No se encontró la ciudad.");
                inputCiudad.classList.add("error");
                main.classList.remove("visible");
            }
        })
        .catch(err => {
            console.error("Error: " + err);
            modal.quitarModal();
            modal.mostrarInfo("Error de localización", "No se encontró la ciudad.");
            main.classList.remove("visible");
        })        

    }else{
        console.warn("Debés colocar los datos de la siguiente manera: ciudad, estado, país.");
        modal.mostrarInfo("Datos erróneos", "Debés colocar los datos de la siguiente manera: ciudad, estado, país.");
        inputCiudad.classList.add("error");
        main.classList.remove("visible");
    }
})

if(datosLocal) {
    let parse = JSON.parse(datosLocal); 
    const datos = new Datos(parse, false);
    datos.setearTags(elementos, "img-clima-icono", "iframe-mapa", "AIzaSyAIB0EP17T743hCNhKMD_KJq0yS7iQdV1M");
    inputCiudad.value = `${parse.ciudad}, ${parse.pais}`;
    main.className = "visible";
}