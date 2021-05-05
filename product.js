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
        })
        .catch(function(err){
            alert(err)
        })
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

getArticle()
    
var test = document.getElementById('test');

test.addEventListener('click', sayHello);

function sayHello(){
  console.log('hello');
}