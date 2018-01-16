window.onload = function () {

    function getLocation(address) {
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json",
            type: 'GET',
            dataType: "json",
            data: {
                address: address,
                key: "AIzaSyDA_h-MR-jcC4ipVLCG3Nph-z0-l1kMoNc",
            },
            success: function (data, textStatus) {
                printInfo(data.results[0].formatted_address);
                drawMap(data.results[0].geometry.location);
                
                //Find The City Name from Address
                let addressComponents = data.results[0].address_components;
                for(let i = 0; i < addressComponents.length; i++){
                    for(let j = 0; j < addressComponents[i].types.length; j++){
                        if(addressComponents[i].types[j] == "administrative_area_level_1"){
                            let city = addressComponents[i].long_name.replace(/Municipality of/i, "");
                            console.log(city)
                            getInfo(city);
                        }
                    }
                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function getInfo(address) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: {
                action: "parse",
                format: "json",
                prop: "text",
                section: "0",
                page: address,
                origin: "*"
            },
            success: function (data) {
                printInfo(data.parse.text["*"]);
                
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function drawMap({lat, lng}){
        let mapProps = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 15
        }
        let map = new google.maps.Map(document.getElementById("map"), mapProps);
    }
   
    function printInfo(data, deleteContent) {
        let info = document.createElement("div");
        info.innerHTML = data
        container.appendChild(info);
    }
    
    let container = document.getElementById("wiki");
    let form = document.getElementById("form");
    
    form.addEventListener("submit", function (evt) {
        
        evt.preventDefault();
        container.innerHTML = "";
        address = this.address.value
        getLocation(address);
    })
    
}