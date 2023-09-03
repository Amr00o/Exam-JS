// sideBar
let sideBarinnerWidth = $(".sideBar-inner").innerWidth();
$("#sideBar").css('left', -sideBarinnerWidth)
$(".fa-bars").click(function () {
    if ($("#sideBar").css('left') == "0px") {
        $("#sideBar").animate({left:-sideBarinnerWidth}, 600)
    }
    else{
        $("#sideBar").animate({left:"0"}, 600)
    }  
})


// loading

$(document).ready(function () {

    $(".loader").fadeOut(500 , function () {
        $("#loading").fadeOut(1000 , function () {

            $("body").css('overflow' , 'auto');
            $("#loading").remove();
        })  
    })
})


// home
const apiItem = document.getElementById("apiItem");
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
async function getData() {
  try {
      const res = await fetch(BASE_URL);
      const dataWrapper = await res.json();
      const data = dataWrapper.meals;
      displayData(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}
getData() 

function displayData(data) {
  let allHtml = "";
  data.forEach(element => {
    allHtml +=`<div class="col-md-3">
    <div class="item position-relative overflow-hidden">
            <img class="w-100 rounded-2" src="${element.strMealThumb}" alt="">
            <div class="caption bg-light opacity-75 rounded-2 position-absolute text-black">
            <p class="pt-3 fw-semibold fs-2">${element.strMeal}</p>
        </div>
    </div>
</div>`;
    
  });
apiItem.innerHTML = allHtml;
}

// search

const searchLink = document.getElementById("searchLink");
const searchSec = document.getElementById("search")

function showSearch() {
    searchSec.style.display = "block";
    apiItem.style.display = "none";
    areaSec.style.display = "none";
    ingSec.style.display = "none";
    categoriesSec.style.display = "none";
    conSec.style.display = "none";
}

searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSearch(); 
});



// Categories
const apiCat = document.getElementById("apiCat");
const BASE_URL2 = 'https://www.themealdb.com/api/json/v1/1/categories.php';

async function getCat() {
  try {
    showLoader();
    const res = await fetch(BASE_URL2);
    const dataWrapper = await res.json();
    const data = dataWrapper.categories;
    displayCat(data);
    hideLoader();
  } catch (error) {
    console.error('Error fetching data:', error);
    hideLoader();
  }
}

getCat();

function showLoader() {
    $(".loader").fadeIn(500);
    $("#loading").fadeIn(1000);
    $("body").css('overflow', 'hidden');
}

function hideLoader() {
    $(".loader").fadeOut(500, function () {
        $("#loading").fadeOut(1000, function () {
            $("body").css('overflow', 'auto');
            $("#loading").remove();
        });
    });
}

function displayCat(data) {
  let dataCa = "";
  data.forEach(element => {
    dataCa += `<div class="col-md-3">
      <div class="item position-relative overflow-hidden">
        <img class="w-100 rounded-2" src="${element.strCategoryThumb}" alt="">
        <div class="caption2 bg-light opacity-75 rounded-2 position-absolute text-black text-center">
          <h3>${element.strCategory}</h3>
          <p class="ms-2">${element.strCategoryDescription}</p>
        </div>
      </div>
    </div>`;
  });
  apiCat.innerHTML = dataCa;
}

const categoriesLink = document.getElementById("categoriesLink");
const categoriesSec = document.getElementById("categories")

function showCategories() {
    searchSec.style.display = "none";
    apiItem.style.display = "none";
    areaSec.style.display = "none";
    ingSec.style.display = "none";
    categoriesSec.style.display = "block";
    conSec.style.display = "none";
}

categoriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showCategories(); 
});




// Api area
const mainContainer = document.querySelector('.mainContainer');
const mContainer = document.querySelector('.container');
const BASE_URL3 = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"; 
async function getCountries() {
    try {
        const res = await fetch(BASE_URL3);
        const data = await res.json();
        displayCountry(data.meals);
        
    } catch(err) {
        console.log('Error fetching data:', err);
    }
}
getCountries();

