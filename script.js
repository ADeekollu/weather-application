
// global variables 

var searchButton = document.getElementById("button")
var apiKey = "601c8b09d7aad2ea141da9a258a4c34d"
var cityFormEl = $("#cityInputForm")
var cityListEl = $("#cityList")
var input = $("#cityInput")
var cityInputEl = ""
var currentDate = moment().format("MMM Do, YYYY")
var searchedCities = (localStorage.getItem("city"))
    ? JSON.parse(localStorage.getItem("city"))
    : [];

function renderCityList() {
    cityListEl.html("")
    $(searchedCities).each(function(i,el){
        cityListEl.prepend("<li>" + el + "</li>")
    })
    $("li").attr("class", "list-group-item list-group-item-action")
    $("li").on("click", function(){
        var liEl = $(this).text()
        cityInputEl = liEl
        getWeather()
    })
}
renderCityList();

// save city input into local storage

function handleFormSubmit(event) {
    event.preventDefault()
    cityInputEl = $("#cityInput").val().trim()
    if (!searchedCities.includes(cityInputEl)) {
        searchedCities.push(cityInputEl)
    }
    if (!cityInputEl){
        return
    }
    renderCityList();
    $("#cityName").text(cityInputEl)
    $("input[name = 'cityNameInput']").val("")
    localStorage.setItem("city", JSON.stringify(searchedCities))
}
cityFormEl.on("submit", handleFormSubmit)


// fetch call and getting back current day and 5 day weather forecast

function getWeather() {   
    var requestUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial&appid=" + apiKey;


    fetch(requestUrlCurrent)
    .then(function (response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var cityName = data.name
        var latEl = data.coord.lat
        var lonEl = data.coord.lon
        var requestUrl5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl + "&appid=" + apiKey
        var requestUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey

        $("#cityName").text(cityName)
        $("#currentDate").text(moment().add(1, 'day').format("MMM Do, YYYY"));
        $("#weatherIcon").attr({src:"http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
        $("#currentTemp").text("Temp: " + data.main.temp + "°");  
        $("#currentHum").text("Humidity: " + data.main.humidity + "%");
        $("#currentWind").text("Wind: " + data.wind.speed + "mph");
        console.log()


        fetch(requestUrl5Day)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            
            // set dates for 5-day forecast
            $("#forecastDate1").text(moment().add(1, 'day').format("MMM Do, YYYY"));
            $("#forecastDate2").text(moment().add(2, 'day').format("MMM Do, YYYY"));
            $("#forecastDate3").text(moment().add(3, 'day').format("MMM Do, YYYY"));
            $("#forecastDate4").text(moment().add(4, 'day').format("MMM Do, YYYY"));
            $("#forecastDate5").text(moment().add(5, 'day').format("MMM Do, YYYY"));                       
            
            $("#forecastIcon1").attr({src:"http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon2").attr({src:"http://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon3").attr({src:"http://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon4").attr({src:"http://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon5").attr({src:"http://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});

            $("#temp1").text("Temp: " + Number((data.list[0].main.temp - 273.15) * (1.8) + 32).toFixed(1) + "°F");
            $("#temp2").text("Temp: " + Number((data.list[1].main.temp - 273.15) * (1.8) + 32).toFixed(1) + "°F");
            $("#temp3").text("Temp: " + Number((data.list[2].main.temp - 273.15) * (1.8) + 32).toFixed(1) + "°F");
            $("#temp4").text("Temp: " + Number((data.list[3].main.temp - 273.15) * (1.8) + 32).toFixed(1) + "°F");
            $("#temp5").text("Temp: " + Number((data.list[4].main.temp - 273.15) * (1.8) + 32).toFixed(1) + "°F");

            $("#hum1").text("Humidity: " + Number(data.list[0].main.humidity).toFixed(0) + "%");
            $("#hum2").text("Humidity: " + Number(data.list[1].main.humidity).toFixed(0) + "%");
            $("#hum3").text("Humidity: " + Number(data.list[2].main.humidity).toFixed(0) + "%");
            $("#hum4").text("Humidity: " + Number(data.list[3].main.humidity).toFixed(0) + "%");
            $("#hum5").text("Humidity: " + Number(data.list[4].main.humidity).toFixed(0) + "%");

            $("#wind1").text("Wind: " + Number(data.list[0].wind.speed).toFixed(2) + "mph");
            $("#wind2").text("Wind: " + Number(data.list[1].wind.speed).toFixed(2) + "mph");
            $("#wind3").text("Wind: " + Number(data.list[2].wind.speed).toFixed(2) + "mph");
            $("#wind4").text("Wind: " + Number(data.list[3].wind.speed).toFixed(2) + "mph");
            $("#wind5").text("Wind: " + Number(data.list[4].wind.speed).toFixed(2) + "mph");
            console.log()
            

        })
    })
}

cityFormEl.on("submit", getWeather)

























