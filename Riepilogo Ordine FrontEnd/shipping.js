"use strict";
function inviaForm() {
    const url = `summary.html`;
    window.location.href = url;
    console.log('sono qui ');
}
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
    // Recupera i valori inseriti nel form Shipping
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
    return shippingAddress;
}
function getBilling() {
    // Recupera i valori inseriti nel form Billing
    const postalCode = document.getElementById('Postal2').value;
    const street = document.getElementById('Ste2').value;
    const city = document.getElementById('City2').value;
    const state = document.getElementById('Sta2').value;
    var billingAddress = {
        postalCode: postalCode,
        street: street,
        city: city,
        state: state
    };
    return billingAddress;
}
// button Invia
try {
    const buttonInvia = document.getElementById('bInvia');
    buttonInvia.addEventListener('click', (event) => {
        event.preventDefault();
        shippingAddress = getShipping();
        billingAddress = getBilling();
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
// button reset Shipping
var resetShip = document.getElementById("resetShip");
resetShip.addEventListener('click', function () {
    document.getElementById('Postal').value = "";
    document.getElementById('Ste').value = "";
    document.getElementById('City').value = "";
    document.getElementById('Sta').value = "";
});
// button reset Billing
var resetBtnBill = document.getElementById("resetBilling");
resetBtnBill.addEventListener('click', function () {
    document.getElementById('Postal2').value = "";
    document.getElementById('Ste2').value = "";
    document.getElementById('City2').value = "";
    document.getElementById('Sta2').value = "";
});
var checkBtn = document.getElementById("addressCheck");
//In caso venga flaggata la checkbox inseriamo i valori del Shipping Address all'interno del Billing Address
checkBtn.addEventListener('change', () => {
    if (checkBtn.checked) {
        console.log("checked");
        var shipping = getShipping();
        document.getElementById('Postal2').value = shipping.postalCode;
        document.getElementById('Ste2').value = shipping.street;
        document.getElementById('City2').value = shipping.city;
        document.getElementById('Sta2').value = shipping.state;
        document.getElementById('Postal2').disabled = true;
        document.getElementById('Ste2').disabled = true;
        document.getElementById('City2').disabled = true;
        document.getElementById('Sta2').disabled = true;
        document.getElementById("resetBilling").disabled = true;
        //Attivo il button Invia
        var btnInvia = document.getElementById("bInvia");
        btnInvia.disabled = false;
    }
    else {
        console.log("Checkbox is not checked..");
        document.getElementById('Postal2').value = "";
        document.getElementById('Ste2').value = "";
        document.getElementById('City2').value = "";
        document.getElementById('Sta2').value = "";
        document.getElementById('Postal2').disabled = false;
        document.getElementById('Ste2').disabled = false;
        document.getElementById('City2').disabled = false;
        document.getElementById('Sta2').disabled = false;
        document.getElementById("resetBilling").disabled = false;
        //Disattivo button Invia
        var btnInvia = document.getElementById("bInvia");
        btnInvia.disabled = true;
    }
});
//Controllo il cambiamento dei campi di input
function handleInputChange() {
    const postalCode = document.getElementById('Postal').value;
    const street = document.getElementById('Ste').value;
    const city = document.getElementById('City').value;
    const state = document.getElementById('Sta').value;
    const postalCodeBill = document.getElementById('Postal2').value;
    const streetBill = document.getElementById('Ste2').value;
    const cityBill = document.getElementById('City2').value;
    const stateBill = document.getElementById('Sta2').value;
    // Se tutti i campi di imput del form di Shipping sono pieni si attiva il checkBox e si rimuove il messaggo di alert
    if (postalCode === "" || street === "" || city === "" || state === "") {
        checkBtn.disabled = true;
    }
    else {
        checkBtn.disabled = false;
        var paragrafBefore = document.querySelector(".contCheck p");
        paragrafBefore.innerHTML = "";
    }
    // Se tutti i campi di entrambi i form sono pieni si attiva il button Invia
    if (postalCode === "" || street === "" || city === "" || state === "" || postalCodeBill === "" || streetBill === "" || cityBill === "" || stateBill === "") {
        var btnInvia = document.getElementById("bInvia");
        btnInvia.disabled = true;
    }
    else {
        var btnInvia = document.getElementById("bInvia");
        btnInvia.disabled = false;
    }
}
//Controllo durante l'inserimento nel form
const postalInput = document.getElementById('Postal');
const streetInput = document.getElementById('Ste');
const cityInput = document.getElementById('City');
const stateInput = document.getElementById('Sta');
const postalInputBill = document.getElementById('Postal2');
const streetInputBill = document.getElementById('Ste2');
const cityInputBill = document.getElementById('City2');
const stateInputBill = document.getElementById('Sta2');
postalInput.addEventListener('input', handleInputChange);
streetInput.addEventListener('input', handleInputChange);
cityInput.addEventListener('input', handleInputChange);
stateInput.addEventListener('input', handleInputChange);
postalInputBill.addEventListener('input', handleInputChange);
streetInputBill.addEventListener('input', handleInputChange);
cityInputBill.addEventListener('input', handleInputChange);
stateInputBill.addEventListener('input', handleInputChange);
