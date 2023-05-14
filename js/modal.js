'use strict'

/**
 * crea ventanas modal
 */
class Modal {
    /**
     * 
     * @param {string} titulo nombre del título por defecto
     */
    constructor(titulo){
        this.titulo = titulo;
    }

    /**
     * crea una capa que bloquea el sitio hasta finalizar alguna operación. debe ser removida posteriormente con quitarModal()
     */
    mostrarCarga(){
        let div = document.createElement("div");
        div.id = "modal-cargando";
        document.body.append(div);
    }

    /**
     * crea un diálogo de advertencia al usuario
     * @param {string} titulo si no se envía el argumento, usará el predeterminado
     * @param {string} info detalles de la operación
     */
    mostrarInfo(titulo = this.titulo, info = "Aceptá para continuar"){
        let div = document.createElement("div");
        let divCaja = document.createElement("div");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        let button = document.createElement("button");
        div.id = "modal-info-cont";
        h3.innerText = titulo;
        p.innerText = info;
        button.innerText = "Aceptar";
        divCaja.append(h3, p, button);
        div.append(divCaja);
        document.body.append(div);
        button.addEventListener("click", () => {
            this.quitarModal();
        })
    }

    quitarModal(){
        let modalCargando = document.querySelector("#modal-cargando");
        let modalInfo = document.querySelector("#modal-info-cont");
        modalCargando ? modalCargando.remove() : null;
        modalInfo ? modalInfo.remove() : null;
    }
}