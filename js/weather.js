const apiKey = "yBS0JAz9LGQJLSV6WxDFYqy4B263PNxm";
const resourceUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";

// Getting the city key in order to get the weather details.
const getCity = async (city) => {
    let finalUrl = `${resourceUrl}?apikey=${apiKey}&q=${city}`;

    const response = await fetch(finalUrl);
    const data = await response.json();

    return data[0]; // Returning the nearest match result.
};

// Getting the city's weather with the help of city key.
const getCityWeather = async (cityKey) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${cityKey}?apikey=${apiKey}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]; // Returning the object
};
