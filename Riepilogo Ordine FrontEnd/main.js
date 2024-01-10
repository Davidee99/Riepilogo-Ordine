// URL dell'API da chiamare
const productsUrl = 'http://localhost:8080/api/ProductController/getAll';

axios.get(productsUrl)
  .then(response => {
    console.log('Dati ricevuti dalla chiamata API:', response.data);
  })
  .catch(error => {
    console.error('Errore durante la chiamata API:', error.message);
  });

