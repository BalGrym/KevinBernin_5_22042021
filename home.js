(async function() {
    const articles = await getArticles()

    for (article of articles){
        displayArticle(articles)
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

function displayArticle(){
    document.getElementById("listing_article").innerHTML += `
    <div class="col-12 mb-3 col-md-4 ">
        <div class="card">
            <img src="${article.imageUrl}">
            <div class="card-body">
                <h5 class="card-title"><a href="product.html?idourson">Ours en peluche - ${article.name} </a> </h5>
                <p class="card-text text-truncate">${article.description}</p>
                <span class="h5">${article.price}€</span>
            </div>
        </div>
    </div>`
}