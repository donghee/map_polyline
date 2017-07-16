var Map = function(div, lat, lng, level) {
    var container = document.getElementById(div);
    var option = {
      center: {lat: lat, lng: lng},
      zoom: level,
      // mapTypeId: 'terrain'
    }
    google.maps.Map.call(this, container, option);
};

Map.prototype = Object.create(google.maps.Map.prototype);
Map.prototype.constructor=Map;

var Event = google.maps.event;
var Marker = google.maps.Marker;

var LatLng = google.maps.LatLng;

function vertexImage(imgURL, size) {
    var markerImage = {
        url : imgURL,
        size : new google.maps.Size(size * 2, size * 2),
        origin : new google.maps.Point(0, 0),
        anchor: new google.maps.Point(size, size)
    };
    return markerImage;
}

function createMarker(map, latlng, draggable, icon) {
    var marker = new Marker({
        map: map,
        position: latlng,
        draggable: draggable,
        icon: icon,
    });
    return marker;
}

var Polyline = function(params) {
    google.maps.Polyline.call(this, params);
    this.markers = [];
    this.middle_markers = [];
};

// 1. Marker prototype
// 2. Option 을 정해서, circle number, line color, circle color 등등을 정할 수 있도록

Polyline.prototype = Object.create(google.maps.Polyline.prototype);
Polyline.prototype.constructor=Polyline;