async function getMealsByCountry(contry){
    try{
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${contry}`)
    const data = await res.json();
    displayMeals(data.meals);
    }
    catch(err) {
        console.log('Error fetching data:', err);
    }
}

function displayCountry(data) {
    let dataCont = '';
    data.forEach((el) => {
        const box = `<div class="col-md-3 bg-transparent text-white border-0">
        <div class=""><i class="fa-solid fa-house fa-4x"></i></div>
            <h3 class="fs-4">${el.strArea}</h3>
        </div>`;
        dataCont += box;
    });
    mainContainer.innerHTML += dataCont;
}

function displayMeals(data) {
    let dataCont = '';
    data.forEach(element => {
            const box =`<div class="col-md-3">
            <div class="item position-relative overflow-hidden">
                    <img class="w-100 rounded-2" src="${element.strMealThumb}" alt="">
                    <div class="caption bg-light opacity-75 rounded-2 position-absolute text-black">
                    <p class=" ms-2 pt-3 fw-semibold fs-2">${element.strMeal}</p>
                </div>
            </div>
        </div>`;
        dataCont += box;
    });
    mainContainer.innerHTML = dataCont;
}

mainContainer.addEventListener('click', (e) => {
    if (e.target !== mainContainer) {
        getMealsByCountry(e.target.innerText);
    };
})


const areaLink = document.getElementById("areaLink");
const areaSec = document.getElementById("area");

function showAreas() {
    searchSec.style.display = "none";
    apiItem.style.display = "none";
    categoriesSec.style.display = "none";
    ingSec.style.display = "none";
    areaSec.style.display = "block";
    conSec.style.display = "none";
}

areaLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAreas();
});



// ingredients
const mainCont = document.querySelector('.mainCont'); 
const BASE_URL4 = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"; 
async function getIngred() {
    try {
        const res = await fetch(BASE_URL4);
        const data = await res.json();
        displayIngred(data.meals);
        
    } catch(err) {
        console.log('Error fetching data:', err);
    }
}
getIngred();

async function getMealsByIng(ingredients) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
        const data = await res.json();
        
        if (data && data.meals) {
            displayMealsIng(data.meals);
        } else {
            console.log('No data or meals found.');
        }
    } catch (err) {
        console.log('Error fetching data:', err);
    }
}

let divsCreated = 0;

function displayIngred(data) {
    data.forEach((el) => {
        if (divsCreated < 20) {
            const box = `<div class="col-md-3 bg-transparent text-white border-0">
                <div><i class="fa-solid fa-drumstick-bite fa-4x"></i></div>
                <h3 class="fs-4">${el.strIngredient}</h3>
                <p>${el.strDescription && typeof el.strDescription === 'string' ? el.strDescription.split(' ').slice(0, 20).join(' ') : ''}</p>
            </div>`;
            mainCont.innerHTML += box;
            divsCreated++;
        }
    });
}

function displayMealsIng(data) {
    let dataIng = '';
    data.forEach(element => {
            const box =`<div class="col-md-3">
            <div class="item position-relative overflow-hidden">
                    <img class="w-100 rounded-2" src="${element.strMealThumb}" alt="">
                    <div class="caption bg-light opacity-75 rounded-2 position-absolute text-black">
                    <p class=" ms-2 pt-3 fw-semibold fs-2">${element.strMeal}</p>
                </div>
            </div>
        </div>`;
        dataIng += box;
    });
    mainCont.innerHTML = dataIng;
}

mainCont.addEventListener('click', (e) => {
    if (e.target !== mainCont) {
        getMealsByIng(e.target.innerText);
    };
})

const ingLink = document.getElementById("ingLink");
const ingSec = document.getElementById("ingredients");

function showIng() {
    searchSec.style.display = "none";
    apiItem.style.display = "none";
    categoriesSec.style.display = "none";
    areaSec.style.display = "none";
    ingSec.style.display = "block";
    conSec.style.display = "none";
    
}

ingLink.addEventListener('click', (e) => {
    e.preventDefault();
    showIng();
});



// contact

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");
const submitBtn = document.getElementById("submitBtn");

function validateForm() {  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const age = ageInput.value.trim();
    const password = passwordInput.value.trim();
    const repassword = repasswordInput.value.trim();
    clearErrorMessages();
    let isValid = true;
        if (name === "") {
            displayErrorMessage("nameError", "Please enter your name.");
            isValid = false;
        }
        if (!isValidEmail(email)) {
            displayErrorMessage("emailError", "Please enter a valid email address.");
            isValid = false;
        }
        if (!isValidPhoneNumber(phone)) {
            displayErrorMessage("phoneError", "Please enter a valid phone number.");
            isValid = false;
        }
        if (!isValidAge(age)) {
            displayErrorMessage("ageError", "Please enter a valid age.");
            isValid = false;
        }
        if (password === "") {
            displayErrorMessage("passwordError", "Please enter your password.");
            isValid = false;
        }
        if (password !== repassword) {
            displayErrorMessage("repasswordError", "Passwords do not match.");
            isValid = false;
        }
        submitBtn.disabled = !isValid;

        if (isValid) {
            }
        }
        function displayErrorMessage(id, message) {
            const errorDiv = document.getElementById(id);
            errorDiv.textContent = message;
        }
        function clearErrorMessages() {
            const errorDivs = document.querySelectorAll(".text-danger");
            errorDivs.forEach((div) => {
                div.textContent = "";
            });
        }
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        function isValidPhoneNumber(phone) {
            return /^\d{10}$/.test(phone);
        }
        function isValidAge(age) {
            return !isNaN(age) && age >= 18;
        }
        nameInput.addEventListener("input", validateForm);
        emailInput.addEventListener("input", validateForm);
        phoneInput.addEventListener("input", validateForm);
        ageInput.addEventListener("input", validateForm);
        passwordInput.addEventListener("input", validateForm);
        repasswordInput.addEventListener("input", validateForm);


const conLink = document.getElementById("conLink");
const conSec = document.getElementById("contact");

function showCon() {
    searchSec.style.display = "none";
    apiItem.style.display = "none";
    categoriesSec.style.display = "none";
    areaSec.style.display = "none";
    ingSec.style.display = "none";
    conSec.style.display = "block";
    
}

conLink.addEventListener('click', (e) => {
    e.preventDefault();
    showCon();
});


