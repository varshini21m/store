window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  }
};

const placeOrderBtn = document.querySelector(".place-order-btn");
placeOrderBtn.addEventListener("click", () => {
  let address = getAddress();

  if (address) {
    fetch('/order', {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
          order: JSON.parse(localStorage.cart),
          email: JSON.parse(sessionStorage.user).email,
          add: address,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        showAlert(data.alert,'success');
        if(data.alert == 'your order is placed'){
          delete localStorage.cart;
          showAlert(data.alert,'success');
        }else{
          showAlert(data.alert );
        }
      })
  }
}) 

const getAddress = () => {
  let addresss = document.querySelector("#address").value;
  let street = document.querySelector("#street").value;
  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;
  let pincode = document.querySelector("#pincode").value;
  let landmark = document.querySelector("#landmark").value;

  if (
    !addresss.length ||
    !street.length ||
    !city.length ||
    !state.length ||
    !pincode.length ||
    !landmark.length
  ) {
    return showAlert("fill all the inputs first");
  } else {
    return {
      addresss,
      street,
      city,
      state,
      pincode,
      landmark,
    };
  }
};
