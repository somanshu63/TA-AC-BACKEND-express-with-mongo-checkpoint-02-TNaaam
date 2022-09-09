var root = document.querySelector('.aside');
var categories = root.querySelector('.categories');
var dates = root.querySelector('.dates');
var locations = root.querySelector('.locations');
var options = root.querySelector('.options');
var optionsLocation = options.querySelector('.locationbtn');
var optionsCategories = options.querySelector('.categoriesbtn');
var optionsStartDate = options.querySelector('.start_datebtn');

categories.style.display = "none";
    dates.style.display = "none";
    locations.style.display = "none";

optionsCategories.addEventListener("click", (event) => {
    event.preventDefault();
    categories.style.display = "block";
    dates.style.display = "none";
    locations.style.display = "none";

});

optionsStartDate.addEventListener("click", (event) => {
    event.preventDefault();
    categories.style.display = "none";
    dates.style.display = "block";
    locations.style.display = "none";

});

optionsLocation.addEventListener("click", (event) => {
    event.preventDefault();
    categories.style.display = "none";
    dates.style.display = "none";
    locations.style.display = "block";

});