const functions = firebase.functions();

let planes = [];

$("#squawkForm").submit(function(e) {
    e.preventDefault();
    let squawk = document.getElementById("showSquawk").value;
    getSquawk(squawk);
});

$("#regForm").submit(function(e) {
    e.preventDefault();
    let reg = document.getElementById("searchByReg").value;
    getReg(reg.toUpperCase());
});

$("#icaoForm").submit(function(e) {
    e.preventDefault();
    let icao = document.getElementById("searchByIcao").value;
    getIcao(icao.toUpperCase());
});


function getAircraft(lat, lon) {
    const apiCall = functions.httpsCallable('apiCall');
    apiCall({latitude: lat, longitude: lon, dist: "100"}).then(function(result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        let aircraft = response.ac;

        try {
            for(let i=0; i < aircraft.length; i++) {
                console.log(aircraft[i])
                addMarker(aircraft[i]);
            }
            planes = aircraft;
        }
        catch(err) {
            alert("API response error. There may not be any aircraft being tracked with 100nm of the current location.")
        }
    });
}

function getMilAircraft() {
    const getMilitaryAircraft = functions.httpsCallable('getMilitaryAircraft');
    getMilitaryAircraft().then(function(result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        let aircraft = response.ac;

        try {
            for(let i=0; i < aircraft.length; i++) {
                console.log(aircraft[i])
                addMarker(aircraft[i], "mil");
            }
            map.setZoom(3);
            planes = aircraft;
        }
        catch(err) {
            alert("API response error. There may not be any aircraft being tracked with 100nm of the current location.")
        }
    });
}

function getReg(value) {
    const getAircraftByReg = functions.httpsCallable('getAircraftByReg');
    getAircraftByReg({registration: value}).then(function (result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        console.log(response);
        let aircraft = response.ac;

        try {
            for (let i = 0; i < aircraft.length; i++) {
                console.log(aircraft[i])
                addMarker(aircraft[i], "single");
            }
            planes = aircraft;
        }
        catch(err) {
            alert("The aircraft with registration '" + value + "' was not found.")
        }

    });
}

function getIcao(value) {
    const getAircraftByIcao = functions.httpsCallable('getAircraftByIcao');
    getAircraftByIcao({icao: value}).then(function (result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        console.log(response);
        let aircraft = response.ac;

        try {
            for (let i = 0; i < aircraft.length; i++) {
                console.log(aircraft[i])
                addMarker(aircraft[i], "single");
            }
            planes = aircraft;
        }
        catch(err) {
                alert("The aircraft with ICAO code '" + value + "' was not found.")
            }
    });
}

function getSquawk(value) {
    const getAircraftBySquawk = functions.httpsCallable('getAircraftBySquawk');
    getAircraftBySquawk({squawk: value}).then(function (result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        console.log(response);
        let aircraft = response.ac;

        try {
            for (let i = 0; i < aircraft.length; i++) {
                console.log(aircraft[i])
                addMarker(aircraft[i]);
            }
            map.setZoom(3);
            planes = aircraft;
        }
        catch(err) {
            alert("No aircraft with transponder code '" + value + "' was not found.")
        }
    });
}
