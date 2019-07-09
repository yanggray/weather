window.addEventListener("load", () => {
    let long;
    let lat;
    let tmeperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let tmeperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/58dd9a19f3e3efb63b8eedd7fd296230/${lat},${long}`;

            fetch(api).then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                //Set DOM Elements from the APT
                temperatureDegree.textContent = temperature;
                tmeperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //FORUMULA FOR CELSIUS
                let celsius = (temperature - 32) * (5 / 9);
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Change temperature to Celsius/Farenheit
                tmeperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}); 