// Initialise Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCAD-xlFxEMLFt8ivt5Mn2ejezLNKQeGdc",
    authDomain: "av8-flight-tracker.firebaseapp.com",
    databaseURL: "https://av8-flight-tracker.firebaseio.com",
    projectId: "av8-flight-tracker",
    storageBucket: "av8-flight-tracker.appspot.com",
    messagingSenderId: "972073264472",
    appId: "1:972073264472:web:a102b3538d6e293a13f12d",
    measurementId: "G-K0FWXQSWLW"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let map;
let markers = [];
let markerIndex = 0;


function initMap(listener) {
    const dublinAirport = { lat: 53.427, lng: -6.244 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: dublinAirport,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        controlSize: 32,
        streetViewControl: false
    });

    getAircraft("53.427", "-6.244")
}

function addMarker(aircraft, type="default", colour="rgb(0,0,0)") {
    let loc = { lat: parseFloat(aircraft.lat), lng: parseFloat(aircraft.lon) };

    let trak;
    if(aircraft.trak === "") {
        trak = 0.0
    }
    else {
        trak = parseFloat(aircraft.trak)
    }

    if(type === "mil") {
        colour = "rgb(80,105,0)";
    }

    const planeIcon = {
        path: "M190 418 c0 -7 7 -22 15 -32 12 -16 22 -86 13 -86 -2 0 -32 9 -68 20\n" +
            "-118 36 -120 23 -10 -57 l80 -58 0 -55 c0 -35 6 -64 15 -76 15 -19 15 -19 30\n" +
            "0 9 12 15 41 15 76 l0 55 80 58 c110 80 108 93 -10 57 -36 -11 -66 -20 -67\n" +
            "-20 -11 0 0 67 14 91 19 32 12 49 -13 29 -13 -12 -17 -11 -25 1 -8 12 -10 12\n" +
            "-19 -1 -7 -12 -12 -12 -22 -2 -16 16 -28 15 -28 0z",
        fillColor: colour,
        fillOpacity: 1,
        anchor: new google.maps.Point(298, 311),
        strokeWeight: 0,
        scale: .1,
        rotation: trak,
        title: aircraft
    }

    let marker = new google.maps.Marker({
        position: loc,
        icon: planeIcon
    });

    var contentString = '<div id="latitude">' + '<p class="infoHeading" style="display: inline;">Latitude:</p> ' + aircraft.lat + '\xB0' + '</div>' +
        '<div id="longitude">' + '<p class="infoHeading" style="display: inline;">Longitude:</p> ' + aircraft.lon + '\xB0' + '</div>' +
        '<div id="altitude">' + '<p class="infoHeading" style="display: inline;">Altitude:</p> ' + aircraft.alt + ' feet' + '</div>' +
        '<div id="heading">' + '<p class="infoHeading" style="display: inline;">Heading:</p> ' + aircraft.trak + '\xB0' + '</div>' +
        '<div id="speed">' + '<p class="infoHeading" style="display: inline;">Speed:</p> ' + aircraft.spd + ' knots' + '</div>' +
        '<div id="call">' + '<p class="infoHeading" style="display: inline;">Callsign:</p> ' + aircraft.call + '</div>' +
        '<div id="reg">' + '<p class="infoHeading"  style="display: inline;">Registration:</p> ' + aircraft.reg + '</div>' +
        '<div id="type">' + '<p class="infoHeading" style="display: inline;">Aircraft:</p> ' + aircraft.type + '</div>' +
        '<div id="squawk">' + '<p class="infoHeading" style="display: inline;">Squawk:</p> ' + aircraft.sqk + '</div>' +
        '<div id="country">' + '<p class="infoHeading" style="display: inline;">Country:</p> ' + aircraft.cou + '</div>';

    let infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 250
    });

    // noinspection JSDeprecatedSymbols
    marker.addListener("click", function() {
        infowindow.setZIndex(markerIndex);
        markerIndex++;
        infowindow.open(map, marker);
    });

    // noinspection JSDeprecatedSymbols
    google.maps.event.addListener(map, "click", function() {
        infowindow.close();
    });

    markers.push(marker);
    marker.setMap(map);

    if(type === "single") {
        map.setCenter(loc);
    }
}

function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    markerIndex = 0;
}

function refresh() {
    let centreLoc = map.getCenter();
    getAircraft(centreLoc.lat(), centreLoc.lng())
}

