$("#filterTypeForm").submit(function(e) {
    e.preventDefault();
    let type = document.getElementById("filterByType").value;
    filterByType(type.toUpperCase());
});

$("#filterOperatorForm").submit(function(e) {
    e.preventDefault();
    let operator = document.getElementById("filterByOperator").value;
    filterByOperator(operator.toUpperCase());
});

$("#filterCountryForm").submit(function(e) {
    e.preventDefault();
    let country = document.getElementById("filterByCountry").value;
    filterByCountry(country);
});

function filterByType(value) {
    let ac = markers
    clearMarkers();
    for(let i = 0; i < ac.length; i++) {
        let plane = ac[i].icon.title;
        if(plane.type === value) {
            addMarker(plane, "default", ac[i].icon.fillColor);
        }
    }
}

function filterByOperator(value) {
    let ac = markers
    clearMarkers();
    for(let i = 0; i < ac.length; i++) {
        let plane = ac[i].icon.title;
        if(plane.opicao === value || plane.call.slice(0,3) === value) {
            addMarker(plane, "default", ac[i].icon.fillColor);
        }
    }
}

function filterByCountry(value) {
    let ac = markers
    clearMarkers();
    for(let i = 0; i < ac.length; i++) {
        let plane = ac[i].icon.title;
        if(plane.cou === value) {
            addMarker(plane, "default", ac[i].icon.fillColor);
        }
    }
}
