'use strict'

/**
 * trabaja con los json de openweathermap.org
 */
class Datos {
    /**
     * @param {object} json obtenido de openweathermap.org
     * @param {boolean} false si el json fue modificado previamente (guardado)
     */
    constructor(json, crudo = true) {
        this.json = json;
        this.crudo = crudo;
    }

    /**
     * manipula el json para una mejor representación gráfica
     * @returns {object} el resultado de esa mejora
     */
    mejorarJson() {
        if(this.crudo) {
        let jsonAdaptado = {
            ciudad: this.json.name,
            pais: this.json.sys.country,
            temperatura: this.json.main.temp.toFixed(1) + "°",
            termica: this.json.main.feels_like.toFixed(1) + "°",
            minima: `⇣ ${this.json.main.temp_min.toFixed(1)}°`,
            maxima: `⇡ ${this.json.main.temp_max.toFixed(1)}°`,
            humedad: this.json.main.humidity + "%",
            presion: this.json.main.pressure + "hPa",
            viento: parseInt(this.json.wind.speed * 3.6) + "km/h",
            descripcion: this.json.weather[0].description,
            icono: `https://openweathermap.org/img/wn/${this.json.weather[0].icon}@4x.png`,
            lat: this.json.coord.lat,
            lon: this.json.coord.lon
        }
            return jsonAdaptado;
        } else{
            return this.json;
        }
    }

    /**
     * guarda el objeto de manera local
     * @returns {boolean} true cuando finaliza
     */
    #guardarEnLocal(json) {
        let string = JSON.stringify(this.mejorarJson());
        localStorage.setItem("datos", string);
        return true;
    }

    /**
     * modifica el texto de tags html con los valores del json
     * @param {object} arrayIdElementos un listado de ids de tags html ordenados de la siguiente manera; ciudad, país, temperatura, termica, minima, maxima, humedad, presion, viento, descripcion, latidud, longitud. para los elementos que se omitan deberá enviarse un string vacío
     * @param {*} idImg el id de una imagen, para mostrar el estado gráficamente
     * @param {*} iframeId el id de un iframe para mostrar la ubicación en un mapa de google maps
     * @param {*} apiKey la api key de google maps
     */
    setearTags(arrayIdElementos, idImg, iframeId, apiKey){
        let jsonMejorado = this.mejorarJson();
        let elementos = arrayIdElementos;
        let nro = 0;
        for(let elemento in jsonMejorado){
            if(elemento !== "icono"){
                if(elementos[nro]) {
                    let htmlTag = document.querySelector("#" + elementos[nro]);
                    if(htmlTag){
                        htmlTag.innerText = jsonMejorado[elemento];
                    }
                }
            }
            nro++;
        }
        let img = document.querySelector("#" + idImg);
        img.src = jsonMejorado.icono;
        img.title = "Clima actual";

       let iframe = document.querySelector("#" + iframeId)
       iframe.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${jsonMejorado.ciudad}+${jsonMejorado.pais}&center=${jsonMejorado.lat},${jsonMejorado.lon}`;

       this.#guardarEnLocal();
    }
}