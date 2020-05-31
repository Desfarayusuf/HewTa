let carts = document.querySelectorAll(".add-cart");

let products = [{
        name: "Krebo",
        tag: "kreboblueb",
        price: 10000,
        inCart: 0,
    },

];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product,
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    productContainer.innerHTML = ``;

    if (cartItems && productContainer) {
        Object.values(cartItems).map((item) => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon class="remove-icon" name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price"><span>${item.price}</span></div>
            <div class="kuantitas">
                <ion-icon class="kurang" name="caret-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="tambah" name="caret-forward-outline"></ion-icon>
            </div>
            <div class="total">
                ${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    <span>${cartCost}</span>,00
                </h4>
        `;
    }
}

// decrease items

function removeItem() {
    let remove = document.querySelectorAll(".remove-icon");
    let kurang = document.querySelectorAll(".kurang");
    let tambah = document.querySelectorAll(".tambah");
    let nama = document.querySelectorAll(".product span");

    let productNumbers = localStorage.getItem("cartNumbers");
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost = localStorage.getItem("totalCost");

    productNumbers = parseInt(productNumbers);
    cartItems = JSON.parse(cartItems);
    cartCost = parseInt(cartCost);

    // if (productNumbers < 0) {
    //   localStorage.setItem("cartNumbers", 0);
    //   localStorage.setItem("totalCost", 0);
    //   localStorage.setItem("productsInCart", 0);
    //   location.reload();
    // }

    for (let i = 0; i < remove.length; i++) {
        remove[i].addEventListener("click", () => {
            if (cartItems && productNumbers >= 0 && cartCost >= 0) {
                for (let j = 0; j <= products.length; j++) {
                    if (products[j].name == nama[i].textContent) {
                        jumlah_barang = cartItems[products[j].tag].inCart;
                        localStorage.setItem("cartNumbers", productNumbers - jumlah_barang);
                        document.querySelector(".cart span").textContent = productNumbers - jumlah_barang;

                        localStorage.setItem("totalCost", cartCost - cartItems[products[j].tag].price * jumlah_barang);

                        delete cartItems[products[j].tag];
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                        document.querySelector(".cart span").textContent = productNumbers - jumlah_barang;
                        displayCart();
                        removeItem();
                        break;
                    }
                }
            }
        });
    }

    for (let i = 0; i < tambah.length; i++) {
        tambah[i].addEventListener("click", () => {
            if (productNumbers >= 0 && cartItems && cartCost >= 0) {
                for (let j = 0; j <= products.length; j++) {
                    if (products[j].name == nama[i].textContent) {
                        localStorage.setItem("cartNumbers", productNumbers + 1);

                        harga_per_barang = cartItems[products[j].tag].price;
                        localStorage.setItem("totalCost", cartCost + harga_per_barang);

                        cartItems[products[j].tag].inCart += 1;
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                        document.querySelector(".cart span").textContent = productNumbers + 1;
                        displayCart();
                        removeItem();
                        break;
                    }
                }
            }
        });
    }

    for (let i = 0; i < kurang.length; i++) {
        kurang[i].addEventListener("click", () => {
            if (productNumbers > 0 && cartCost > 0) {
                for (let j = 0; j <= products.length; j++) {
                    if (products[j].name == nama[i].textContent && cartItems[products[j].tag].inCart > 0) {

                        localStorage.setItem("cartNumbers", productNumbers - 1);

                        harga_per_barang = cartItems[products[j].tag].price;
                        localStorage.setItem("totalCost", cartCost - harga_per_barang);

                        cartItems[products[j].tag].inCart -= 1;
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                        document.querySelector(".cart span").textContent = productNumbers - 1;
                        displayCart();
                        removeItem();
                        break;
                    }
                }
            }
        });
    }
}

onLoadCartNumbers();
displayCart();
removeItem();