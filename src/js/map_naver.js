var Map = function(div, lat, lng, level) {
    var option = {
      center: new naver.maps.LatLng(lat, lng), // 지도의 중심좌표
      zoom: level // 지도의 확대 레벨
    }
    naver.maps.Map.call(this, div, option);
};

Map.prototype = Object.create(naver.maps.Map.prototype);
Map.prototype.constructor=Map;

var Event = naver.maps.Event;
var Marker = naver.maps.Marker;

var LatLng = naver.maps.LatLng;

function vertexImage(imgURL, size) {
    var markerImage = {
        url : imgURL,
        size : new naver.maps.Size(size * 2, size * 2),
        origin : new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(size, size)
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
    naver.maps.Polyline.call(this, params);
    this.markers = [];
    this.middle_markers = [];
};

// 1. Marker prototype
// 2. Option 을 정해서, circle number, line color, circle color 등등을 정할 수 있도록

Polyline.prototype = Object.create(naver.maps.Polyline.prototype);
Polyline.prototype.constructor=Polyline;
