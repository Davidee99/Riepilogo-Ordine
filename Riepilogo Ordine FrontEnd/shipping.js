"use strict";
function inviaForm() {
    // const form = document.getElementById('form1') as HTMLFormElement;
    // const formData = new FormData(form);
    // Costruisci l'URL con ancoraggio e passaggio dei dati
    const url = `summary.html`;
    // Redirigi alla pagina2.html con ancoraggio
    window.location.href = url;
    console.log('sono qui ');
}
const buttonInvia = document.getElementById('bInvia');
buttonInvia.addEventListener('click', (event) => {
    event.preventDefault();
    inviaForm();
});
