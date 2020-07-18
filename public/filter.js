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
    clearMarkers();
    for(let i = 0; i < planes.length; i++) {
        if(planes[i].type === value) {
            addMarker(planes[i]);
        }
    }
}

function filterByOperator(value) {
    clearMarkers();
    for(let i = 0; i < planes.length; i++) {
        if(planes[i].opicao === value || planes[i].call.slice(0,3) === value) {
            addMarker(planes[i]);
        }
    }
}

function filterByCountry(value) {
    clearMarkers();
    for(let i = 0; i < planes.length; i++) {
        if(planes[i].cou === value) {
            addMarker(planes[i]);
        }
    }
}
