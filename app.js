window.addEventListener('load', function () {
    const form = document.querySelector('#form');
    const input = document.querySelector('#searchBar');

    form.addEventListener('submit', function (action) {
        action.preventDefault();
        const city = input.value;
        getWeatherByCity(city);
    });

    async function getWeatherByCity(city) {
        const API_KEY = 'd4481f790e5ddf29504d0a40618f0417';
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await response.json();
        setWeatherData(weatherData);
    }

    function setWeatherData(weatherData) {
        document.querySelector(
            '.weatherSection'
        ).innerHTML = `<div class="card">
                <div class="location">
                    <figure id="weatherImg">
                        <img
                            src="https://openweathermap.org/img/wn/${
                                weatherData.weather[0].icon
                            }@2x.png"
                            alt="Condition"
                            height="80px"
                            width="80px"
                        />
                    </figure>
                    <div id="city">
                        ${weatherData.name}, ${weatherData.sys.country}
                        <div id="date">${getCurrentDate()}</div>
                    </div>
                </div>
                <div class="details">
                    <div class="weatherInfo" id="weatherTemp">
                        ${Math.round(weatherData.main.temp)}<sup>°C</sup>
                    </div>
                    <div class="weatherInfo" id="weatherDescription">
                        ${weatherData.weather[0].description.toUpperCase()}
                    </div>
                </div>

                <div class="advancedInfo">
                    <div class="rise-set">
                        <figure id="sunrise">
                            <img
                                src="./images/sunrise.png"
                                alt="Sunrise"
                                height="32px"
                                width="32px"
                            />${unixToTime(weatherData.sys.sunrise)} AM
                        </figure>
                        <figure id="sunset">
                            <img
                                src="./images/sunset.png"
                                alt="Sunset"
                                height="32px"
                                width="32px"
                            />${unixToTime(weatherData.sys.sunset)} PM
                        </figure>
                    </div>
                </div>
            </div>
            </div>`;
            const card = document.querySelector('.card');
            card.style.backgroundColor = `rgb(100, 0, 0, 0.2)`;
    }

    function unixToTime(unix) {
        const unixTimestamp = unix;
        const date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        const minutes = '0' + date.getMinutes();
        if (hours >= 12) {
            hours -= 12;
        }
        return hours + ':' + minutes.substr(-2);
    }

    function getCurrentDate() {
        const weekday = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${weekday[date.getDay()]} ${day}/${month}/${year}`;
    }
});
