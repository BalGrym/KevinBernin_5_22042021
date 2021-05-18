let orderId = localStorage.getItem('orderId');
console.log(orderId)
// orderId = JSON.parse(orderId);


function displayRecap() {
    let recapContainer = document.getElementById('containerRecap');

    recapContainer.innerHTML += `
    <div class="row">
        <p class="text-center">Votre commande à bien été accepté !</p>
        <p class="text-center">Votre colis sera expédié dans les plus bref délai</p>
        <p class="text-center">N° de commande : ${orderId}</p>
    </div>
    `
    localStorage.clear();
}

displayRecap();