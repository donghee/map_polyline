Array.prototype.getAt = function(index) { return this[index]; };
Array.prototype.setAt = function(index, element) { this[index] = element; };
Array.prototype.insertAt = function(index, element) { this.splice(index, 0, element); };
Array.prototype.deleteE = function(element) { return this.filter(function(_e) { return element != _e; }); }

Polyline.prototype.setAt = function(index, latlng) {
    var path = this.getPath();
    path.setAt(index, latlng);
    this.setPath(path);
};

Polyline.prototype.getAt = function(index) {
    var path = this.getPath();
    return path.getAt(index);
};

Polyline.prototype.addVertex = function() {
    if ( this.getPath().length == 0 ) {
        var c = map.getCenter();
        this.append(c);
    }
    else {
        var path = this.getPath();
        var last = path.getAt(path.length - 1);
        var _new = new LatLng(last.lat() + 0.002, last.lng() + 0.002);
        this.append(_new);
    }
}

Polyline.prototype.clear = function() {
    var path = [];
    this.setPath(path);
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
    }
    this.markers = [];
    for (var i = 0; i < this.middle_markers.length; i++) {
        this.middle_markers[i].setMap(null);
    }
    this.middle_markers = [];
}

Polyline.prototype.append = function(latlng) {
    var path = this.getPath();
    var position = path.length;
    this.insertMiddle(position, latlng);
};

// position (new Vertex Index) = middle_marker index + 1
Polyline.prototype.insertMiddle = function(position, middle_latlng) {
    console.log('insertMiddle', position, middle_latlng);
    var path = this.getPath();
    path.insertAt(position, middle_latlng);
    this.setPath(path);
    var marker = this.newMarker(middle_latlng, position);
    this.markers.insertAt(position, marker);

    for (var i = position + 1; i < path.length; i++) {
        // console.log('change ' , i, path.length);
        var img = vertexImage(vertexImgURL(i + 1), 16);
        this.markers[i].setIcon(img);
    }

    if ( position > 0 ) {
        var last = path.getAt(position - 1);
        var middle_point1 = new LatLng(
            (last.lat() + middle_latlng.lat()) / 2,
            (last.lng() + middle_latlng.lng()) / 2);
        // console.log('middle1 ', last, middle_latlng, middle_point1);
        var middle_marker1 = this.newMiddle(middle_point1, position - 1);
        this.middle_markers.insertAt(position - 1, middle_marker1);
    }

    if ( position + 1 < path.length ) {
        var last = path.getAt(position + 1);
        var middle_point2 = new LatLng(
            (last.lat() + middle_latlng.lat()) / 2,
            (last.lng() + middle_latlng.lng()) / 2);
        // console.log('middle2 ', last, middle_latlng, middle_point2);
        var middle_marker2 = this.newMiddle(middle_point2, position);
        this.middle_markers.insertAt(position + 1, middle_marker2);
    }

    // for ( var i = 0; i < this.middle_markers.length; i++) {
    //     var middle_marker = this.middle_markers[i];
    //     var latlng = middle_marker.getPosition();
    //     console.log("[", i, " : ", latlng.lng(), " , ", latlng.lat(), "]");
    // }

    var index = -1;
    for ( var i = 0; i < this.middle_markers.length; i++) {
        var middle_marker = this.middle_markers[i];
        var latlng = middle_marker.getPosition();
        if ( latlng.lat() === middle_latlng.lat() && latlng.lng() === middle_latlng.lng() ) {
            index = i;
            break;
        }
    }
    if ( index > 0 ) {
        console.log ("--delete, ", index, " middle ", this.middle_markers.length);
        var middle_marker = this.middle_markers[index];
        this.middle_markers = this.middle_markers.deleteE(middle_marker);
        middle_marker.setMap(null);
    }
};

// nth is 0, 1, 2, 3, 4
Polyline.prototype.newMarker = function(latlng, nth) {
    var marker = createMarker(map, latlng, true, vertexImage(vertexImgURL(nth + 1), 16));
    console.log('Marker create', nth);
    Event.addListener(marker, "click",
        function() {
            if (clickVertex) {      // check function exist
                return clickVertex(marker);
            }
            else {
                console.log('function clickVertex(vertex) { } is not implemented');
            }
        }.bind(this)
    );
    Event.addListener(marker, "dragend",
        function() {
            return this.moveVertex(marker);
        }.bind(this)
    );
    return marker;
};

// nth is 0, 1, 2, 3, 4
Polyline.prototype.newMiddle = function(latlng, nth) {
    var middle_marker = createMarker(map, latlng, false, vertexImage(middleImgURL(), 8))
    console.log(' middle create', nth)
    Event.addListener(middle_marker, "click",
        function() {
            var index = this.middle_markers.indexOf(middle_marker);
            // console.log('middle clicked', index);
            // O o O o O : new Vertex index = middle_marker index + 1
            // 0 0 1 1 2
            //       *            click middle index 1
            // O o O o O o O      Vertex 2 create, middle 1, 2 create
            // 0 0 1 1 2 2 3
            this.insertMiddle(index + 1, middle_marker.getPosition());
            // middle_marker 삭제는 insertMiddle 안에서
            // this.middle_markers = this.middle_markers.deleteE(middle_marker);
            // // this.middle_markers = this.middle_markers.filter(function(e) {
            // //     return e != middle_marker;
            // // });
            // middle_marker.setMap(null);
        }.bind(this)
    );
    return middle_marker;
};

Polyline.prototype.moveVertex = function(marker) {
    // console.log(this);
    var latlng = marker.getPosition();
    var index = this.markers.indexOf(marker);
    this.setAt(index, latlng);
    // console.log(index, latlng);
    // left middle_marker location = index - 1
    if ( index > 0 ) {
        var middle_marker1 = this.middle_markers[index - 1];
        var last = this.getPath().getAt(index - 1);
        var _new = new LatLng(
            (last.lat() + latlng.lat()) / 2,
            (last.lng() + latlng.lng()) / 2);
        middle_marker1.setPosition(_new);
    }
    // right middle_marker location = index + 1
    if ( index < (this.markers.length - 1) ) {
        var middle_marker2 = this.middle_markers[index];
        var last = this.getPath().getAt(index + 1);
        var _new = new LatLng(
            (last.lat() + latlng.lat()) / 2,
            (last.lng() + latlng.lng()) / 2);
        middle_marker2.setPosition(_new);
    }
};
