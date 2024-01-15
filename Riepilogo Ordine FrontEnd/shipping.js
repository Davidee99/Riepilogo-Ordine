"use strict";
function inviaForm() {
    const form = document.getElementById('form1');
    const formData = new FormData(form);
    // Costruisci l'URL con ancoraggio e passaggio dei dati
    const url = `summary.html`;
    // Redirigi alla pagina2.html con ancoraggio
    window.location.href = url;
    console.log('sono qui ');
}
console.log('sono qui 2');
var shippingAddress = {
    postalCode: '',
    street: '',
    city: '',
    state: ''
};
var billingAddress = {
    postalCode: '',
    street: '',
    city: '',
    state: ''
};
function getShipping() {
    console.log('sono qui 4');
    // Recupera i valori inseriti nel form
    const postalCode = document.getElementById('Postal').value;
    const street = document.getElementById('Ste').value;
    const city = document.getElementById('City').value;
    const state = document.getElementById('Sta').value;
    var shippingAddress = {
        postalCode: postalCode,
        street: street,
        city: city,
        state: state
    };
    console.log(shippingAddress);
    return shippingAddress;
}
try {
    const buttonInvia = document.getElementById('bInvia');
    buttonInvia.addEventListener('click', (event) => {
        console.log('sono qui 3');
        event.preventDefault();
        shippingAddress = getShipping();
        billingAddress = getShipping();
        console.log(shippingAddress);
        console.log(billingAddress);
        localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
        localStorage.setItem("billingAddress", JSON.stringify(billingAddress));
        inviaForm();
    });
}
catch (error) {
    console.log(error);
}
// export { shippingAddress, billingAddress };
