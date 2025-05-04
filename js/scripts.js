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

var selected;

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
  <div class="btn card h-100 d-flex flex-column" id="teni${t.idTeni}" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <!-- Product image container with fixed aspect ratio -->
    <h5 class="fw-bolder mb-2 my-3 h4 zin-1">${t.marca}</h5>
    
    <!-- Image container with square shape and white background -->
    <div class="image-square bg-white d-flex align-items-center justify-content-center">
      <img src="${t.imagen}" alt="${t.modelo}" class="img-fluid rounded product-img" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
    </div>

    <!-- Product details -->
    <div class="card-body p-4 pb-0 d-flex flex-column">
      <div class="text-center mt-auto">
        <label><h5 class="fw-bolder mb-1">${t.modelo}:</h5></label>
        <label><div class="price mb-2">$${t.precio}</div></label>
        <div class="card-body p-0">
          <div class="star-rating" id="starRating${t.idTeni}"></div>
        </div>
      </div>
    </div>

    <!-- Product actions -->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-auto"></div>
  </div>
</div>

        `;

        
    });

    
   

    document.getElementById("contenedor").innerHTML = html;
    let carrito_contador = document.getElementById("contador");
    
    busca.forEach(t => {
        updateStarRatingByID(t.valoracion,"starRating"+t.idTeni);
        document.getElementById("teni"+t.idTeni).onclick = function(){

            
             
            
            

            selected = t;
            document.getElementById("nombreTeni").innerHTML = selected.modelo;
            document.getElementById("div_imagen").innerHTML = `
                <img class="card-img-top w-100 h-100" src="${t.imagen}" alt="${t.modelo}" />
            `;
            document.getElementById("tallas").innerHTML = '';
            t.talla.forEach((t2,index) => {
                document.getElementById("tallas").innerHTML += `
                <input type="radio" class="btn-check" name="options" id="option${index}" autocomplete="off" value="${t2}">
                <label class="btn btn-outline-dark mb-2" for="option${index}">${t2}</label>
            `;
            });

            if(carrito.find(s => s==t)){
                document.getElementById("btn_c").innerHTML = `
                <button type="button" id="agregaC${t.idTeni}" class="btn btn-outline-dark mt-auto">Agregado!</button>
            `;
            }else{
                document.getElementById("btn_c").innerHTML = `
                <button type="button" id="agregaC${t.idTeni}" class="btn btn-outline-dark mt-auto">Agregar al 🛒</button>
            `;
            }
           
            console.log("agregaC"+t.idTeni);
        document.getElementById("agregaC"+t.idTeni).onclick = function () {
            if(carrito.find(s => s==t)){
                let index = carrito.findIndex(item => item.idTeni === t.idTeni);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    carrito_contador.innerHTML = carrito.length;
                }
                this.innerHTML = "Agregar al 🛒";
            }else{
            carrito.push(t);
            carrito_contador.innerHTML = carrito.length;
            this.innerHTML = "Agregado!";
            }
        };
            

        }
    });

    busca.forEach(t => {
        
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

function updateStarRatingByID(rating, id) {
    const starRatingElement = document.getElementById(id);
   
    
    starRatingElement.innerHTML = '';
   
    
    // Redondear a 1 decimal para evitar problemas de precisión
    rating = Math.round(rating * 10) / 10;
    
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;
    const emptyStars = 5 - Math.ceil(rating);
    
    // Añadir estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.className = 'bi bi-star-fill';
        starRatingElement.appendChild(star);
    }
    
    // Añadir estrella parcial si hay decimal
    if (decimalPart > 0) {
        const starContainer = document.createElement('div');
        starContainer.className = 'd-inline-block position-relative';
        starContainer.style.width = '1.5rem'; // Mismo ancho que las estrellas
        
        const emptyStar = document.createElement('i');
        emptyStar.className = 'bi bi-star';
        
        const partialStar = document.createElement('div');
        partialStar.className = 'position-absolute top-0 start-0 overflow-hidden';
        partialStar.style.width = `${decimalPart * 100}%`;
        
        const partialStarIcon = document.createElement('i');
        partialStarIcon.className = 'bi bi-star-fill';
        
        partialStar.appendChild(partialStarIcon);
        starContainer.appendChild(emptyStar);
        starContainer.appendChild(partialStar);
        starRatingElement.appendChild(starContainer);
    }
    
    // Añadir estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        const star = document.createElement('i');
        star.className = 'bi bi-star';
        starRatingElement.appendChild(star);
    }
}

function updateStarRating(rating) {
    const starRatingElement = document.getElementById('starRating');
    const ratingValueElement = document.getElementById('ratingValue');
    
    starRatingElement.innerHTML = '';
    ratingValueElement.textContent = rating;
    
    // Redondear a 1 decimal para evitar problemas de precisión
    rating = Math.round(rating * 10) / 10;
    
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;
    const emptyStars = 5 - Math.ceil(rating);
    
    // Añadir estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.className = 'bi bi-star-fill';
        starRatingElement.appendChild(star);
    }
    
    // Añadir estrella parcial si hay decimal
    if (decimalPart > 0) {
        const starContainer = document.createElement('div');
        starContainer.className = 'd-inline-block position-relative';
        starContainer.style.width = '1.5rem'; // Mismo ancho que las estrellas
        
        const emptyStar = document.createElement('i');
        emptyStar.className = 'bi bi-star';
        
        const partialStar = document.createElement('div');
        partialStar.className = 'position-absolute top-0 start-0 overflow-hidden';
        partialStar.style.width = `${decimalPart * 100}%`;
        
        const partialStarIcon = document.createElement('i');
        partialStarIcon.className = 'bi bi-star-fill';
        
        partialStar.appendChild(partialStarIcon);
        starContainer.appendChild(emptyStar);
        starContainer.appendChild(partialStar);
        starRatingElement.appendChild(starContainer);
    }
    
    // Añadir estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        const star = document.createElement('i');
        star.className = 'bi bi-star';
        starRatingElement.appendChild(star);
    }
}