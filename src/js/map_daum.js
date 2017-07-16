var Map = function(div, lat, lng, level) {
    var container = document.getElementById(div); // 지도를 표시할 div
    var option = {
      center: new daum.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: level // 지도의 확대 레벨
    }
    daum.maps.Map.call(this, container, option);
};

Map.prototype = Object.create(daum.maps.Map.prototype);
Map.prototype.constructor=Map;

var Event = daum.maps.event;
var Marker = daum.maps.Marker;
daum.maps.Marker.prototype.setIcon = daum.maps.Marker.prototype.setImage;

var LatLng = daum.maps.LatLng;
daum.maps.LatLng.prototype.lat = daum.maps.LatLng.prototype.getLat;
daum.maps.LatLng.prototype.lng = daum.maps.LatLng.prototype.getLng;

function vertexImage(imgURL, size) {
    var markerImage = new daum.maps.MarkerImage(
        imgURL,
        new daum.maps.Size(size * 2, size * 2),
        {offset: new daum.maps.Point(size, size)}
    );
    return markerImage;
}

function createMarker(map, latlng, draggable, icon) {
    var marker = new Marker({
        map: map,
        position: latlng,
        draggable: draggable,
        image: icon,
    });
    return marker;
}

var Polyline = function(params) {
    daum.maps.Polyline.call(this, params);
    this.markers = [];
    this.middle_markers = [];
};

// 1. Marker prototype
// 2. Option 을 정해서, circle number, line color, circle color 등등을 정할 수 있도록

Polyline.prototype = Object.create(daum.maps.Polyline.prototype);
Polyline.prototype.constructor=Polyline;
