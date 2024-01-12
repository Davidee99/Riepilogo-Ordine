function inviaForm() {
    const form = document.getElementById('form1');
    const formData = new FormData(form);
    // Costruisci l'URL con ancoraggio e passaggio dei dati
    const url = `summary.html`;
    // Redirigi alla pagina2.html con ancoraggio
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
export { shippingAddress, billingAddress };
function getShipping() {
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
    return shippingAddress;
}
const buttonInvia = document.getElementById('bInvia');
buttonInvia.addEventListener('click', (event) => {
    event.preventDefault();
    shippingAddress = getShipping();
    billingAddress = getShipping();
    // inviaForm();
});
