const url= "https://striveschool-api.herokuapp.com/api//"
const token= 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU5YTA2MTUxNWY0MTAwMTQ2OTc4Y2IiLCJpYXQiOjE2OTMwMzI1NDUsImV4cCI6MTY5NDI0MjE0NX0.80jH8eoE4uD_EYzeJ_e-D9ejuGN5gEK7AXCIvxmaWv4"

const form = document.getElementById('product-form');

const productIdInput = document.getElementById('product-id');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageInput = document.getElementById('url');
const priceInput = document.getElementById('price');


form.addEventListener('submit', async (event)) => {

    event.preventDefault();
  
    const isFormValid = handelFormValidation();
    if (!isFormValid) return false;
  
  
    const product = {
      name: nameInput.value,
      description: descriptionInput.value,
      brand: brandInput.value,
      imageUrl: imageUrlInput.value,
      price: priceInput.value
    }

    console.log (product)

    try 

    const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $(token)'
        }
      })
  

     if (response.ok) {
        window.location.href = 'info.html' 
      } else {
        alert('Si è verificato un errore durante la creazione dell\'utente.')
      }
      
      
    } catch (error) {
      console.log('Errore durante il salvataggio: ', error);
      alert('Si è verificato un errore durante il salvataggio.')
    }
    

  function validateForm() {
    const errors = {}
  
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const brand = document.getElementById('brand').value
    const url = document.getElementById('url').value
    const price = document.getElementById('price').value
  
    if (!name) errors.name = "Il campo nome è obbligatorio."
    else errors.name = "";
  
    if (!description) errors.description = "Il campo descrizione è obbligatorio."
    else if (!/\S+@\S+\.\S+/.test(description)) errors.email = "Inserisci una descrizione valida" 
    else errors.description /= "";
  
    if (!brand) errors.brand = "Il campo brand è obbligatorio."
    else errors.brand = "";
  
    if (!url) errors.url = "Il campo url è obbligatorio."
    else errors.url = "";
  
    if (!price) errors.price = "Il campo prezzo è obbligatorio."
    else errors.price = "";
  
  
  
    return {
      isValid: Object.values(errors).every(value => value === ''),
      errors
    }
    
  }
  
  
  function goBack() {
    window.location.href = 'index.html' 
  }
  
  function buildTitle(userId) {
    const pageTitle = document.getElementById('page-title');
    pageTitle.innerHTML = userId ? 'Modifica utente' : 'Crea nuovo utente';
  }
  
  async function getUserData() {
    const qsParams = new URLSearchParams(window.location.search);
    const userId = qsParams.get('id')
  
    buildTitle(userId);
  
    if (userId) {
      // MODIFICA UTENTE
  
      try {
        const response = await fetch(`${API_URL}users/${userId}`);
        const user = await response.json(); 
        
        setTimeout( () => {
          document.querySelector('.spinner-container').classList.add('d-none');
          document.querySelector('#user-form').classList.remove('d-none');
        }, 500)
  
        if (!('name' in user)) {
          console.log('L\'utente non esiste');
          return
        }
      
        userIdInput.value = user.id;
        nameInput.value = user.name;
        descriptionInput.value = user.description;
        brandInput.value = user.brand;
        urlInput.value = user.url;
        priceInput.value = user.price;
  
      } catch (error) {
        console.log('Errore nel recupero degli utenti: ', error);
      }
      
      
    } else {
      // CREAZIONE UTENTE
      document.querySelector('.spinner-container').classList.add('d-none');
      document.querySelector('#user-form').classList.remove('d-none');
    }
  
    
  }
  
  
  getUserData()
  
  
  
  