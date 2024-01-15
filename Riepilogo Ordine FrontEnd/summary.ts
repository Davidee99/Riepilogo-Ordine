// import { shoppingInfo } from "./main.js";
// import{ shippingAddress, billingAddress } from "./shipping.js";

var shippingAddress:Address = JSON.parse(localStorage.getItem("shippingAddress")!);
var billingAddress:Address = JSON.parse(localStorage.getItem("billingAddress")!);
var shoppingInfo: { [key: string]: number } = JSON.parse(localStorage.getItem("shoppingInfo")!);

console.log("shopping info: " , shoppingInfo);
console.log("shippingAddress" , shippingAddress);
console.log("billingAddress" , billingAddress);



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
    var btnCSV = document.getElementById("btnCSV");
    
    if (btnCSV) {
        btnCSV.addEventListener("click", function () { 
            console.log("btnCSV");
            fetch(endpoint, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Risposta dal server:', data);
                })
                .catch(error => {
                    console.error('Errore durante la chiamata HTTP:', error);
                });
        });
    } else {
        console.error("Elemento c on ID 'btnCSV' non trovato.");
    }
});

