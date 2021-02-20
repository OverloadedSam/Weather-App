console.log("Welcome to this weather app!");

// UI elements
const cityForm = document.getElementById("cityForm");
const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const iconInfo = document.getElementById("iconInfo");
const temperature = document.getElementById("temperature");
const weatherInfo = document.getElementById("weatherInfo");
const bgImg = document.getElementById("bgImg");
const time = document.getElementById("time");
const fullDate = document.getElementById("fullDate");
const weatherCard = document.getElementById("weatherCard");
const errorBox = document.getElementById("errorBox");
const homeCard = document.getElementById("homeCard");

// When city is found then displaying the results
const updateUI = (data) => {
    const { cityDetails, cityWeather } = data; // Destructuring of data into to separate objects.

    weatherCard.classList.remove("d-none"); // Only display results if data fetches properly.
    errorBox.classList.add("d-none");
    homeCard.classList.add("d-none");

    cityName.innerText = cityDetails.EnglishName;
    iconInfo.setAttribute(
        "src",
        `./images/icons/${cityWeather.WeatherIcon}.svg`
    );
    temperature.innerText = `${cityWeather.Temperature.Metric.Value} °C`;
    weatherInfo.innerText = cityWeather.WeatherText;

    if (cityWeather.IsDayTime) {
        bgImg.setAttribute("src", "./images/daytime.jpg");
    } else {
        bgImg.setAttribute("src", "./images/nighttime.jpg");
    }

    let countryTime = new Date(cityWeather.LocalObservationDateTime);
    time.innerText = `Approx Time ${countryTime.getHours()}:${countryTime.getMinutes()}`; // Displays time
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const daysNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    fullDate.innerText = `${
        daysNames[countryTime.getDay()]
    }, ${countryTime.getDate()}-${
        monthNames[countryTime.getMonth()]
    }-${countryTime.getFullYear()}`; // Displays full date and day.
};

// Fetches city as per user input.
const getNewCity = async (cityName) => {
    const cityDetails = await getCity(cityName);
    const cityWeather = await getCityWeather(cityDetails.Key);

    return { cityDetails, cityWeather };
};

// If input is not right or some issue occures.
function somethingWentWrong() {
    errorBox.classList.remove("d-none");
    homeCard.classList.add("d-none");
    weatherCard.classList.add("d-none");
}

// Search for the city that user has given.
const searchForCity = (e) => {
    e.preventDefault();

    const cityName = document.getElementById("cityInput").value.trim();
    cityForm.reset();

    getNewCity(cityName)
        .then((data) => {
            updateUI(data);
        })
        .catch((err) => {
            somethingWentWrong();
            console.log("Error in fetching data: ", err);
        });
};

// When user submits the request or entered the city
cityForm.addEventListener("submit", (e) => searchForCity(e));
submitBtn.addEventListener("click", (e) => searchForCity(e));
