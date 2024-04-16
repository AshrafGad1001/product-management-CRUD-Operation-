let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let temp;
let searchMood = 'title';

function getTotal(){
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - (discount.value);
        total.innerHTML = "Total : " +result;
    }
}
let allProductData;
if (localStorage.product != null){
    allProductData = JSON.parse(localStorage.product);
}
else {
    allProductData = [];
}
submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };

    if (mood === 'create')
    {
        if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++)
        {
            allProductData.push(newProduct);
            }
        }
    else if(newProduct.count<1) {
        window.alert("Please Enter Vailed Number Of Product");      
    }
    else {
        allProductData.push(newProduct); 
    }
    }
    else {
        allProductData[temp] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Add Product';
        count.style.display = 'inline-block';
    }


    localStorage.setItem('product', JSON.stringify(allProductData));
    clearData();
    showData();
}
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
function showData() {
    
    let table = ``;
    for (let i = 0; i < allProductData.length; i++){
        table += `
            <tr>
              <th>${i}</th>
              <th>${allProductData[i].title}</th>
              <th>${allProductData[i].price}</th>
              <th>${allProductData[i].taxes}</th>
              <th>${allProductData[i].ads}</th>
              <th>${allProductData[i].discount}</th>
              <th>${allProductData[i].total}</th>
              <th>${allProductData[i].category}</th>
              <th><button onclick="updateData(${i})" class="update">update</button></th>
              <th><button onclick="deleteData(${i})" class="delete">Delete</button></th>
            </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    let deletebtn = document.getElementById('deleteAll');
    if (allProductData.length > 0) {
        deletebtn.innerHTML = `<button onclick="deleteAll()">Delete All(${allProductData.length})</button>`;
    }
    else {
        deletebtn.innerHTML = '';
    }

}
function deleteData(x) {
    allProductData.splice(x, 1);
    localStorage.product = JSON.stringify(allProductData);
    showData();
}
function deleteAll() {
    localStorage.clear();
    allProductData.splice(0);
    showData();
}
function updateData(i) {
    title.value = allProductData[i].title;
    price.value = allProductData[i].price;
    taxes.value = allProductData[i].taxes;
    ads.value = allProductData[i].ads;
    discount.value = allProductData[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = allProductData[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    temp = i; 
    scroll({
        top: 0,
        behavior:"smooth"
    });
}
function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Product Name';
    }
    else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();
}
function searchData(value) {
    let table = '';
    if (searchMood == 'title')
    {
        for (let i = 0; i < allProductData.length; i++){
            if (allProductData[i].title.toLowerCase().includes(value.toLowerCase())){
                 table += `
                        <tr>
                          <th>${i}</th>
                          <th>${allProductData[i].title}</th>
                          <th>${allProductData[i].price}</th>
                          <th>${allProductData[i].taxes}</th>
                          <th>${allProductData[i].ads}</th>
                          <th>${allProductData[i].discount}</th>
                          <th>${allProductData[i].total}</th>
                          <th>${allProductData[i].category}</th>
                          <th><button onclick="updateData(${i})" class="update">update</button></th>
                          <th><button onclick="deleteData(${i})" class="delete">Delete</button></th>
                        </tr>`; 
            }
        };

    }
    else {
        for (let i = 0; i < allProductData.length; i++){
                  if (allProductData[i].category.toLowerCase().includes(value.toLowerCase())){
                       table += `
                <tr>
                  <th>${i}</th>
                  <th>${allProductData[i].title}</th>
                  <th>${allProductData[i].price}</th>
                  <th>${allProductData[i].taxes}</th>
                  <th>${allProductData[i].ads}</th>
                  <th>${allProductData[i].discount}</th>
                  <th>${allProductData[i].total}</th>
                  <th>${allProductData[i].category}</th>
                  <th><button onclick="updateData(${i})" class="update">update</button></th>
                  <th><button onclick="deleteData(${i})" class="delete">Delete</button></th>
                </tr>`; 
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();
 