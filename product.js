(async function() {
    const articles = await getArticles()

    for (article of articles){
        if(getId() === article._id){
            displayTargetedArticle()
        }
    }

    for (article of articles){
        if(article.colors != undefined){
            console.log(article.colors)
            displayColorArticle() 
        }
    }
})()

function getArticles(){
    return fetch("http://localhost:3000/api/teddies/")
        .then(function(response){
           return response.json()
        })
        .then(function(articles){
            //console.log(articles)
            return articles
        })
        .catch(function(err){
            alert(err)
        })
}

function getId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams (queryString)
    const id = urlParams.get('id')
    return id;
}

function displayTargetedArticle() {
    document.getElementById('target_article').innerHTML += `
    <div class="col d-flex flex-column flex-md-row" id="">
        <img src="${article.imageUrl}" class="w-50">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><a href="product.html?id=${article._id}">Ours en peluche - ${article.name} </a> </h5>
                <p class="card-text ">${article.description}</p>
                <span class="h5">${article.price / 100}€</span>
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

function displayColorArticle() {
    document.getElementById('color').innerHTML +=`
    <option value="1">${article.colors}</option>
    
    `
}

// <option value="1">${article.color}</option>
// <option value="1">${article.color}</option>
// <option value="1">${article.color}</option>
// <option value="1">${article.color}</option>