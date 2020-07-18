function getAircraft(lat, lon) {
    const apiCall = firebase.functions().httpsCallable('apiCall');
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
        }
        catch(err) {
            alert("API response error. Either there are no aircraft being tracked with 100nm of the current location or there was an error with the API.")
        }
    });
}

function getMilAircraft() {
    const getMilitaryAircraft = firebase.functions().httpsCallable('getMilitaryAircraft');
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
        }
        catch(err) {
            alert("API response error. Either there are no aircraft being tracked with 100nm of the current location or there was an error with the API.")
        }
    });
}

function getReg(value) {
    const getAircraftByReg = firebase.functions().httpsCallable('getAircraftByReg');
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
        }
        catch(err) {
            alert("API response error. Aircraft not found.")
        }

    });
}

function getIcao(value) {
    const getAircraftByIcao = firebase.functions().httpsCallable('getAircraftByIcao');
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
        }
        catch(err) {
                alert("API response error. Aircraft not found.")
            }
    });
}