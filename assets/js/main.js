const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'shirts',
      quantity: 20
    }
  ]

  function loadComponent() {
    const loader = document.getElementById("loader");
  
    setTimeout(() => {
        //Agrega la clase 'hide' al elemento loader
        loader.classList.add("hide");
    }, 3000);
  }

  document.addEventListener( "DOMContentLoaded", () =>{
    loadComponent() 
  })
  
const iconMenu = document.querySelector(".bx-menu");
const menu = document.querySelector(".menu");

iconMenu.addEventListener("click", function () {
    console.log(menu.classList.toggle("menu-show"));
});


const iconCart = document.querySelector(".bx-cart-alt");
const contentCartShop = document.querySelector(".box_cart");

iconCart.addEventListener("click", () => {

  contentCartShop.classList.toggle("contenCartShop_show");
});

const productsContent = document.getElementById('products__content')
const cartContainer = document.getElementById('cart__container')
const contentCartShopTotal = document.querySelector(".cart__prices-total");
const countProd = document.querySelector(".countProd");
let cart = {};

function addProduct(id) {
  const currentProduct = items.find((product) => product.id === id);

  if (currentProduct.quantity === cart[id].amount)
      return alert("No hay mas productos en el stock");

  cart[currentProduct.id].amount++;
}

function deleteProduct(id) {
  const op = confirm("Seguro que quieres eliminar?");

  if (op) {
      delete cart[id];
  }
}

function countProduct() {
  const arrayCartShop = Object.values(cart);

  let suma = arrayCartShop.reduce((acum, curr) => {
      acum += curr.amount;
      return acum;
  }, 0);

  countProd.textContent = suma;
}

function printTotal() {
  const arrayCartShop = Object.values(cart);

  if (!arrayCartShop.length)
      return (contentCartShopTotal.innerHTML = `<h3>Carrito vacio</h3>`);

  let total = arrayCartShop.reduce((acum, curr) => {
      acum += curr.price * curr.amount;
      return acum;
  }, 0);

  contentCartShopTotal.innerHTML = `
      <h3>$ ${total}</h3>
      <button class="btn btn__buy">Comprar</button>
  `;
}
function printInTableInfo() {
  let htmlInfo = "";
  items.forEach(({image, name, price, id, quantity})=>{
    const btnBuy = quantity
            ? `<button class="add" id="${id}">+</button>`
            : `<button class="btn btn__nodrop">No disponible</button>`;
      htmlInfo += `
      <div>
          <img src="${image}" alt="${name}">
          <p>${name}</p>
          <p>$ ${price}</p>
          <p>Stock: ${quantity}</p>
          <div class="product__options">${btnBuy}</div>
      </div>
       `;
  });
  productsContent.innerHTML = htmlInfo;
}






function pintarCart() {
  let html = "";
  const arrayCartShop = Object.values(cart);

  arrayCartShop.forEach (({id, name, price, image, amount})=>{
     
      html += `
      <div class="cart_img">
      <img src="${image}" alt="${name}">
      </div>
      <div class="cart_body">
      <p>${name}</p>
      <p><span>$ ${price}</span> - Cantidad:${amount} </p>
      <p>Sub Total: $ ${price*(amount)}</p>
      </div>
      <div class="cart__options">
      <button class="delete" type="button" id="${id}">-</button>
      <button class="add" type="button" id="${id}">+</button>
      <button class="del" type="button" id="${id}">del</button>
      </div>
      `
    });
 

  cartContainer.innerHTML = html;

  printTotal();
  countProduct();
}






productsContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
      const id= Number(e.target.id);

      const current= items.find((product) => product.id === id);

      if (cart[current.id]) {
          addProduct(id);
      } else {
          cart[current.id] = {...current};
          cart[current.id].amount = 1;
      }

      pintarCart();
  }
});


cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
      const id = Number(e.target.id);

      addProduct(id);
  }

  if (e.target.classList.contains("delete")) {
      const id = Number(e.target.id);
      
      if (cart[id].amount === 1) {
        deleteProduct(id);
      } else {
        cart[id].amount--;
      }
     
  }

  if (e.target.classList.contains("del")) {
      const id = Number(e.target.id);
      deleteProduct(id);
  }

  pintarCart();
});

contentCartShopTotal.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn__buy")) {
      const op = confirm("Estas seguro de esto?");

      if (op) {
          items = items.map((product) => {
              if (cart[product.id]?.id === product.id) {
                  return {
                      ...product,
                      quantity: product.quantity - cart[product.id].amount,
                  };
              } else {
                  return product;
              }
          });

          cart = {};
          printInTableInfo();
          pintarCart();
      }
  }
});

printInTableInfo();
printTotal();