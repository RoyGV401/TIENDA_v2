/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

import { TENIS } from "./src/tenis.js";

var tenis = TENIS;

const brands = getBrands();
const colors = getColors();

const FILTERS = {
    color: [],
    brand: []
}
var palabra = "";

var carrito = [];

window.onload = function(){

    loadShoes();
    loadFiltro();
    let serch = document.getElementById("barra_buscar");
    serch.addEventListener("input",function(){
        palabra = this.value;
        loadShoes();
    });
    
}


function loadShoes() {
    let html = ``;
    let toSearch = tenis;
    
    let busca = [];

   

    if(FILTERS.brand.length>0 && FILTERS.color.length>0){
        let busca2 = []
        FILTERS.color.forEach(c => {
            busca= busca.concat(toSearch.filter((s) => s.color == c));
        });
        
        FILTERS.brand.forEach(b => {
            busca2= busca2.concat((busca.filter((s) => s.marca == b)));
        });
        busca = busca2;
    }else{
        if (FILTERS.color.length>0) {
            FILTERS.color.forEach(c => {
                busca= busca.concat(toSearch.filter((s) => s.color == c));
            });
        }
    
        if (FILTERS.brand.length>0) {
            FILTERS.brand.forEach(b => {
                busca= busca.concat(toSearch.filter((s) => s.marca == b));
            });
        }
    }
    

    if(FILTERS.color.length==0 && FILTERS.brand.length==0){
        busca = tenis;
    }

    if(palabra!="")
        busca = busca.filter((s) => (s.marca+s.modelo+s.color).trim().toLowerCase().includes(palabra.trim().toLowerCase()));

    busca.sort(function (a, b) {
        if (a.idTeni > b.idTeni) {
          return 1;
        }
        if (a.idTeni < b.idTeni) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    
    document.getElementById("contenedor").innerHTML = "";

    busca.forEach(t => {
        html += `
            <div class="col mb-5">
    <div class="card h-100 d-flex flex-column">
        <!-- Product image container with fixed aspect ratio -->
        <div class="image-container" style="height: 200px; ">
            <img class="card-img-top w-100 h-100 object-fit-cover" src="${t.imagen}" alt="${t.modelo}" />
        </div>
        <!-- Product details -->
        <div class="card-body p-4 d-flex flex-column">
            <div class="text-center mt-auto">
                <!-- Product name -->
                <h5 class="fw-bolder mb-1">${t.modelo}</h5>
                <h5 class="fw-bolder mb-2">${t.marca}</h5>
                <!-- Product price -->
                <div class="price mb-2">$${t.precio}</div>
            </div>
        </div>
        <!-- Product actions -->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-auto">
            <div class="text-center">
                <button type="button" id="btn_${t.idTeni}" class="btn btn-outline-dark mt-auto">Agregar al 🛒</button>
            </div>
        </div>
    </div>
</div>
        `;
    });

    document.getElementById("contenedor").innerHTML = html;
    
    busca.forEach(t => {
        document.getElementById("btn_" + t.idTeni).onclick = function () {
            if(this.innerHTML=="Agregado!"){
                let index = carrito.findIndex(item => item.idTeni === t.idTeni);
                if (index !== -1) {
                    carrito.splice(index, 1);
                }
                this.innerHTML = "Agregar al 🛒";
            }else{
            carrito.push(t);
            this.innerHTML = "Agregado!";
            }
            

        };
    });

    document.getElementById("cartButton").onclick = function () {
        let html = ``;
        carrito.forEach(c => {
            html += `<p>${c.marca}</p>`;
        });
        document.getElementById("carrito_modal_body").innerHTML = html;
    };
}



function getBrands()
{
    const result = [];
    tenis.forEach(t => {
        if (!result.includes(t.marca)) result.push(t.marca);
    });
    return result;
}

function getColors()
{
    const result = [];
    tenis.forEach(t => {
        if (!result.includes(t.color)) result.push(t.color);
    });
    return result;
}

function loadFiltro(){

    let filtro = document.getElementById("filtroDiv");
    let btn = document.getElementById("btn_filtro");
    cargarFiltro(colors,"trBody");
    cargarFiltro(brands,"trBody2");
    filtro.hidden = true;
    btn.onclick = function(){
        if(filtro.hidden == true){
            filtro.hidden = false;
            btn.innerText = "Filtrar ▽";
        }
        else{
            filtro.hidden = true;
            btn.innerText = "Filtrar ▷";

        }
    }
    
}

function cargarFiltro(arreglo,id){
    let trBody = document.getElementById(id);
    
    let newTD = document.createElement("td");
    
    arreglo.forEach((c, index) => {
        const checkboxId = `checkbox-${index}`;
        newTD.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${c}" id="${c}${checkboxId}">
                <label class="form-check-label" for="${checkboxId}">
                    ${c}
                </label>
            </div>
        `;
    
        if ((index + 1) % 3 === 0) {
            trBody.appendChild(newTD);
            newTD = document.createElement("td");
        }

        
    });

    if (arreglo.length % 3 !== 0) {
        trBody.appendChild(newTD);
    }
    

    arreglo.forEach((c,index) => {
        const checkboxId = `checkbox-${index}`;
        document.getElementById(c+checkboxId).onclick=function(){
            if(arreglo===colors)
                if(this.checked){
                    FILTERS.color.push(c);
                    loadShoes();
                }else{
                    
                    FILTERS.color.splice(FILTERS.color.indexOf(c),1);
                    loadShoes();
                }
            else
                if(this.checked){  
                    FILTERS.brand.push(c);
                    loadShoes();
                }else{
                    
                    FILTERS.brand.splice(FILTERS.brand.indexOf(c),1);
                    loadShoes();
                }
        }
    });
}
