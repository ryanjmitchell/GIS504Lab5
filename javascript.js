window.onload = function(){
	alert('Click on the map it set Start and End waypoints');
}

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicnlhbmptaXRjaCIsImEiOiJjamhhdDBjaXgwcmZlMzBxZ2t1cnZ4bnFnIn0.4tXv0Yvk06rDbYp7ZLSdAw';

var street   = L.tileLayer(mbUrl, {id: 'mapbox.streets', maxZoom:18, attribution: mbAttr}),
satellite  = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', maxZoom:18, attribution: mbAttr});

var map = L.map('map', {
	layers:[street]}).setView([47.25, -122.44], 11);

var baseLayers = {
	"Street": street,
	"Satellite": satellite
};
L.control.layers(baseLayers).addTo(map);

L.easyButton('fas fa-crosshairs', function(btn, map){
	map.locate({setView: true, maxZoom: 18});
}).addTo(map);

var control = L.Routing.control({
	waypoints: [
			null
	],
	routeWhileDragging: true,
	units: 'imperial',
	router: L.Routing.mapbox('pk.eyJ1IjoicnlhbmptaXRjaCIsImEiOiJjamhhdDBjaXgwcmZlMzBxZ2t1cnZ4bnFnIn0.4tXv0Yvk06rDbYp7ZLSdAw'),
	geocoder: L.Control.Geocoder.nominatim(),
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {

    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

				L.DomEvent.on(startBtn, 'click', function() {
						control.spliceWaypoints(0, 1, e.latlng);
						map.closePopup();
				});
				L.DomEvent.on(destBtn, 'click', function() {
		        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
		        map.closePopup();
		    });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});

/*function onLocationFound(e) {

	var latlong = e.latlng

	L.marker(e.latlng).addTo(map)
	.bindPopup("Latitude: " + e.latitude + "<br>Longitude: " + e.longitude).openPopup();

}

/*function onLocationError(e) {
	alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({
  setView: false,
  maxZoom: 16,
  timeout: 15000,
  watch: false,
});*/
