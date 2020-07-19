function altToColour(altitude) {
    if (altitude <= 0){
        return "rgb(255, 255, 0)";
    }
    // If aircraft is flying extraordinarily high, paint it deep red
    else if (altitude > 45600) {
        return "rgb(180, 0, 0)";
    }
    // Else paint it somewhere in between
    else {
        let green = 255;
        // we will change green factor in RGB colour by increments of 5 as they are enough to be noticeable
        // change colour in increments of 1200 ft as 190 / 5 = 38, 38 * 1200 = 45600 (just above the max for most commercial aircraft)
        // e.g. if altitude is zero, green is unchanged. if altitude is 45900 then green is 64
        let adjust = ((altitude / 1200) * 5) + 65;
        green -= adjust;
        return `rgb(255, ${green}, 64)`;
    }
}

function colourIconsByAlt(markers) {
    let colour;
    let m;
    clearMarkers()
    for(m of markers) {
        let p = m.icon.title
        let altitude;
        if(p.alt !== null && p.alt !== "") {
            altitude = parseInt(p.alt)
        }
        else {
            altitude = 0;
        }
        colour = altToColour(altitude);
        addMarker(p, "default", colour);
    }
}

function spdToColour(speed) {
    // colours are in RGB format. Range from Pink : 255 128 255, to Blue : 128 128 255

    // If aircraft ground speed is 0, it is either stationary or flying at 90 degrees to the surface. either way paint it dark blue
    if (speed <= 0){
        return "rgb(64, 64, 255)";
    }
    // If aircraft is flying very fast (almost supersonic or beyond) paint it a darker shade to highlight
    else if (speed > 544) {
        return "rgb(190, 0, 128)";
    }
    // Else paint it somewhere in between
    else {
        let red = 128;
        // Use similar calculations as in altitudeToColourMethod

        let adjust = ((speed / 17) * 4);
        red += adjust;

        return `rgb(${red}, 64, 255)`;
    }
}

function colourIconsBySpd(markers) {
    let colour;
    let m;
    clearMarkers()
    for(m of markers) {
        let p = m.icon.title
        let speed;
        if(p.spd !== null && p.spd !== "") {
            speed = parseInt(p.spd)
        }
        else {
            speed = 0;
        }
        colour = spdToColour(speed);
        addMarker(p, "default", colour);
    }
}