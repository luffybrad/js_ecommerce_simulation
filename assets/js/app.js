const products = [
  {
    name: "Windbreaker Jacket",
    price: 14.99,
    id: 1,
    quantity: 1,
    discount: 29.99,
    img1: "details-1.png",
    img2: "details-2.png",
    img3: "details-3.png",
    img4: "details-4.png",
  },
  {
    name: "Air Jordan Zipper",
    price: 11.99,
    id:3,
    quantity: 1,
    discount: 21.99,
    img1: "new-2.png",
    img2: "new-3.png",
    img3: "new-4.png",
    img4: "product-5.png",
    
  }
];

const productsHTML = products.map(
  (product) => 
  `
  <div class="details__container grid">
              <div class="product__images grid">
                  <div class="product__img">
                      <div class="details__img-tag">New</div>
                      <img src="assets/img/${product.img1}" alt="">
                  </div>
                  <div class="product__img">
                      <img src="assets/img/${product.img2}" alt="">
                  </div>
                  <div class="product__img">
                      <img src="assets/img/${product.img3}" alt="">
                  </div>
                  <div class="product__img">
                      <img src="assets/img/${product.img4}" alt="">
                  </div>
              </div>

              <div class="product__info">
                  <p class="details__subtitle">Women > Jacket's</p>
                  <h3 class="details__title">
                  ${product.name}
                  </h3>

                  <div class="rating">
                      <div class="stars">
                          <i class="bx bxs-star"></i>
                          <i class="bx bxs-star"></i>
                          <i class="bx bxs-star"></i>
                          <i class="bx bxs-star"></i>
                          <i class="bx bx-star"></i>
                      </div>
                      <span class="reviews__count">40 + Reviews</span>
                  </div>

                  <div class="details__prices">
                      <span class="details__price">
                      $${product.price}
                      </span>
                      <span class="details__discount">$${product.discount}</span>
                      <span class="discount__percentage">50% OFF</span>
                  </div>

                  <div class="details__description">
                      <h3 class="description__title">Product Details</h3>
                      <div class="description__details">
                          <p>Light Gray solid Top, has a boat neck, 3/4 sleeves</p>
                      </div>
                  </div>

                  <div class="cart__amount">
                      <div class="cart__amount-content">
                          <span class="cart__amount-box">
                              <i class="bx bx-minus"></i>
                          </span>

                          <span class="cart__amount-number">1</span>

                          <span class="cart__amount-box">
                              <i class="bx bx-plus"></i>
                          </span>
                      </div>

                      <i class="bx bx-heart cart__amount-heart"></i>
                  </div>

                  <button onclick="myVar = setTimeout(myFunction, 200)" class="button product-btn" id=${product.id}>Add to Cart</button>

              </div>
          </div>
          <br>
  `
);

function myFunction() {
  alert('Item Added to Cart');
}
const result = document.querySelector(".result");
result.innerHTML = productsHTML.join("");

let kart = [];

function addToCart(products, id){
  const product = products.find((product) => product.id === id);
  const kartProduct = kart.find((product) => product.id === id);
  if (kartProduct != undefined && product.id == kartProduct.id) {
    incrItem(id);
  } else {
    kart.unshift(product);
  }
  updateCart();
  getTotal(kart);
};


function getTotal(kart) {
  let { totalItem, kartTotal } = kart.reduce(
    (total, kartItem) => {
      total.kartTotal += kartItem.price * kartItem.quantity;
      total.totalItem += kartItem.quantity;
      return total;
    },
    { totalItem: 0, kartTotal: 0 }
  );
  const totalItemsHTML = document.querySelector(".noOfItems");
  totalItemsHTML.innerHTML = `${totalItem} items`;
  const totalAmountHTML = document.querySelector(".total");
  totalAmountHTML.innerHTML = `$${kartTotal}`;
}

getTotal(kart);

let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {
  document
    .querySelectorAll(".product-btn")
  [i].addEventListener("click", function (e) {
    addToCart(products, parseInt(e.target.id));
  });
}

function updateCart() {
  const kartHTML = kart.map(
    (item) => 
      `
               <article class="cart__card">
                   <div class="cart__box">
                       <img src="assets/img/${item.img1}" alt="" class="cart__img">
                   </div>
   
                   <div class="cart__details">
                       <h3 class="cart__title">${item.name}</h3>
                       <span class="cart__price">$${item.price}</span>
   
                       <div class="cart__amount">
                           <div class="cart__amount-content">
                               <span class="cart__amount-box">
                                   <button onclick={decrItem(${item.id})}>-</button>
                               </span>
   
                               <span class="cart__amount-number">${item.quantity}</span>
   
                               <span class="cart__amount-box">
                                   <button onclick={incrItem(${item.id})}>+</button>
                               </span>
                           </div>
   
                           
                           <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}>
                           <i class="bx bx-trash-alt cart__amount-trash"></i>
                           </button>
                       </div>
                   </div>
               </article>
          
                 `
  );

  const kartItems = document.querySelector(".kart-items");
  kartItems.innerHTML = kartHTML.join("");
}

function deleteItem(id) {
  for (let i = 0; i < kart.length; i++) {
    if (kart[i].id === id) {
      kart[i].quantity = 1;
      kart.splice(i, 1);
    }
  }
  updateCart();
  getTotal(kart);
}

function decrItem(id) {
  for (let i = 0; i < kart.length; i++) {
    if (kart[i].id == id && kart[i].quantity > 1) {
      kart[i].quantity -= 1;
    }
  }
  updateCart();
  getTotal(kart);
}

function incrItem(id) {
  for (let i = 0; i < kart.length; i++) {
    if (kart[i] && kart[i].id == id) {
      kart[i].quantity += 1;
    }
  }
  updateCart();
  getTotal(kart);
}

updateCart();
