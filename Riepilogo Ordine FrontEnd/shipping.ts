function inviaForm() {
  const form = document.getElementById('form1') as HTMLFormElement;
  const formData = new FormData(form);


  // Costruisci l'URL con ancoraggio e passaggio dei dati
  const url = `summary.html`;

  // Redirigi alla pagina2.html con ancoraggio
  window.location.href = url;
  console.log('sono qui ');

}
console.log('sono qui 2');


interface Address {
  postalCode: string,
  street: string,
  city: string,
  state: string
}
var shippingAddress:Address = {
  postalCode: '',
  street: '',
  city: '',
  state: ''
} as Address;

var billingAddress:Address = {
  postalCode: '',
  street: '',
  city: '',
  state: ''
} as Address;



function getShipping(){
console.log('sono qui 4');
  // Recupera i valori inseriti nel form
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
console.log(shippingAddress);
  return shippingAddress;
}

try {
  const buttonInvia = document.getElementById('bInvia')!;
buttonInvia.addEventListener('click', (event: Event) => {
  console.log('sono qui 3');
  event.preventDefault();
  shippingAddress = getShipping();
billingAddress = getShipping();
  console.log(shippingAddress);
  console.log(billingAddress);
  localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  localStorage.setItem("billingAddress", JSON.stringify(billingAddress));
  inviaForm();
})
  
} catch (error) {
  console.log(error);
  
}



// export { shippingAddress, billingAddress };
