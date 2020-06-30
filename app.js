var mMap;
function initMap(listener) {
    const dublinAirport = { lat: 53.427, lng: -6.244 }
    mMap = new google.maps.Map(document.getElementById("map"), {
        center: dublinAirport,
        zoom: 10
    });

    var marker = new google.maps.Marker({
        position: dublinAirport,
        title: "Dublin Airport",
        label: "D"
    });

    var contentString = '<div id="infobox">'+
        '<h1 id="firstHeading" class="firstHeading">Dublin Airport</h1>'+
        '<div id="infoboxContent">'+
        '<p>Dublin Airport | DUB | EIDW</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // noinspection JSDeprecatedSymbols
    marker.addListener('click', function() {
        infowindow.open(mMap, marker);
    });

    marker.setMap(mMap);
}