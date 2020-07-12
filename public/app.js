function initialize() {
    const config = {
        apiKey: "AIzaSyCAD-xlFxEMLFt8ivt5Mn2ejezLNKQeGdc",
        authDomain: "av8-flight-tracker.firebaseapp.com",
        projectId: "av8-flight-tracker",
        databaseURL: "https://av8-flight-tracker.firebaseio.com",
    };

    firebase.initializeApp(config);
    firebase.analytics();
    const functions = firebase.functions();
}

let mMap;

function initMap(listener) {
    const dublinAirport = { lat: 53.427, lng: -6.244 }
    mMap = new google.maps.Map(document.getElementById("map"), {
        center: dublinAirport,
        zoom: 10
    });

    let marker = new google.maps.Marker({
        position: dublinAirport,
        title: "Dublin Airport"
    });
    marker.setMap(mMap);

    let contentString = '<div id="infobox">'+
        '<h1 id="firstHeading" class="firstHeading">Dublin Airport</h1>'+
        '<div id="infoboxContent">'+
        '<p>Dublin Airport | DUB | EIDW</p>'+
        '</div>'+
        '</div>';

    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // noinspection JSDeprecatedSymbols
    marker.addListener('click', function() {
        infowindow.open(mMap, marker);
    });
}

function addMarker(aircraft) {
    let loc = { lat: parseFloat(aircraft.lat), lng: parseFloat(aircraft.lon) };

    const planeIcon = {
        path: "M190 418 c0 -7 7 -22 15 -32 12 -16 22 -86 13 -86 -2 0 -32 9 -68 20\n" +
            "-118 36 -120 23 -10 -57 l80 -58 0 -55 c0 -35 6 -64 15 -76 15 -19 15 -19 30\n" +
            "0 9 12 15 41 15 76 l0 55 80 58 c110 80 108 93 -10 57 -36 -11 -66 -20 -67\n" +
            "-20 -11 0 0 67 14 91 19 32 12 49 -13 29 -13 -12 -17 -11 -25 1 -8 12 -10 12\n" +
            "-19 -1 -7 -12 -12 -12 -22 -2 -16 16 -28 15 -28 0z",
        fillColor: '#3F51B5',
        fillOpacity: 1,
        anchor: new google.maps.Point(298, 311),
        strokeWeight: 0,
        scale: .1,
        rotation: parseFloat(aircraft.trak)
    }

    let marker = new google.maps.Marker({
        position: loc,
        icon: planeIcon
    });

    var contentString = '<div id="latitude">' + '<b>Latitude:</b> ' + aircraft.lat + '\xB0' + '</div>' +
        '<div id="longitude">' + '<b>Longitude:</b> ' + aircraft.lon + '\xB0' + '</div>' +
        '<div id="altitude">' + '<b>Altitude:</b> ' + aircraft.alt + ' feet' + '</div>' +
        '<div id="heading">' + '<b>Heading:</b> ' + aircraft.trak + '\xB0' + '</div>' +
        '<div id="speed">' + '<b>Speed:</b> ' + aircraft.spd + ' knots' + '</div>' +
        '<div id="call">' + '<b>Callsign:</b> ' + aircraft.call + '</div>' +
        '<div id="reg">' + '<b>Registration:</b> ' + aircraft.reg + '</div>' +
        '<div id="type">' + '<b>Aircraft:</b> ' + aircraft.type + '</div>' +
        '<div id="country">' + '<b>Country:</b> ' + aircraft.cou + '</div>';

    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // noinspection JSDeprecatedSymbols
    marker.addListener('click', function() {
        console.log("OKK");
        infowindow.open(mMap, marker);
    });

    marker.setMap(mMap);
}

function getAircraft() {
    const apiCall = firebase.functions().httpsCallable('apiCall');
    apiCall({latitude: "53.427", longitude: "-6.244", dist: "100"}).then(function(result) {
        // Read result of the Cloud Function.
        let response = result.data;

        let aircraft = response.ac;
        for(let i=0; i < aircraft.length; i++) {
            console.log(aircraft[i])
            addMarker(aircraft[i]);
        }
    });
}

getAircraft();