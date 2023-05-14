'use strict'

class Modal {
    constructor(titulo){
        this.titulo = titulo;
        this.confirmacion = false;
    }

    mostrarCarga(){
        let div = document.createElement("div");
        div.id = "modal-cargando";
        document.body.append(div);
    }

    mostrarInfo(titulo = this.mensaje, info){
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