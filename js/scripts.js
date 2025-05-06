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
    document.getElementById("btn_compra").onclick = function(){
        let error=false;
        
        carrito.forEach(c => {
            console.log(document.getElementById("inputNumero"+c.idTeni).value)
            if(document.getElementById("inputNumero"+c.idTeni).value<=0||document.getElementById("inputNumero"+c.idTeni).value > r.stock)
                error=true

        });
        carrito.forEach(c => {
                let r;
                r= tenis.find(s => s.idTeni==c.idTeni);
                if(!error){
                    r.stock -= document.getElementById("inputNumero"+c.idTeni).value;




                    const modal1Element = document.getElementById('alertModal3');
                    const modal1 = new bootstrap.Modal(modal1Element);
                    modal1.show();
                    let temporizador;
                    let tiempoRestante = 2;
                    temporizador = setInterval(() => {
                        tiempoRestante--;
                        
                        const modal = bootstrap.Modal.getInstance(document.getElementById('carrito_modal'));
    
                        // Cerrar el modal
                        modal.hide();
                        

                        if (tiempoRestante <= 0) {
                            clearInterval(temporizador);
                            modal1.hide();
                        }
                    }, 1000);
                    document.getElementById("contador").innerText = 0;
                    carrito = [];
                    loadShoes();
                    }else{
                        const modal1Element = document.getElementById('alertModal5');
                        const modal1 = new bootstrap.Modal(modal1Element);
                        modal1.show();
                        let temporizador;
                        let tiempoRestante = 2;
                        temporizador = setInterval(() => {
                            tiempoRestante--;
                            
                            
                            if (tiempoRestante <= 0) {
                                clearInterval(temporizador);
                                modal1.hide();
                            }
                        }, 1000);
                }
                    
                       
                    
                
                    
        });
    }
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

    busca = busca.filter(s=>s.stock>0);  
    
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
    <div class="card-body p-4 py-0 d-flex flex-column">
      <div class="text-center mt-auto">
        <label><h5 class="fw-bolder mb-1">${t.modelo}:</h5></label>
        <label><div class="price mb-2">$${t.precio}</div></label>
        <div class="card-body p-0">
          <div class="star-rating d-none d-lg-block d-md-block" id="starRating${t.idTeni}"></div>
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
            document.getElementById("nombreTeni").innerHTML = selected.marca + " - " +selected.modelo;
            document.getElementById("stock").innerText = "Disponibles: "+ selected.stock;
            document.getElementById("precio").innerText = "Precio: $"+ selected.precio; 
            document.getElementById("div_imagen").innerHTML = `
                <img id="imagen_preview" class="card-img-top w-100 h-100" src="${t.imagen}" alt="${t.modelo}" />
            `;
            document.getElementById("tallas").innerHTML = '';
            t.talla.forEach((t2,index) => {
                document.getElementById("tallas").innerHTML += `
                <input type="radio" class="btn-check" name="options" id="option${index}" autocomplete="off" value="${t2}">
                <label class="btn btn-outline-dark mb-2" for="option${index}">${t2}</label>
            `;
            });

           
                document.getElementById("btn_c").innerHTML = `
                <button type="button" id="agregaC${t.idTeni}" class="btn btn-outline-dark mt-auto">Agregar al 🛒</button>
            `;
            
           
         
            document.getElementById("agregaC"+t.idTeni).onclick = function () {
                
                
                if(document.querySelector('input[name="options"]:checked')){
                    const radioSeleccionado = document.querySelector('input[name="options"]:checked');
              
                    if(carrito.find(s => s==t)){
                        let index = carrito.findIndex(item => item.idTeni === t.idTeni);
                        if (index !== -1) {
                            carrito.splice(index, 1);
                            carrito_contador.innerHTML = carrito.length;
                        }
                        this.innerHTML = "Agregar al 🛒";
                    }else{
                        if(!carrito.find(s=> s.idTeni==t.idTeni)){
                            var nuevo = structuredClone(t);
                            nuevo.talla = nuevo.talla.filter(ta => ta==radioSeleccionado.value)
                            carrito.push(nuevo);
                            carrito_contador.innerHTML = carrito.length;
                            this.innerHTML = "Agregado!";
                          
                            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    
                            // Cerrar el modal
                            modal.hide();

                            const modal1Element = document.getElementById('alertModal6');
                            const modal1 = new bootstrap.Modal(modal1Element,{
                                backdrop: false // Elimina el fondo oscuro
                            });
                           
                            modal1.show();
                            let temporizador;
                            let tiempoRestante = 1;
                            temporizador = setInterval(() => {
                                tiempoRestante--;
                                
                                const modal = bootstrap.Modal.getInstance(document.getElementById('alertModal6'));
            
                                // Cerrar el modal
                                modal.hide();
                                

                                if (tiempoRestante <= 0) {
                                    clearInterval(temporizador);
                                    modal1.hide();
                                }
                            }, 1000);
                        }else{
                            const modal1Element = document.getElementById('alertModal2');
                            const modal1 = new bootstrap.Modal(modal1Element);
                            modal1.show();
                            let temporizador;
                            let tiempoRestante = 2;
                            temporizador = setInterval(() => {
                                tiempoRestante--;
                                
                                
                                if (tiempoRestante <= 0) {
                                    clearInterval(temporizador);
                                    modal1.hide();
                                }
                            }, 1000);
                        }
                    }
                }else{
                    
                    const modal1Element = document.getElementById('alertModal');
                    const modal1 = new bootstrap.Modal(modal1Element);
                    modal1.show();
                    let temporizador;
                    let tiempoRestante = 2;
                    temporizador = setInterval(() => {
                        tiempoRestante--;
                        
                        
                        if (tiempoRestante <= 0) {
                            clearInterval(temporizador);
                            modal1.hide();
                        }
                    }, 1000);
                }
            };

        }
    });

    busca.forEach(t => {
        
    });


    document.getElementById("cartButton").onclick = function () {
        cargarCarro();
        cargabotones();
    }

}
var total = 0;
function cargarCarro(){
    let html = ``;
        total=0;
        carrito.forEach(c => {
            html += ` 
            <div class="row  mb-2 align-items-center">
            
            <img class="imama col-4" src="${c.imagen}">
            <ul class="col-5 pString my-2 mx-1 px-1">
            <li class="">${c.modelo}-${c.talla}:    $${c.precio}</li>
            <li class="">Disponibles:${tenis.find(s=>s.idTeni==c.idTeni).stock}</li>
            </ul>
            <input id="inputNumero${c.idTeni}" min="0" class=" inputNumero col-1 mb-1 p-0"type="number" value="1"></input>
           <button class="botonElis my-1 col-2 mt-0 mx-2 btn btn-outline-danger" id=elimina_${c.idTeni}>Eliminar</button>

            </div>
           `;
            total += c.precio;
        });
        html += `<h4 id="total" class="pe-4 text-end">Total:$ ${total}</h4>`;
        document.getElementById("carrito_modal_body").innerHTML = html;
        cargabotones();
}

