"use strict";
const url = 'http://localhost:8080/api/ProductController/getAll';
var shoppingInfo = {};
function caricaJSON() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        renderProductCards(data);
    })
        .catch(error => {
        console.error('Errore nel caricamento del JSON:', error);
    });
}
function renderProductCards(data) {
    const cardContainer = document.querySelector('.card_container');
    if (cardContainer) {
        data.forEach((product) => {
            const card = createProductCard(product);
            cardContainer.appendChild(card);
        });
    }
}
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'event_card d-flex justify-content-center align-items-center';
    card.innerHTML = `
        <div class="imgageProduct">
            <img src="./img/product.png" alt="">
        </div>
        <div class="infoProductContainer">
            <div class="checkbox-container m-3 mb-5">
                <input type="checkbox" id="${product.code}" class="productCheckbox">
                <label for="${product.code}">${product.name}</label>
            </div>
            
            <div class="checkbox-select-container m-3">
                <label for="productSelect">Style</label>
                <select id="productSelect_${product.code}">
                    ${createVariantOptions(product.variants)}
                </select>
            </div>

            <div class="quantity-container m-3">
                <label for="productQuantity">Quantity:</label>
                <input type="number" id="productQuantity_${product.code}" name="productQuantity" min="1" value="1">
            </div>
        </div>
    `;
    // Aggiungiamo un listener per gestire il click sulla checkbox
    const checkbox = card.querySelector(`#${product.code}`); // Assicurati che checkbox sia di tipo HTMLInputElement
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) { // Usa direttamente checkbox.checked
                addToCart(product);
                const selectElement = document.getElementById(`productQuantity_${product.code}`);
                const selectedVariant = selectElement.value;
                shoppingInfo[product.code] = Number(selectedVariant);
                console.log(shoppingInfo);
                console.log("Checkbox is checked..");
            }
            else {
                console.log("Checkbox is not checked..");
            }
        });
    }
    return card;
}
function createVariantOptions(variants) {
    if (typeof variants !== 'string') {
        return '';
    }
    const variantsArray = variants.split(',').map(variant => variant.trim());
    const options = variantsArray.map(variant => `<option value="${variant}">${variant}</option>`);
    return options.join('');
}
function addToCart(product) {
    // Ottieni le informazioni sul prodotto selezionato
    const quantityInput = document.getElementById(`productQuantity_${product.code}`);
    const selectedQuantity = parseInt(quantityInput.value, 10);
    const selectElement = document.getElementById(`productSelect_${product.code}`);
    const selectedVariant = selectElement.value;
    // Crea l'elemento del carrello
    const cartItem = document.createElement('div');
    cartItem.className = 'd-flex';
    cartItem.innerHTML = `${product.name} - Quantity: ${selectedQuantity} - Style: ${selectedVariant} <button class="removeButton">x</button>`;
    // Aggiungi l'elemento al carrello
    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        cartContainer.appendChild(cartItem);
        // Aggiungi un listener per gestire il click sulla "x"
        const removeButton = cartItem.querySelector('.removeButton');
        if (removeButton) {
            removeButton.addEventListener('click', () => removeFromCart(cartItem));
        }
    }
}
//modal section
const modalButton = document.getElementById('modalButton');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');
if (modalButton) {
    modalButton.addEventListener('click', function () {
        console.log('prova');
        var cartContainer = document.getElementById('cartContainer');
        console.log(cartContainer);
        if (modalTitle) {
            modalTitle.innerHTML = 'Il tuo carrello';
            modalBody.appendChild(cartContainer);
        }
        const closeButton = document.querySelector(".btn-close");
        closeButton.addEventListener('click', () => {
            console.log('sono qui ');
            console.log(closeButton);
            const cartContainer = document.getElementById('cartContainer');
            const divC = document.getElementById('divContainer');
            divC.appendChild(cartContainer);
        });
        const deleteOrder = document.querySelector('.deleteOrder');
        deleteOrder.addEventListener('click', function () {
            cartContainer.innerHTML = '';
        });
        const saveChange = document.querySelector('.buttonSave');
        saveChange.addEventListener('click', () => {
            window.open('shipping.html', '_blank');
        });
    });
}
function removeFromCart(cartItem) {
    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        cartContainer.removeChild(cartItem);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    caricaJSON();
});
let status1 = new URLSearchParams(location.search).get('status');
console.log('cacca pupu ' + status1);
//  if(status1 == 'true'){
//   var main1 = document.querySelector('main')!;
//   main1.style.display='none';
//  }
/*
    passaggi mancanti:
    tsc --config per generare il file tscconfig
    installare il pacchetto lite-server con npm i lite-server
    nel file tsc config modificare il target così "target": "ES6" e il module in "module": "ES2022"
  */ 
