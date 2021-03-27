function fetchAndRenderData() {
  fetch("https://webacademy.se/fakestore/")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      renderData(data);
    });
}

function getTitle(prodNr) {
  return document.getElementById(`productTitle` + prodNr).textContent;
}

function getPrice(prodNr) {
  return document.getElementById(`productPrice` + prodNr).textContent;
}

function getImage(prodNr) {
  return document.getElementById(`productImage` + prodNr).src;
}

function addToCart(title, image, price) {
  let myProduct = {
    myTitle: title,
    myImage: image,
    myPrice: price,
  };

  localStorage.setItem("myProduct", JSON.stringify(myProduct));
  window.location = `cart.html`;
}

function renderData(product, prodCount) {
  let output = "";
  var prodCount = 0;

  product.forEach((product, prodCount) => {
    var productObject = {
      title: product.title,
      image: product.image,
      price: product.price,
    };
    var productNumber = prodCount;
    var productObject = product;
    var productTitle = "" + product.title;
    output = `
    <div class="border border-primary">
    <img id="productImage${productNumber}" src="${product.image}" alt="${product.title}" class="img-fluid rounded mx-auto d-block" />
    <h4 class="text-center" id="productTitle${productNumber}">${product.title} </h4>
    <p>${product.description} </p>
    <p id="productPrice${productNumber}">${product.price}$</p>
    <p>
    <button class="btn btn-primary" onclick="addToCart(getTitle(${productNumber}), getImage(${productNumber}), getPrice(${productNumber}))">Order</button>
    </p>
    <p> </p>
    </div>
    `;
    console.log(output);
    document.getElementById("product-container").innerHTML += output;
    prodCount++;
  });
}

function validateEmail(inputText) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  console.log("email:" + inputText);
  if (inputText.match(mailformat)) {
    return "";
  } else {
    return "Invalid email adress\n";
  }
}

function validateName(inputText) {
  console.log("Name: " + inputText);
  if (inputText != "") {
    return "";
  } else {
    return "Invalid name\n";
  }
}

// avancerad phone validation - /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im (10 siffror)
function validatePhone(inputText) {
  console.log("Phone number: " + inputText);
  var re = /^[0-9]*$/;
  if (re.test(inputText)) {
    return "";
  } else {
    return "Invalid phone number\n";
  }
}

function validateAdress(inputText) {
  console.log("Adress: " + inputText);
  if (inputText != "") {
    return "";
  } else {
    return "Invalid adress\n";
  }
}

function loadCart() {
  let myProduct = JSON.parse(localStorage.getItem("myProduct"));
  console.log(myProduct);
  let html = `<img class="rounded img-fluid mx-auto d-block" src="${myProduct.myImage}" alt="Product image">
  <h5 class="text-center">${myProduct.myTitle}</h5>
  <p class="text-center">${myProduct.myPrice}</p>`;
  document.getElementById("cart-product").innerHTML = html;
}
