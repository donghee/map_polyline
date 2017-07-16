Editable Polyline Javascript API
===================

Editable Polyline Javascript API for Daum, Naver (Korean) Map, and Google Map.

Currently Editable Polyline Javascript API provides :

* Clicking middle Marker between the vertices enables easy insertion.
* Drag and Drop vertex enables move vertex.
* Vertex Click Function can be customized.
  - function clickVertex(marker) {}
* Image of Vertex and middle marker can be customized as a URL reference.
  - function vertexImgURL(nth) {}
  - function middleImgURL() {}
* Currently Map zoom level follows the Map API specification.

Demo
-------------------

* [http://doojinkang.github.io/polyline/example/daum.html](http://doojinkang.github.io/polyline/example/daum.html)
* [http://doojinkang.github.io/polyline/example/naver.html](http://doojinkang.github.io/polyline/example/naver.html)
* [http://doojinkang.github.io/polyline/example/google.html](http://doojinkang.github.io/polyline/example/google.html)

About the source code
-------------------
* map_[daum|naver|google].js helps compatibibility between the MAP API providers.
* map_polyline.js has common feature for enhanced editable polyline.

Implementation note
-------------------
* Map, Polyline classes inherit from the original classes.
* Prototype inheritance from those classes.

How to Build
-------------------
* Build combine js src and minify to dist/js.

~~~~
$ npm install
$ npm run build
~~~~
or
~~~~
$ npm install
$ gulp default
~~~~

Usage
-------------------
* Create a Map
  - I tried to make common layer of daum.maps.Map, naver.maps.Map and google.maps.Map except the zoom level
  - the last argument is zoom level, and it follows the MAP provider's specification
~~~~
var map = new Map('map', 33.450701, 126.570667, 3);
~~~~
* Create a Polyline
~~~~
var polyline = new Polyline({
    map: map,
    path: [],
    clickable: true,
    strokeColor: '#5347AA',
    strokeWeight: 5
});
~~~~
* Implement the functions as you want
  - function vertexImgURL(nth) : return url of Vertex[nth] image
  - function middleImgURL() : return url of middle marker image
  - function clickVertex(marker) : action when Vertex is clicked

(TIP : vertexImageURL(nth) can be generated as SVG style and include number inside.)

* Please refer html examples for better knowledges.


What you need in your HTML
-------------------

For Daum Map API
-------------------
~~~~
<script type="text/javascript" src="//apis.daum.net/maps/maps3.js?apikey=<YOUR API KEY>"></script>
<script type="text/javascript" src="../dist/js/daum_polyline.min.js"></script>
~~~~
or for Debugging
~~~~
<script type="text/javascript" src="//apis.daum.net/maps/maps3.js?apikey=<YOUR API KEY>"></script>
<script type="text/javascript" src="../src/js/map_daum.js"></script>
<script type="text/javascript" src="../src/js/map_polyline.js"></script>
~~~~

For Naver Map API
-------------------
~~~~
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=<YOUR API KEY>"></script>
<script type="text/javascript" src="../dist/js/naver_polyline.min.js"></script>
~~~~
or for Debugging
~~~~
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=<YOUR API KEY>"></script>
<script type="text/javascript" src="../src/js/map_naver.js"></script>
<script type="text/javascript" src="../src/js/map_polyline.js"></script>
~~~~

For Google Map API
-------------------
~~~~
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<YOUR API KEY>"></script>
<script type="text/javascript" src="../dist/js/google_polyline.min.js"></script>
~~~~
or for Debugging
~~~~
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<YOUR API KEY>"></script>
<script type="text/javascript" src="../src/js/map_google.js"></script>
<script type="text/javascript" src="../src/js/map_polyline.js"></script>
~~~~

Author and License
-------------------
Author : Kang Doojin (doojin.kang@gmail.com)

The project is published under GPLv3 License. See LICENSE file for more informations
Feel free to take part in this project or/and contact me for any reason :-)

Thank you very much.
