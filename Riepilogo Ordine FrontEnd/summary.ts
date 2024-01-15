// import { shoppingInfo } from "./main.js";
// import{ shippingAddress, billingAddress } from "./shipping.js";

var shippingAddress:Address = JSON.parse(localStorage.getItem("shippingAddress")!);
var billingAddress:Address = JSON.parse(localStorage.getItem("billingAddress")!);
var shoppingInfo: { [key: string]: number } = JSON.parse(localStorage.getItem("shoppingInfo")!);
let totalProducts: Product[] = JSON.parse(localStorage.getItem("totalProducts")!);



console.log("shopping info: " , shoppingInfo);
console.log("shippingAddress" , shippingAddress);
console.log("billingAddress" , billingAddress);



//logica prodotti
const riepilogoSection: HTMLElement | null = document.querySelector('.riepilogo')!;
  const riepilogoDivSection: HTMLDivElement = document.createElement('div');
  riepilogoDivSection.className = 'shippingInfo';

  const filteredProducts: Product[] = totalProducts.filter(product => shoppingInfo.hasOwnProperty(product.code));
  let counter = 0;
  let productLenght = filteredProducts.length
  console.log('prodotti filtrati: ', filteredProducts);
  filteredProducts.forEach(product => {
    counter ++
    riepilogoDivSection.innerHTML += `
    <p>Prodotto: ${product.name}</p>
    <p>Prezzo unitario: ${product.price}</p>
    <p>Quantità: ${shoppingInfo[product.code]}</p>
  `;
  if(counter < productLenght ){
    riepilogoDivSection.innerHTML +=`<hr>`
  }
  riepilogoSection.appendChild(riepilogoDivSection);
  })


//logica Shipping
const shippingSection: HTMLElement | null = document.querySelector('.shipping')!;

  const shippingInfoDiv: HTMLDivElement = document.createElement('div');
  shippingInfoDiv.className = 'shippingInfo';

  shippingInfoDiv.innerHTML = `
    <p>Città: ${shippingAddress.city}</p>
    <p>Postalcode: ${shippingAddress.postalCode}</p>
    <p>State: ${shippingAddress.state}</p>
    <p>Street: ${shippingAddress.street}</p>
  `;

  shippingSection.appendChild(shippingInfoDiv);

//logica Billing
const billingSection: HTMLElement | null = document.querySelector('.billing')!;

  const billingInfoDiv: HTMLDivElement = document.createElement('div');
  billingInfoDiv.className = 'shippingInfo';

  billingInfoDiv.innerHTML = `
    <p>Città: ${billingAddress.city}</p>
    <p>Postalcode: ${billingAddress.postalCode}</p>
    <p>State: ${billingAddress.state}</p>
    <p>Street: ${billingAddress.street}</p>
  `;

  billingSection.appendChild(billingInfoDiv);


//logica per chiamata backend csv
const endpoint = 'http://localhost:8080/api/OrderController/shop'; // Sostituisci con l'URL del tuo endpoint

const data = {
  shoppingInfo: shoppingInfo,
  shippingAddress:shippingAddress,
  billingAddress: billingAddress,
  customerId: 1,
};

const requestOptions: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
};


document.addEventListener("DOMContentLoaded", function () {
  var btnCSV = document.getElementById("btnCSV")!;
    
  btnCSV.addEventListener("click", function () { 
    let orderDiv = document.querySelector('.order')!;
    let btnFattura = document.querySelector('.btnFattura')!
    btnFattura.classList.remove('dNone')
    orderDiv.classList.remove('dNone')

    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Risposta dal server:', data);
            generaCSV(data)
        })
        .catch(error => {
            console.error('Errore durante la chiamata HTTP:', error);
        });
  });
});

function generaCSV(info: any){
  const orderSection: HTMLElement | null = document.querySelector('.order')!;

    const orderInfoDiv: HTMLDivElement = document.createElement('div');
    orderInfoDiv.className = 'shippingInfo';
  
    orderInfoDiv.innerHTML = `
      <p>Nome: ${info.customer.firstname} ${info.customer.lastname}</p>
      <p>Indirizzo di fatturazione: ${info.billingAddress.street}, ${info.billingAddress.city}</p>
      <p>Indirizzo di spedizione: ${info.shippingAddress.street}, ${info.shippingAddress.city}</p>
      <hr>
      <p>Totale: ${info.order.totalAmount + ' €'}</p>
      <p>Grazie ${info.customer.firstname} ${info.customer.lastname} per il tuo ordine</p>
    `;
  
    orderSection.appendChild(orderInfoDiv);
}

