const functions = firebase.functions();
const db = firebase.firestore();

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

function dbLookup(aircraft, type) {
    const aircraftDocRef = db.collection("aircraft").doc("24MfkwHXUr0JJY2uWnb5");
    const airlineDocRef = db.collection("airline").doc("lwQWka6rr11EwU2UZ2EC");

    aircraftDocRef.get().then(function(doc) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        let p;
        for(p of aircraft) {
            for(const key in data) {
                const value = data[key];
                if(p.type === key) {
                    p.typeName = value;
                }
            }
        }
    });

    airlineDocRef.get().then(function(doc) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        let p;
        for(p of aircraft) {
            for(const key in data) {
                const value = data[key];
                if(p.opicao === key || p.call.slice(0,3) === key) {
                    p.airlineName = value;
                }
            }
        }
        addToMap(aircraft, type);
    });
}

function getAircraft(lat, lon) {
    const apiCall = functions.httpsCallable('apiCall');
    apiCall({latitude: lat, longitude: lon, dist: "100"}).then(function(result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        let aircraft = response.ac;

        dbLookup(aircraft);
    });
}

function addToMap(aircraft, type) {
    try {
        for(let i=0; i < aircraft.length; i++) {
            console.log(aircraft[i]);
            addMarker(aircraft[i], type);
        }

        planes = aircraft;
    }
    catch(err) {
        alert("API response error. There may not be any aircraft being tracked with 100nm of the current location.")
    }
}

function getMilAircraft() {
    const getMilitaryAircraft = functions.httpsCallable('getMilitaryAircraft');
    getMilitaryAircraft().then(function(result) {
        clearMarkers();
        // Read result of the Cloud Function.
        let response = result.data;
        let aircraft = response.ac;

        dbLookup(aircraft, "mil");
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

        dbLookup(aircraft, "single")

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

        dbLookup(aircraft, "single")
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

        dbLookup(aircraft, "squawk")
    });
}
