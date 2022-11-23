let allProducts;
// const productos = fetch("http://localhost:8080/api/products")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

function getFromApi() {
  fetch("http://localhost:8080/api/products")
    .then((res) => res.json())
    .then((data) => allProducts = data)
    .then(data => printProducts(allProducts))    
}
getFromApi()

const testDiv = document.getElementById('test')
function printProducts(arr) {
    for (let i = 0; i < arr.length; i++) {
        const card = document.createElement('div')
        card.innerHTML = `
        <div class="card m-1">
            <h2>${arr[i].nombre}</h2>
            <h4>Descripcion</h4>
            <p>${arr[i].description}</p>
            <img  class="img-fluid" src="${arr[i].img}" alt="">
            <p>Precio ${arr[i].price}</p>
            <p>Stock ${arr[i].stock}</p>
            <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#p${arr[i].id}">modificar</button>
        </div>
        
        <form id="p${arr[i].id}" class="form collapse" action="/api/products/${arr[i].id}" method="put" name="productos">
        <h2>Modificar producto${arr[i].nombre}</h2>
        <div class="mb-3">
          <label for="productTitle" class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="productTitle"
            name="nombre"            
            placeholder="Nombre del Producto"
          />
        </div>       
        <button class="btn btn-primary">Enviar</button>
      </form>
        `
        testDiv.append(card)
        
    }
    
}