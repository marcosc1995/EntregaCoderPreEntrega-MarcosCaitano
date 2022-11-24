let allProducts;


function getFromApi() {
  fetch("http://localhost:8080/api/products")
    .then((res) => res.json())
    .then((data) => (allProducts = data))
    .then(() => printProducts(allProducts))
    // .then(() => {
    //   const btnFormTest = document.getElementById("btn1");
    //   btnFormTest.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     console.log(e);
    //     // const newName = {name:document.getElementById('productName1').value}
    //     // const putMethod = {
    //     //   method: 'PUT', // Method itself
    //     //   headers: {
    //     //    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
    //     //   },
    //     //   body: JSON.stringify(newName) // We send data in JSON format
    //     //  }

    //     //  function editProduct(url) {
    //     //   fetch(`http://localhost:8080/api/products/${url}`, putMethod)
    //     //   .then(response => response.json())
    //     //   .then(data => console.log(data))
    //     //   .catch(err => console.log(err))
    //     // }
    //     // editProduct(1)
    //   });
    // });
}
getFromApi();
function printProducts(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card m-1">
            <h2>${arr[i].nombre}</h2>
            <h4>Descripcion</h4>
            <p>${arr[i].description}</p>
            <img  class="img-fluid" src="${arr[i].img}" alt="">
            <p>Precio ${arr[i].price}</p>
            <p>Stock ${arr[i].stock}</p>
            <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#formP${arr[i].id}">modificar</button>
        </div>
        
        <form id="formP${arr[i].id}" class="form collapse" action="/api/products/${arr[i].id}"  name="productos">
        <h2>Modificar producto${arr[i].nombre}</h2>
        <div class="mb-3">
          <label for="productName${arr[i].id}" class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="productName${arr[i].id}"
            name="nombre"            
            placeholder="Nombre del Producto"
          />
        </div>       
        <button id="btn${arr[i].id}" class="btn btn-primary">Enviar</button>
      </form>
        `;
    testDiv.append(card);
  }
}
const testDiv = document.getElementById("test");
// const btnFormTest = document.getElementById("btn1");
// btnFormTest.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e);
//   // const newName = {name:document.getElementById('productName1').value}
//   // const putMethod = {
//   //   method: 'PUT', // Method itself
//   //   headers: {
//   //    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
//   //   },
//   //   body: JSON.stringify(newName) // We send data in JSON format
//   //  }

//   //  function editProduct(url) {
//   //   fetch(`http://localhost:8080/api/products/${url}`, putMethod)
//   //   .then(response => response.json())
//   //   .then(data => console.log(data))
//   //   .catch(err => console.log(err))
//   // }
//   // editProduct(1)
// });


// const putMethod = {
//   method: 'PUT', // Method itself
//   headers: {
//    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
//   },
//   body: JSON.stringify(someData) // We send data in JSON format
//  }

// function editProduct(url) {
//   fetch(`http://localhost:8080/api/products/${url}`, putMethod)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err))
// }
