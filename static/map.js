// Initialize map
const geoKey = 'AAPK13b6244a28404d51b200e16fde7fcbd6TX0JXaDXzWKvOHiorPYnvYSsHzEarSSwTBohIIHXsxERP99xYkXUe56bKadVBRZS';
var map = L.map('map').setView([28.5384, -81.3789], 7);
window.map = map;

L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var southWest = L.latLng(24.5959, -87.8256),
    northEast = L.latLng(31.2, -80);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

map.setMinZoom(map.getBoundsZoom(map.options.maxBounds));

// Iterate through JSON and point points on map

// 1. Call the /assets/solar_points.json file
window.circles = [];

$.getJSON("/assets/solar_points.json")
    .done((json) => {
        for (let i = 0; i < json.length; i++) {
            // Marker data
            data = json[i];

            // Marker locations
            let lat = data.latitude;
            let long = data.longitude;

            // Marker energy potential
            let watts = data.capacity_mw;

            // Color marker
            let color;
            if (watts < 50) {
                color = "#013220"; // dark green
            } else if (watts < 500) {
                color = "#228b22"; // forest green
            } else if (watts < 1000) {
                color = "#d9e650";
            } else if (watts < 1500) {
                color = "#e3ff00"; //lemon lime
            } else if (watts < 2000) {
                color = "#fff700"; //Lemon
            } else if (watts < 2500) {
                color = "#f5c71a"; //deep lemon
            } else if (watts < 3000) {
                color = "Orange";
            } else if (watts < 3500) {
                color = "#ff6f00";
            } else if (watts < 4000) {
                color = "Red";
            } else {
                color = "DarkRed";
            }


            // Implement marker
            const markerHtmlStyles = `
            background-color: ${color};
            width: 3rem;
            height: 3rem;
            display: block;
            left: -1.5rem;
            top: -1.5rem;
            position: relative;
            border-radius: 3rem 3rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF`

            const icon = L.divIcon({
                className: "my-custom-pin",
                iconAnchor: [0, 24],
                labelAnchor: [-6, 0],
                popupAnchor: [0, -36],
                html: `<span style="${markerHtmlStyles}" />`
            })

            let marker = L.marker([lat, long], { icon: icon });
            //marker.addTo(map);

            // Implement circle
            let circle = L.circle([lat, long], {
                color: color,
                fillOpacity: 0.7,
                radius: 5000
            })
            circle.addTo(map);

            circle.bindPopup(
                `<b>Location:</b> (${data.latitude}, ${data.longitude})<br>
                <b>Capacity:</b> ${data.capacity_mw} MW`

            );

            let circleObj = {
                object: circle,
                lat: lat,
                long: long,
                watts: watts
            }

            window.circles.push(circleObj);
        }
    });

// On dark mode event
function toggleDarkMode() {
    /*
     * $("h3").css("font-size", "11px"); Changes all <h3> font-size to 11px
     * $("#map").css("background-color", "purple"); Changes the element of <... id="map"> to have a purple background color
     * $(".myClass").css("margin", 0); Removes the margin around all elements with <... class="myClass">
     */
    // key dark mode
    $(".overlay").css(background - color, black);
    $("h2").css("font-color", white);
    $(".keydiagram").css("background", "linear-gradient(90 deg, rgba(231, 85, 223, 1) 0% , rgba(205, 99, 227, 1) 11 % , rgba(182, 112, 230, 1) 22 % , rgba(161, 124, 232, 1) 34 % , rgba(148, 131, 234, 1) 47 % , rgba(120, 146, 238, 1) 58 % , rgba(90, 162, 242, 1) 70 % , rgba(58, 180, 247, 1) 81 % , rgba(27, 197, 251, 1) 91 % , rgba(0, 212, 255, 1) 100 % )");


    // map markers


    for (let i = 0; i < window.circles.length; i++) {
        if (window.circleObj[i].watts < 50) {
            window.circleObj[i].setStyle({ color: "#e755df" }) // pink
        } else if (window.circleObj[i].watts < 500) {
            window.circleObj[i].setStyle({ color: "#cd63e3" });
        } else if (window.circleObj[i].watts < 1000) {
            window.circleObj[i].setStyle({ color: "#b670e6" });
        } else if (window.circleObj[i].watts < 1500) {
            window.circleObj[i].setStyle({ color: "#a17ce8" });
        } else if (window.circleObj[i].watts < 2000) {
            window.circleObj[i].setStyle({ color: "#9483ea" }); //purple
        } else if (window.circleObj[i].watts < 2500) {
            window.circleObj[i].setStyle({ color: "#7892ee" });
        } else if (window.circleObj[i].watts < 3000) {
            window.circleObj[i].setStyle({ color: "#5aa2f2" }); //blue
        } else if (window.circleObj[i].watts < 3500) {
            window.circleObj[i].setStyle({ color: "#3ab4f7" });
        } else if (window.circleObj[i].watts < 4000) {
            window.circleObj[i].setStyle({ color: "#1bc5fb" });
        } else {
            window.circleObj[i].setStyle({ color: "#00d4ff" });
        }
    }

    //map background

}

$("#darkModeButton").on((e) => {
    e.preventDefault();
    $(this).text("Light Mode");
});

// Searches a given address and zooms in on location
function search(address) {
    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&q=' + address)
        .done((data) => {
            console.log(data);
            responses = data;
            if (responses.length) {
                // Response was found
                window.map.setView([responses[0].lat, responses[0].lon], 18);
            } else {
                // Response was not found
            }
        });
}

$("#form").submit((e) => {
    e.preventDefault();
    if ($("#map-search").first().val().length) {
        search($("#map-search").first().val());
    }
});

//turn on and off the overlay effect
function on() {
    document.getElementById("overlay").style.display = "block";
    const f = document.getElementById('form');
    const q = document.getElementById('map-search');

    function submitted(event) {
        event.preventDefault();
        /*Take user input and feed to map, relocate map based on address*/
        L.esri.Vector.vectorBasemapLayer(basemapEnum, {
            apiKey: geoKey
        }).addTo(map);

    }
    f.addEventListener('submit', submitted);

}

function off() {
    document.getElementById("overlay").style.display = "none";
}