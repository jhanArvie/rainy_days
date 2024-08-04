const femalebtn = document.getElementById("femalebtn");
const malebtn = document.getElementById("malebtn");
const jacketChoices = document.querySelector(".jacket-choices")
const productInfo = document.querySelector(".product-info");


const API_URL =  "https://api.noroff.dev/api/v1/rainy-days";
let allProducts = []; /* from emtpy to list of genderfiltered */


async function fetchData() {
    try {
            const response = await fetch(API_URL);
            if(!response.ok){
                throw new Error("Could not fetch resource from Server");
            }
            
            let products = await response.json();
            allProducts = products; /* change the value of empty array */
    }
        catch (error) {
            console.log(error);
    }
};

fetchData().then(() => {
    const filterdProduct =  getProductsByGender("Male"); /* default grid list is male products */
    createProductList(filterdProduct); /* called the function to for default gird of imgages that show on page*/
    productDetails(filterdProduct[0]) /* called the function to for hero informations */
})

function getProductsByGender(gender){ 
    return allProducts.filter( allProducts => allProducts.gender === gender); /* filter the product with gender parameter that matches the  */
}

malebtn.addEventListener("click", () => {
    let genderFilter =  getProductsByGender("Male"); /* called the function and matched the parameter asked */
    createProductList(genderFilter); /* tell the function to show the product list */
})
femalebtn.addEventListener("click", () => {
    let genderFilter =  getProductsByGender("Female"); /* called the function and matched the parameter asked */
    createProductList(genderFilter); /* tell the function to show the product list */
})

jacketChoices.addEventListener("click", (event) => {
    const target = event.target.parentElement
    const id = target.id
    let oneProduct = allProducts.find( p => p.id === id) 
    productDetails(oneProduct)
})

function createProductList(products) {
    jacketChoices.innerHTML = "";
    products.forEach(product => {
    jacketChoices.innerHTML += `
        <div>
              <button id="${product.id}"><img src="${product.image}" alt="${product.title}" /></button>
        </div>
        `
    });
    
}

function productDetails(product) {
    let sizeList = "";
    product.sizes.forEach(size => {
        sizeList += `
            <li>${size}</li>
        `
    }) 
    productInfo.innerHTML ="";
    productInfo.innerHTML = `
    <div class="hero-product-img">
            <img
              src="${product.image}"
              alt="${product.title}"
            />
          </div>
          <div class="main-prod-name">
            <h3>${product.title}</h3>
          </div>
          <div class="price-size-container">
            <h4 class="price">kr ${product.price}</h4>
            <div class="sizes-container">
              <ul>${sizeList}
              </ul>
            </div>
          </div>
          <div class="line-divider"></div>
          <div class="description-rating-container">
            <h6>Description</h6>
            <div class="rating">
              <img src="./assets/icons/star_rating.png" alt="Star Rating" />
              <p><strong>4.5</strong> (300)</p>
            </div>
          </div>
    `  
}