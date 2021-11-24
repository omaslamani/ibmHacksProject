// Initialize map

var map = L.map('map').setView([28.5384, -81.3789], 7);

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

// Iterate through JSON and point points on map

// 1. Call the /assets/solar_points.json file
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
                color = "#f5deb3"; //wheat
            } else if (watts < 3500) {
                color = "Moccasin";
            } else if (watts < 4000) {
                color = "#ffa500"; //Orange
            } else if (watts < 4500) {
                color = "SandyBrown";
            } else if (watts < 5000) {
                color = "OrangeRed";
            } else if (watts >= 5500) {
                color = "Red";
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
        }
    });