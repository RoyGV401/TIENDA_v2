/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


const tenis =[
    {
        idTeni:1,
        marca:"Nikke",
        color:"Blanco",
        talla:28,
        precio:1200,
        stock:12,
        imagen:"nike.webp"
    },
    {
        idTeni:2,
        marca:"Addidas",
        color:"Negro",
        talla:26,
        precio:1010,
        stock:8,
        imagen:"adidas.webp"
    },
    {
        idTeni:3,
        marca:"Converse",
        color:"Blanco",
        talla:27,
        precio:600,
        stock:28,
        imagen:"converse.webp"
    },
];

var carrito = [];

window.onload = function(){

    onloading();
}

function onloading(){

    tenis.forEach(t => {
        
        document.getElementById("contenedor").innerHTML += `
            <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top"  id="" src="${t.imagen}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${t.marca}</h5>
                                    <!-- Product price-->
                                    $${t.precio}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button type="button" id="btn_${t.idTeni}" class="btn btn-outline-dark mt-auto" href="#">Agregar al 🛒</button></div>
                            </div>
                        </div>
                    </div>
        `;
    });



    cargarBotones();
    

 
}

function cargarBotones()
{
    tenis.forEach(t => {
        document.getElementById("btn_"+t.idTeni).onclick() = function(){
            carrito.push(t);
        }
    });
}