let articleInCart = localStorage.getItem('cart');
articleInCart = JSON.parse(articleInCart);

function displayCart (){
    let cartContainer = document.getElementById('cartContainer');
    
    if(articleInCart) {
        Object.values(articleInCart).map(item => {
            cartContainer.innerHTML += `
                <div class="col cart-item">
                    <div class="card mb-3 d-flex flex-md-row">
                        <img class="card-img-size" src="${item.imageUrl}">
                        <div class="card-body">
                            <div class="d-flex row-md justify-content-between">
                                <h5 class="card-title">Ours en peluche - ${item.name}</h5>
                                <button type="button" class="btn btn-danger"  onclick="remove('${item._id}')">Supprimer</button>
                            </div>
                            <p class="card-text cart-quantity-input">Quantité : ${item.quantity}</p>
                            <div class="d-flex flex-row">
                                <p class="card-text me-4 cart-price">Prix Unitaire : ${item.price / 100}<span> €</span></p>
                                <p class="card-text">Prix Total : ${item.price * item.quantity / 100} €</p>
                            </div>
                        </div>
                    </div>
                </div>`
        })
    }
}


function hideForm() {
    if(articleInCart == ''){
        document.getElementById('formulaire').hidden = true;
        document.getElementById('total').hidden = true;
        document.getElementById('emptyCart').hidden = false;
    }
}

//Calcule le prix total de la commande
function calculTotalCost(){
    var cartItemContainer = document.getElementsByClassName('class-container')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for (let i = 0 ; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('cart-price')[0];
        var quantityElement = cartItem.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerHTML.replace('Prix Unitaire : ', ''));
        var quantity = parseFloat(quantityElement.innerHTML.replace('Quantité : ', ''));
        total = total + (price * quantity);
    }
    document.getElementById('totalCost').innerHTML = total + '€'
}
    
function remove(id){

    let result = articleInCart.filter(item => item._id !== id)

    console.log(result)
    
    localStorage.setItem('cart', JSON.stringify(result))
    document.location.reload();

}

const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function(e) {
    e.preventDefault()

    //Recupère tout les ID qui se trouvent dans articleInCart 
    let products = articleInCart.map(product => product._id);
    console.log(products);

    //Le FormData récupère les valeurs indiqué par l'utilisateur
    let fd = new FormData(myForm);
    let contact= {};

    //Boucle forEach qui va mettre les Key Values de chaque elements récupéré par le FormData dans l'object contact
    fd.forEach(function (value, key) {
        contact[key] = value;
    });

    let dataToSend = {contact, products};

    fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataToSend),
    }).then (function (response) {
        return response.text();
    }).then(function (text) {
        finalPage(text)
    }).catch(function (error) {
        e.preventDefault();
        console.error(error);
    })
});

function finalPage(text) {
    let getServerResponse = JSON.parse(text)
    let orderId = localStorage.setItem('orderId', getServerResponse.orderId)
    window.location = "/validation.html";
};

hideForm();
displayCart();
calculTotalCost()