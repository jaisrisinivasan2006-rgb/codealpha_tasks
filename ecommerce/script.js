let products = [
  { id: 1, name: "Laptop", price: 50000, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Mobile", price: 20000, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Headphones", price: 2000, img: "https://via.placeholder.com/200" }
];

let box = document.getElementById("products");

products.forEach(p => {
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <img src="${p.img}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick='view(${JSON.stringify(p)})'>View Product</button>
  `;
  box.appendChild(div);
});

function view(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location = "product.html";
}
