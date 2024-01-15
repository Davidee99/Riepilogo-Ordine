function inviaForm() {

  const url = `summary.html`;

  window.location.href = url;
  console.log('sono qui ');

}


interface Address {
  postalCode: string,
  street: string,
  city: string,
  state: string
}
var shippingAddress: Address = {
  postalCode: '',
  street: '',
  city: '',
  state: ''
} as Address;

var billingAddress: Address = {
  postalCode: '',
  street: '',
  city: '',
  state: ''
} as Address;



function getShipping() {
  // Recupera i valori inseriti nel form Shipping
  const postalCode = (document.getElementById('Postal') as HTMLInputElement).value;
  const street = (document.getElementById('Ste') as HTMLInputElement).value;
  const city = (document.getElementById('City') as HTMLInputElement).value;
  const state = (document.getElementById('Sta') as HTMLInputElement).value;
  var shippingAddress: Address = {
    postalCode: postalCode,
    street: street,
    city: city,
    state: state
  } as Address;
  return shippingAddress;
}

function getBilling() {
  // Recupera i valori inseriti nel form Billing
  const postalCode = (document.getElementById('Postal2') as HTMLInputElement).value;
  const street = (document.getElementById('Ste2') as HTMLInputElement).value;
  const city = (document.getElementById('City2') as HTMLInputElement).value;
  const state = (document.getElementById('Sta2') as HTMLInputElement).value;

  var billingAddress: Address = {
    postalCode: postalCode,
    street: street,
    city: city,
    state: state
  } as Address;

  return billingAddress;
}

// button Invia
try {
  const buttonInvia = document.getElementById('bInvia')!;
  buttonInvia.addEventListener('click', (event: Event) => {
    event.preventDefault();
    shippingAddress = getShipping();
    billingAddress = getBilling();
    console.log(shippingAddress);
    console.log(billingAddress);
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    localStorage.setItem("billingAddress", JSON.stringify(billingAddress));
    inviaForm();
  })

} catch (error) {
  console.log(error);

}

// button reset Shipping
var resetShip = document.getElementById("resetShip") as HTMLButtonElement;
resetShip.addEventListener('click', function(){
    (document.getElementById('Postal') as HTMLInputElement).value = "";
    (document.getElementById('Ste') as HTMLInputElement).value = "";
    (document.getElementById('City') as HTMLInputElement).value = "";
    (document.getElementById('Sta') as HTMLInputElement).value = "";
});

// button reset Billing
var resetBtnBill = document.getElementById("resetBilling") as HTMLButtonElement;
resetBtnBill.addEventListener('click', function(){
    (document.getElementById('Postal2') as HTMLInputElement).value = "";
    (document.getElementById('Ste2') as HTMLInputElement).value = "";
    (document.getElementById('City2') as HTMLInputElement).value = "";
    (document.getElementById('Sta2') as HTMLInputElement).value = "";
});


var checkBtn = document.getElementById("addressCheck")! as HTMLInputElement;
//In caso venga flaggata la checkbox inseriamo i valori del Shipping Address all'interno del Billing Address
checkBtn.addEventListener('change', () => {
  if (checkBtn.checked) {
    console.log("checked");

    var shipping = getShipping();

    (document.getElementById('Postal2') as HTMLInputElement).value = shipping.postalCode;
    (document.getElementById('Ste2') as HTMLInputElement).value = shipping.street;
    (document.getElementById('City2') as HTMLInputElement).value = shipping.city;
    (document.getElementById('Sta2') as HTMLInputElement).value = shipping.state;

    (document.getElementById('Postal2') as HTMLInputElement).disabled = true;
    (document.getElementById('Ste2') as HTMLInputElement).disabled = true;
    (document.getElementById('City2') as HTMLInputElement).disabled = true;
    (document.getElementById('Sta2') as HTMLInputElement).disabled = true;
    (document.getElementById("resetBilling") as HTMLButtonElement).disabled = true;

    //Attivo il button Invia
    var btnInvia = document.getElementById("bInvia") as HTMLButtonElement;
    btnInvia.disabled = false;

  } else {
    console.log("Checkbox is not checked..");
    (document.getElementById('Postal2') as HTMLInputElement).value = "";
    (document.getElementById('Ste2') as HTMLInputElement).value = "";
    (document.getElementById('City2') as HTMLInputElement).value = "";
    (document.getElementById('Sta2') as HTMLInputElement).value = "";

    (document.getElementById('Postal2') as HTMLInputElement).disabled = false;
    (document.getElementById('Ste2') as HTMLInputElement).disabled = false;
    (document.getElementById('City2') as HTMLInputElement).disabled = false;
    (document.getElementById('Sta2') as HTMLInputElement).disabled = false;
    (document.getElementById("resetBilling") as HTMLButtonElement).disabled = false;
  
    //Disattivo button Invia
    var btnInvia = document.getElementById("bInvia") as HTMLButtonElement;
    btnInvia.disabled = true;
  }

});

//Controllo il cambiamento dei campi di input
function handleInputChange() {
  const postalCode = (document.getElementById('Postal') as HTMLInputElement).value;
  const street = (document.getElementById('Ste') as HTMLInputElement).value;
  const city = (document.getElementById('City') as HTMLInputElement).value;
  const state = (document.getElementById('Sta') as HTMLInputElement).value;

  const postalCodeBill = (document.getElementById('Postal2') as HTMLInputElement).value;
  const streetBill = (document.getElementById('Ste2') as HTMLInputElement).value;
  const cityBill = (document.getElementById('City2') as HTMLInputElement).value;
  const stateBill = (document.getElementById('Sta2') as HTMLInputElement).value;

// Se tutti i campi di imput del form di Shipping sono pieni si attiva il checkBox e si rimuove il messaggo di alert
  if (postalCode === "" || street === "" || city === "" || state === "") {
    checkBtn.disabled = true;
  } else {
    checkBtn.disabled = false;
    var paragrafBefore = document.querySelector(".contCheck p")!;
    paragrafBefore.innerHTML = "";
  }

// Se tutti i campi di entrambi i form sono pieni si attiva il button Invia
  if (postalCode === "" || street === "" || city === "" || state === "" || postalCodeBill === "" || streetBill === "" || cityBill === "" || stateBill === "") {
    var btnInvia = document.getElementById("bInvia") as HTMLButtonElement;
    btnInvia.disabled = true;
  } else {
    var btnInvia = document.getElementById("bInvia") as HTMLButtonElement;
    btnInvia.disabled = false;
  }
}

//Controllo durante l'inserimento nel form
const postalInput = document.getElementById('Postal') as HTMLInputElement;
const streetInput = document.getElementById('Ste') as HTMLInputElement;
const cityInput = document.getElementById('City') as HTMLInputElement;
const stateInput = document.getElementById('Sta') as HTMLInputElement;

const postalInputBill = (document.getElementById('Postal2') as HTMLInputElement);
const streetInputBill = (document.getElementById('Ste2') as HTMLInputElement);
const cityInputBill = (document.getElementById('City2') as HTMLInputElement);
const stateInputBill = (document.getElementById('Sta2') as HTMLInputElement);

postalInput.addEventListener('input', handleInputChange);
streetInput.addEventListener('input', handleInputChange);
cityInput.addEventListener('input', handleInputChange);
stateInput.addEventListener('input', handleInputChange);

postalInputBill.addEventListener('input', handleInputChange);
streetInputBill.addEventListener('input', handleInputChange);
cityInputBill.addEventListener('input', handleInputChange);
stateInputBill.addEventListener('input', handleInputChange);