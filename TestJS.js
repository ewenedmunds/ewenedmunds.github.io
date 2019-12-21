
var OnLoad = function () {
    var long;
    var lat;
    
    let documentTemperatureSection = document.querySelector(".degree-section");
    let documentTemperatureSectionSpan = document.querySelector(".degree-section span");
    let documentTemperature = document.querySelector(".temperature-degree");
    let documentDescription = document.querySelector(".temperature-description");
    let documentTimezone = document.querySelector(".location-timezone");
    
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => 
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        
        
        const proxy = "https://cors-anywhere.herokuapp.com/"; //
        const api = `${proxy}https://api.darksky.net/forecast/1609a5e20c95ed0853ce11176193f49f/${lat},${long}`;
        
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            
                documentTemperatureSectionSpan.textContent = "F";
            
                //Set HTML elements' text
                const {temperature, summary, icon} = data.currently;
                
                documentTemperature.textContent = temperature;
                documentDescription.textContent = summary;
                documentTimezone.textContent = data.timezone;
            
                setIcons(icon, document.getElementById("icon1"));
            
                //separate these
                documentTemperatureSection.addEventListener("click", () => {
                    if (documentTemperatureSectionSpan.textContent === "F"){
                        documentTemperatureSectionSpan.textContent = "C";
                        documentTemperature.textContent = Math.round(((temperature-32)*5/9)*100)/100;
                    }
                    else {
                        documentTemperatureSectionSpan.textContent = "F";
                        documentTemperature.textContent = temperature;
                    }});
            });
        }, error =>{
           switch(error.code) {
    case error.PERMISSION_DENIED:
      documentTemperature.innerHTML = "Geolocation services blocked. :("
      break;
    case error.POSITION_UNAVAILABLE:
      documentTemperature.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      documentTemperature.innerHTML = "The request to get your location timed out."
      break;
    case error.UNKNOWN_ERROR:
      documentTemperature.innerHTML = "An unknown error occurred."
      break;
  } 
        });
    }
    else{
        documentTemperature.textContent = "Geolocation is not available on this browser!";
    }
    
    
    function setIcons(icon, iconid){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconid, Skycons[currentIcon]);
    }
};


window.addEventListener("load", OnLoad());
