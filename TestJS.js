
var OnLoad = function () {
    var long;
    var lat;
    
   
    let documentTemperature = document.querySelector(".temperature-degree");
    let documentDescription = document.querySelector(".temperature-description");
    let documentTimezone = document.querySelector(".location-timezone");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => 
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        
        
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/1609a5e20c95ed0853ce11176193f49f/${lat},${long}`;
        
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            
                //Set HTML elements' text
                const {temperature, summary} = data.currently;
                
                documentTemperature.textContent = temperature;
                documentDescription.textContent = summary;
                documentTimezone.textContent = data.timezone;
            });
        });
    }
};


window.addEventListener("load", OnLoad());
