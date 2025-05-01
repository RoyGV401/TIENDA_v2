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
    color:undefined,
    brand:undefined
}


var carrito = [];

window.onload = function(){

    loadShoes();
    loadFilters();
}


function loadShoes() {
    let html = ``;
    let toSearch = tenis;

    if (FILTERS.color != undefined) {
        toSearch = toSearch.filter((s) => s.color == FILTERS.color);
    }

    if (FILTERS.brand != undefined) {
        toSearch = toSearch.filter((s) => s.marca == FILTERS.brand);
    }

    document.getElementById("contenedor").innerHTML = "";

    toSearch.forEach(t => {
        html += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <!-- <img class="card-img-top" id="" src="${t.imagen}" alt="..." /> -->
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
                        <div class="text-center">
                            <button type="button" id="btn_${t.idTeni}" class="btn btn-outline-dark mt-auto">Agregar al 🛒</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("contenedor").innerHTML = html;

    tenis.forEach(t => {
        document.getElementById("btn_" + t.idTeni).onclick = function () {
            carrito.push(t);
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

function loadFilters()
{
    let i = 0;
    const filterDiv = document.getElementById('filtrosColor');
    filterDiv.innerHTML = `
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="filterColor" id="radioColorNone" checked>
                              <label class="form-check-label" for="radioColor">
                                ---
                              </label>
                            </div>
                  
    `;
    colors.forEach(c => {
        i++;
        filterDiv.innerHTML += `
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="filterColor" id="radioColor${i}">
                              <label class="form-check-label" for="radioColor${i}">
                                ${c}
                              </label>
                            </div>
                            `;
    });

    i = 0;
    const brandDiv = document.getElementById('filtrosMarca');
    brandDiv.innerHTML = `
                        <div class="form-check">
                              <input class="form-check-input" type="radio" name="filterBrand" id="radioBrandNone" checked>
                              <label class="form-check-label" for="radioBrand">
                                ---
                              </label>
                            </div>
                  
    `;
    brands.forEach(c => {
        i++;
        brandDiv.innerHTML += `
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="filterBrand" id="radioBrand${i}">
                              <label class="form-check-label" for="radioBrand${i}">
                                ${c}
                              </label>
                            </div>
                            `;
    });

    brandDiv.addEventListener("focusout", (event) => {
        const selectedRadio = document.querySelector('input[name="filterBrand"]:checked');
        const value = selectedRadio.nextElementSibling.textContent.trim();
        if (value != "---")
        {
            FILTERS.brand = value;
        }
        else
        {
            FILTERS.brand = undefined;
        }
        loadShoes();
    });

    filterDiv.addEventListener("focusout", (event) => {
        const selectedRadio = document.querySelector('input[name="filterColor"]:checked');
        const value = selectedRadio.nextElementSibling.textContent.trim();
        if (value != "---")
        {
            FILTERS.color = value;
        }
        else
        {
            FILTERS.color = undefined;
        }
        loadShoes();
    });
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
