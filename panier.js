function displayCart (){
    let articleInCart = localStorage.getItem('productsInCart');
    articleInCart = JSON.parse(articleInCart);
    let cartContainer = document.getElementById('cartContainer');
    
    if(articleInCart) {
        Object.values(articleInCart).map(item => {
            cartContainer.innerHTML += `
                <div class="col">
                    <div class="card mb-3 d-flex flex-md-row">
                        <img class="card-img-size" src="${item.imageUrl}">
                        <div class="card-body">
                            <div class="d-flex row-md justify-content-between">
                                <h5 class="card-title">Ours en peluche - ${item.name}</h5>
                                <button type="button" class="btn btn-danger">Supprimer</button>
                            </div>
                            <p class="card-text">Quantité : <input type"number" min="1" max="10" value=" ${item.quantity}" ></p>
                            <div class="d-flex flex-row">
                                <p class="card-text me-4">Prix Unitaire : ${item.price / 100} €</p>
                                <p class="card-text">Prix Total : ${item.price * item.quantity / 100} €</p>
                                <p class="card-text">Prix Total dela commande  : ${item.price * item.quantity / 100} €</p>
                            </div>
                        </div>
                    </div>
                </div>`
        })
    }

    let buttonDel = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < buttonDel.length; i++){
        let button = buttonDel[i]
        button.addEventListener('click', function() {
            
            let selectedLocalStorage = localStorage.getItem('productsInCart');
            selectedLocalStorage = JSON.parse(selectedLocalStorage);

            Object.values(selectedLocalStorage).map(item => {
                console.log(item)
                if(item.quantity > 1 ){
                    item.quantity -= 1;
                    console.log(item.quantity)
                }else{
                    delete(item)
                }
                localStorage.setItem("productsInCart", JSON.stringify(selectedLocalStorage));
            })
        })
    }
    
}
    


displayCart();