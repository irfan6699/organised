fetch('navbar.html')
        .then(response=>response.text())
        .then(data=>{
            document.querySelector(`.nav`).innerHTML=data;
            run();
            runafterattach();
        })
        function runafterattach(){
            // Change heart icon functionality
            
            // Redirect with zoom effect
            const redirectWithZoom = (targetUrl) => {
                document.body.classList.add('zoom-out-active');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); // Match this duration with the CSS transition duration
            };
            
            // Navbar redirection
            const directTra = document.getElementById('tra');
            if (directTra) {
                directTra.addEventListener('click', () => redirectWithZoom("shopping.html"));
            }
            const story = document.querySelector('.more');
            if (story) {
                story.addEventListener('click', () => redirectWithZoom("stories.html"));
            }
            let home = document.querySelector('.logo');
            if (home) {
                home.addEventListener("click", () => {
                    window.location.href = "index.html";
                });
            }
            const loginpg = document.getElementById('login');
            if (loginpg) {
                loginpg.addEventListener('click', () => redirectWithZoom("loginpg.html"));
            }
            
            const stories = document.getElementById('story');
            if (stories) {
                stories.addEventListener('click', () => redirectWithZoom("stories.html"));
            }
            
            }
            function run() {
                let listProductHTML = document.querySelector('.listProduct');
                let listCartHTML = document.querySelector('.listCart');
                let iconCart = document.querySelector('.icon-cart');
                let iconCartSpan = document.querySelector('.icon-cart span');
                let products = [];
                let cart = [];
            
                // Redirect to cart page instead of toggling
                iconCart.addEventListener('click', () => {
                    window.location.href = "cart.html";
                });
            
                // Add product data to HTML
                const addDataToHTML = () => {
                    listProductHTML.innerHTML = ''; // Clear existing data
                    if (products.length > 0) {
                        products.forEach(product => {
                            let newProduct = document.createElement('div');
                            newProduct.dataset.id = product.id;
                            newProduct.classList.add('item');
                            newProduct.innerHTML = `
                                <img src="${product.image}" alt="">
                                <h2>${product.name}</h2>
                                <div class="price">${product.price}</div>
                                <button class="addCart">Add To Cart</button>`;
                            listProductHTML.appendChild(newProduct);
                        });
                    }
                };
            
                listProductHTML.addEventListener('click', (event) => {
                    let positionClick = event.target;
                    if (positionClick.classList.contains('addCart')) {
                        let id_product = positionClick.parentElement.dataset.id;
                        addToCart(id_product);
                    }
                });
            
                const addToCart = (product_id) => {
                    let positionThisProductInCart = cart.findIndex(value => value.product_id == product_id);
                    if (cart.length <= 0) {
                        cart = [{ product_id: product_id, quantity: 1 }];
                    } else if (positionThisProductInCart < 0) {
                        cart.push({ product_id: product_id, quantity: 1 });
                    } else {
                        cart[positionThisProductInCart].quantity += 1;
                    }
                    addCartToHTML();
                    addCartToMemory();
                };
            
                // Local storage for cart
                const addCartToMemory = () => {
                    localStorage.setItem('cart', JSON.stringify(cart));
                };
            
                const addCartToHTML = () => {
                    listCartHTML.innerHTML = '';
                    let totalQuantity = 0;
                    let grandTotal = 0; // Variable to store the total price
            
                    if (cart.length > 0) {
                        cart.forEach(item => {
                            totalQuantity += item.quantity;
                            let newItem = document.createElement('div');
                            newItem.classList.add('item');
                            newItem.dataset.id = item.product_id;
            
                            let positionProduct = products.findIndex((value) => value.id == item.product_id);
                            let info = products[positionProduct];
                            let totalPrice = info.price * item.quantity; // Calculate total price for each product
            
                            grandTotal += totalPrice; // Add product's total to grand total
            
                            listCartHTML.appendChild(newItem);
                            newItem.innerHTML = `
                                <div class="image">
                                    <img src="${info.image}">
                                </div>
                                <div class="name">${info.name}</div>
                                <div class="totalPrice">${totalPrice}</div>
                                <div class="quantity">
                                    <span class="minus">-</span>
                                    <span class="number">${item.quantity}</span>
                                    <span class="plus">+</span>
                                </div>
                            `;
                        });
                    }
                    iconCartSpan.innerText = totalQuantity;
                    document.getElementById('totalPrice').innerText = grandTotal;
                }
            
                const initApp = () => {
                    fetch('products.json')
                        .then(response => response.json())
                        .then(data => {
                            products = data;
                            addDataToHTML();
            
                            // Get cart data from local storage
                            if (localStorage.getItem('cart')) {
                                cart = JSON.parse(localStorage.getItem('cart'));
                                addCartToHTML();
                            }
                        });
                };
            
                initApp();
            }
            