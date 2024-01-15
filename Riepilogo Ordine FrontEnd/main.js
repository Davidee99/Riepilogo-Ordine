"use strict";
const url = 'http://localhost:8080/api/ProductController/getAll';
var shoppingInfo = {};
function caricaJSON() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        renderProductCards(data);
        localStorage.setItem('totalProducts', JSON.stringify(data));
    })
        .catch(error => {
        console.error('Errore nel caricamento del JSON:', error);
    });
}
function renderProductCards(data) {
    const cardContainer = document.querySelector('.card_container');
    if (cardContainer) {
        data.forEach((product) => {
            // Crea l'URL dell'immagine univoco per ogni prodotto
            const imageUrl = `https://picsum.photos/200?random=${product.code}`;
            // Crea la card del prodotto con l'immagine dinamica
            const card = createProductCard(product, imageUrl);
            // Aggiungi la card al contenitore
            cardContainer.appendChild(card);
        });
    }
}
function createProductCard(product, imageUrl) {
    const card = document.createElement('div');
    card.className = 'event_card d-flex justify-content-center align-items-center';
    card.innerHTML = `
        <div class="imgageProduct">
            <img src="${imageUrl}" alt="">
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
                const cartTitle = document.querySelector('.cartTitle');
                cartTitle.classList.remove('dNone');
                const btnNext = document.querySelector('.btnNext');
                btnNext.classList.remove('dNone');
                const selectElement = document.getElementById(`productQuantity_${product.code}`);
                const selectedVariant = selectElement.value;
                shoppingInfo[product.code] = Number(selectedVariant);
                console.log(shoppingInfo);
                localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfo));
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
    cartItem.className = 'ms-3 mt-2 d-flex';
    //cartItem.innerHTML = `${product.name} - Quantity: ${selectedQuantity} - Style: ${selectedVariant} <button class="removeButton btn btn-danger ms-2">Elimina</button>`;
    cartItem.innerHTML = `
    <div class="beautify">
      <p>Nome Prodotto: ${product.name}</p>
      <p>Quantità: ${selectedQuantity}</p>
      <button class="removeButton btn btn-danger">Elimina</button>
    </div>  
    `;
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
        manageEmptyCartContainer(cartContainer);
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
            location.reload();
            window.location.href = 'index.html#products';
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
        manageEmptyCartContainer(cartContainer);
    }
}
function manageEmptyCartContainer(container) {
    const saveChange = document.querySelector('.buttonSave');
    if (isCartContainerEmpty(container)) {
        saveChange.classList.add('dNone');
    }
    else {
        saveChange.classList.remove('dNone');
    }
}
function isCartContainerEmpty(container) {
    var _a;
    return ((_a = container === null || container === void 0 ? void 0 : container.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === '';
}
document.addEventListener('DOMContentLoaded', function () {
    caricaJSON();
});
let status1 = new URLSearchParams(location.search).get('status');
console.log('cacca pupu ' + status1);
// export {shoppingInfo};
//  if(status1 == 'true'){
//   var main1 = document.querySelector('main')!;
//   main1.style.display='none';
//  }
/*
    passaggi mancanti:
    npm init
    tsc --init per generare il file tscconfig
    installare il pacchetto lite-server con npm i lite-server
    nel file tsc config modificare il target così "target": "ES6" e il module in "module": "ES2022"
  */ 
