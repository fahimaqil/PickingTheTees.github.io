"use strict";

function initAutocomplete() {
  var uluru = {lat: 54.5638558, lng: -1.290424};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: uluru,
    zoom: 13,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeId: 'hybrid'
  });

  var marker = new google.maps.Marker({
    position: uluru,
    draggable: true
  });

  marker.addListener('dragend', function() {
    var position = marker.getPosition()
	document.getElementById("marker-lat").value = position.lat();
	document.getElementById("marker-lng").value = position.lng();
  });

  // Create the search box
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    var result = places[0];
    uluru = {lat: result.geometry.location.lat(), lng: result.geometry.location.lng()};
    map.setCenter(uluru);
    map.setZoom(13);
    marker.setMap(map);
    marker.setPosition(uluru);
	document.getElementById("marker-lat").value = uluru.lat;
	document.getElementById("marker-lng").value = uluru.lng;
  });
}
