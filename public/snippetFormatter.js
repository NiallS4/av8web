function formatter(aircraft) {
    let contentString1 = '<div id="latitude">' + '<p class="infoHeading" style="display: inline;">Latitude:</p> ' + aircraft.lat + '\xB0' + '</div>' +
        '<div id="longitude">' + '<p class="infoHeading" style="display: inline;">Longitude:</p> ' + aircraft.lon + '\xB0' + '</div>' +
        '<div id="altitude">' + '<p class="infoHeading" style="display: inline;">Altitude:</p> ' + aircraft.alt + ' feet' + '</div>' +
        '<div id="heading">' + '<p class="infoHeading" style="display: inline;">Heading:</p> ' + aircraft.trak + '\xB0' + '</div>' +
        '<div id="speed">' + '<p class="infoHeading" style="display: inline;">Speed:</p> ' + aircraft.spd + ' knots' + '</div>';

    let contentString2 = '<div id="reg">' + '<p class="infoHeading"  style="display: inline;">Registration:</p> ' + aircraft.reg + '</div>' +
        '<div id="squawk">' + '<p class="infoHeading" style="display: inline;">Squawk:</p> ' + aircraft.sqk + '</div>' +
        '<div id="country">' + '<p class="infoHeading" style="display: inline;">Country:</p> ' + aircraft.cou + '</div>';

    if(aircraft.typeName === undefined && aircraft.airlineName === undefined ) {
        contentString1 += '<div id="call">' + '<p class="infoHeading" style="display: inline;">Callsign:</p> ' + aircraft.call + '</div>' +
            '<div id="type">' + '<p class="infoHeading" style="display: inline;">Aircraft:</p> '+ aircraft.type + '</div>';
        contentString1 += contentString2

    }
    else if(aircraft.typeName === undefined) {
        contentString1 +=
            '<div id="airline">' + '<p class="infoHeading" style="display: inline;">Airline:</p> ' + aircraft.airlineName + '</div>' +
            '<div id="call">' + '<p class="infoHeading" style="display: inline;">Callsign:</p> ' + aircraft.call + '</div>' +
            '<div id="type">' + '<p class="infoHeading" style="display: inline;">Aircraft:</p> ' + aircraft.type + '</div>';
            contentString1 += contentString2
    }
    else if(aircraft.airlineName === undefined) {
        contentString1 +=
            '<div id="call">' + '<p class="infoHeading" style="display: inline;">Callsign:</p> ' + aircraft.call + '</div>' +
            '<div id="type">' + '<p class="infoHeading" style="display: inline;">Aircraft:</p> ' + aircraft.typeName + ' (' + aircraft.type + ')' + '</div>';
        contentString1 += contentString2
    }
    else {
        contentString1 +=
            '<div id="airline">' + '<p class="infoHeading" style="display: inline;">Airline:</p> ' + aircraft.airlineName + '</div>' +
            '<div id="call">' + '<p class="infoHeading" style="display: inline;">Callsign:</p> ' + aircraft.call + '</div>' +
            '<div id="type">' + '<p class="infoHeading" style="display: inline;">Aircraft:</p> ' + aircraft.typeName + ' (' + aircraft.type + ')' + '</div>';
        contentString1 += contentString2
    }
    return contentString1;
}

