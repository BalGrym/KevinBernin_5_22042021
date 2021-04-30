
(async function() {
    const articles = await getArticles()
    displayTargetedArticle(articles)

    //Implémente les valeurs de l'array couleurs de l'article dans le HTML
    const colors = articles.colors;
    colors.forEach((element, i) =>{
        document.getElementById('color').innerHTML +=`
        <option value="${i+1}">${element}</option>`
    });
    
    // for (let article of Object.keys(articles.colors)){
    //      displayColorArticle(article)
    //      console.log(article)
    // }
})()

// Recuperation de l'ID dans l'URL 
function getId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams (queryString)
    const id = urlParams.get('id')
    return id;
}

//Fetch de l'API ours en peluche 
function getArticles(){
    return fetch(`http://localhost:3000/api/teddies/` + getId())
        .then(function(response){
           return response.json()
        })
        .then(function(articles){
            console.log(articles) 
            return articles
        })
        .catch(function(err){
            alert(err)
        })
}

//implémente le produit cliqué en fonction de l'ID en HTML
function displayTargetedArticle(articles) {
    document.getElementById('target_article').innerHTML += `
    <div class="col d-flex flex-column flex-md-row" id="">
        <img src="${articles.imageUrl}" class="w-50">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><a href="product.html?id=">Ours en peluche - ${articles.name} </a> </h5>
                <p class="card-text ">${articles.description}</p>
                <span class="h5">${articles.price / 100}€</span>
                <div>
                    <label for="color">Couleurs</label>
                    <select class="form-select" aria-label="Default select example" name="color" id="color">
                    </select>
                </div>
                <button type="button" class="btn btn-primary">Ajoutez à votre panier</button>
            </div>
        </div>
    </div> `
}

//Implémente dans le menu déroulant les différentes couleurs dans le HTML
function displayColorArticle(article) {
    document.getElementById('color').innerHTML +=`
    <option value="1">${article.colors}</option>`
}
