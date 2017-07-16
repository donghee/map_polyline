function testOneVertex() {
    addVertex();
    unitjs.assert.equal( polyline.markers.length, 1 );
    unitjs.assert.equal( polyline.middle_markers.length, 0 );
    clickVertex(polyline.markers[0]);
}

function testTwoVertex() {
    addVertex();
    addVertex();
    unitjs.assert.equal( polyline.markers.length, 2 );
    unitjs.assert.equal( polyline.middle_markers.length, 1 );
    var a = polyline.markers[0].getPosition();
    var b = polyline.markers[1].getPosition();
    var c = polyline.middle_markers[0].getPosition();
    unitjs.assert.equal( a.lat() + b.lat(), c.lat() * 2);
    unitjs.assert.equal( a.lng() + b.lng(), c.lng() * 2);
}

function testMoveVertex() {
    addVertex();
    var a = polyline.markers[0];
    var pa = a.getPosition();
    var latlng = new LatLng(pa.lat() + 0.002, pa.lng() + 0.002);
    a.setPosition(latlng);
}

function testTwoVertexCenterClick() {
    addVertex();
    addVertex();
    polyline.insertMiddle(1, polyline.middle_markers[0].getPosition()); // bug
}
