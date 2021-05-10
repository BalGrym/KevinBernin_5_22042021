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
            // console.log(article) 
            displayTargetedArticle(article);


            var test = document.getElementById('buttonShopping');
            test.addEventListener('click', () => {
                getLocalStorageQuantity();
                setLocalStorage(article);
            });
        })
        .catch(function(err){
            alert(err)
        })
}


function getLocalStorageQuantity(){
    let productQuantity = localStorage.getItem('quantity');

    productQuantity = parseInt(productQuantity);

    if (productQuantity ){
        localStorage.setItem('quantity', productQuantity + 1);
    }else {
        localStorage.setItem('quantity', 1);
    }

}

function setLocalStorage(article){
    let  cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    
    if(cartItems != null){

        if(cartItems[article.name] == undefined) {
            cartItems = {
                ...cartItems,
                [article.name]: article
            }
        }

        if(cartItems[article.name].quantity == null){
            cartItems[article.name].quantity = 1;
        }else{
            cartItems[article.name].quantity += 1;
        }
        
    } else {
        cartItems = {
        [article.name]: article
        }
        cartItems[article.name].quantity = 1;
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


//implémente le produit cliqué en fonction de l'ID en HTML
function displayTargetedArticle(article) {
    document.getElementById('target_article').innerHTML += `
    <div class="col d-flex flex-column flex-md-row" id="">
        <img src="${article.imageUrl}" class="card-img-size">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><a href="product.html?id=">Ours en peluche - ${article.name} </a> </h5>
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