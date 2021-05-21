const cartInit = localStorage.getItem('cart');
const init = () => {
    cartInit ? cartInit : localStorage.setItem('cart', JSON.stringify([]));
};
init();
const cart = JSON.parse(localStorage.getItem('cart'));

// Recuperation de l'ID dans l'URL 
function getId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams (queryString)
    const id = urlParams.get('id')
    return id;
}

//Fetch de l'API ours en peluche 
function getArticle(){
     fetch(`http://localhost:3000/api/teddies/` + getId())
        .then(function(response){
           return response.json()
        })
        .then(function(article){
            displayTargetedArticle(article);

            var test = document.getElementById('buttonShopping');
            test.addEventListener('click', () => {
                addToCart(article);
            });
        })
        .catch(function(err){
            alert(err)
        })
}


const addToCart = (article) => {
    const tempCart = cart;

    //result va chercher si dans le LocalStorage il y a un ID qui correspond à l'ID de l'article cliqué
    let result = tempCart.find((item) => item._id == article._id);

    //Si result retourne undefined, on met l'article dans le localStorage avec la quantité
    if (!result) {
        tempCart.push( {
            name: article.name,
            _id: article._id,
            imageUrl: article.imageUrl,
            price: article.price,
            quantity: 1,
        });
        localStorage.setItem('cart', JSON.stringify(tempCart));
        return;
    }

    //L'ID de l'article cliqué est identique à un ID présent dans le localStorage alors on ajoute +1 à la quantité
    tempCart.map((item) => {
        if (item._id == article._id) {
            item.quantity += 1;
        }
    });
    localStorage.setItem('cart', JSON.stringify(tempCart));
};


//implémente le produit cliqué en fonction de l'ID en HTML
function displayTargetedArticle(article) {
    document.getElementById('target_article').innerHTML += `
    <div class="col d-flex flex-column flex-lg-row" id="">
        <img src="${article.imageUrl}" class="image-product">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Ours en peluche - ${article.name} </h5>
                <p class="card-text ">${article.description}</p>
                <span class="h5">${article.price / 100}€</span>
                <div>
                    <label for="color">Couleurs</label>
                    <select class="form-select" aria-label="Default select example" name="color" id="color">
                    </select>
                </div>
                <button type="button" class="btn btn-primary" id="buttonShopping">Ajoutez à votre panier</button>
            </div>
        </div>
    </div> `

    //Implémente les différentes couleurs du produit en HTML
    const colors = article.colors;
    colors.forEach((element, i) =>{
        document.getElementById('color').innerHTML +=`
        <option value="${i+1}">${element}</option>`
    });
}

getArticle();