

var searchButton = document.getElementById("button")
var weatherApiKey = "601c8b09d7aad2ea141da9a258a4c34d"




function getWeather() {
    var newName = document.getElementById("cityInput")
    var cityName = document.getElementById("cityName")
    cityName.innerHTML = newName.value

    fetch("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'appid=601c8b09d7aad2ea141da9a258a4c34d")
    .then(function (response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}


searchButton.addEventListener("click", getWeather)

