function cargabotones(){
    carrito.forEach((c) => {
        document.getElementById("elimina_"+c.idTeni).onclick = function (){
            carrito.splice(carrito.findIndex(s=> s.idTeni==c.idTeni),1);
            document.getElementById("contador").innerText = carrito.length;
            cargarCarro();
        }
    });
    carrito.forEach(c => {
        document.getElementById("inputNumero"+c.idTeni).addEventListener("input",function(){
            if(this.value!="")
            {
                calcularTotal();
            }
        });
    });
}


function calcularTotal(){
    total = 0;
    carrito.forEach(c => {
        total += c.precio*document.getElementById("inputNumero"+c.idTeni).value;
    });
    document.getElementById("total").innerText = "Total:$"+total;
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
    cargarFiltro(colors,"bodyColor");
    cargarFiltro(brands,"bodyMarca");
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
    
   
    
    arreglo.forEach((c, index) => {
        const checkboxId = `checkbox-${index}`;
        trBody.innerHTML += `
            <div class="form-check col-md-4 col-lg-4 col-sm-6">
                <input class="form-check-input" type="checkbox" value="${c}" id="${c}${checkboxId}">
                <label class="form-check-label p-0" for="${checkboxId}">
                    ${c}
                </label>
            </div>
        `;
    
      

        
    });



    

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