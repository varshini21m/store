const createSmallCards = (data) => {
  return `
    <div class="sm-product">
    <img src="${data.image}" alt="" class="sm-product-img">
    <div class="sm-text">
        <p class="sm-product-name">${data.name}</p>
        <p class="sm-des">${data.shortDes}</p>
    </div>
    <div class="item-counter">
        <button class="counter-btn decrement">-</button>
        <p class="item-count">${data.item}</p>
        <button class="counter-btn increment">+</button>
    </div>
    <p class="sm-price" data-price="${data.sellPrice}">$${
    data.sellPrice * data.item
  }</p>
    <button class="sm-delete-btn"><img src="img/close.png" alt=""></button>
</div>
    `;
};

let totalBill = 0;

const setProducts = (name) => {
  const element = document.querySelector(`.${name}`);

  let data = JSON.parse(localStorage.getItem(name));

  if (data && data.length === 0) {
    element.innerHTML = `<img src="../img/empty-cart.png" class="empty-img" alt="">`;
  } else {
    for (let i = 0; i < data.length; i++) {
      element.innerHTML += createSmallCards(data[i]);
      if (name === "cart") {
        totalBill += Number(data[i].sellPrice * data[i].item);
      }
      updateBill();
    }
  }

  setupEvents(name);
};

const updateBill = () => {
  let billPrice = document.querySelector(".bill");
  billPrice.innerHTML = `$${totalBill}`;
};

const setupEvents = (names) => {
  const counterMinus = document.querySelectorAll(`.${names} .decrement`);
  const counterPlus = document.querySelectorAll(`.${names} .increment`);
  const counts = document.querySelectorAll(`.${names} .item-count`);
  const price = document.querySelectorAll(`.${names} .sm-price`);
  const deleteBtn = document.querySelectorAll(`.${names} .sm-delete-btn`);

  let product = JSON.parse(localStorage.getItem(names));
  counts.forEach((item, i) => {
    let cost = Number(price[i].getAttribute("data-price"));
    counterMinus[i].addEventListener("click", () => {
      if (item.innerHTML > 1) {
        item.innerHTML--;
        totalBill -= cost;
        price[i].innerHTML = `$${item.innerHTML * cost}`;
        updateBill();
        product[i].item = item.innerHTML;
        localStorage.setItem(names, JSON.stringify(product));
      }
    });
    counterPlus[i].addEventListener("click", () => {
      if (item.innerHTML < 9) {
        item.innerHTML++;
        totalBill += cost;
        price[i].innerHTML = `$${item.innerHTML * cost}`;
        updateBill();
        product[i].item = item.innerHTML;
        localStorage.setItem(names, JSON.stringify(product));
      }
    });
  });
  deleteBtn.forEach((item, i) => {
    item.addEventListener("click", () => {
      product = product.filter((data, index) => index != i);
      localStorage.setItem(names, JSON.stringify(product));
      location.reload();
    });
  });
};

setProducts("cart");
setProducts("wishList");
