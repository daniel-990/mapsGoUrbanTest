//$(document).ready(function() {
window.onload = function(){
	var log = document.getElementById('texto');
	var divMapa = document.getElementById('mapa');
	var ubicar = document.getElementById('buscar');
	var buscart = document.getElementById('ibucame');

	navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);

	function fn_mal(){
		//console.log("esto no a cargado los datos" + fn_mal);
	}
	function fn_ok( respuesta ){
		var lat = respuesta.coords.latitude;
		var lon = respuesta.coords.longitude;

		var glatLon = new google.maps.LatLng(lat, lon);
		var objConfig = {
			zoom: 17,
			center: glatLon
		}
		var gMap = new google.maps.Map(divMapa, objConfig);

		var objConfigMarker = {
			position: glatLon,
			map: gMap,
			animation: google.maps.Animation.DROP,
			title: "usted esta a qui",
			draggable: true
		}
		
		var gMarker = new google.maps.Marker(objConfigMarker); //objeto A

		var gCoder = new google.maps.Geocoder();
		var objInformacion = {
			address: 'Calle 59 #37-54, Medellín, Antioquia'
		}
		//objInformacion.addres

		    gCoder.geocode(objInformacion, fn_coder);

		    function fn_coder(datos){
		    	var coordenadas = datos[0].geometry.location;
		    	var config = {
		    		map: gMap,
		    		animation: google.maps.Animation.DROP,
		    		position: coordenadas,
		    		title: 'este es mi hogar',
		    		draggable: true
		    	}
		    	var gMarkerDV = new google.maps.Marker(config); //objeto B
		    	    //gMarkerDV.setIcon (''); ---> esto es para agregar un icono al 

		    	    
		    	    google.maps.event.addListener(gMarkerDV, 'click', function(){
		    	    	console.log("con esto le puedo poner informacion a mi cuadro");
		    	    });

		     //con esto trazo mi linea de A a B
		    var objConfigDR = {
		    	map: gMap, //aqui es donde se van a dibujar nuestras lineas entre A y B
		    }

		    	var directionsService = new google.maps.DirectionsService();
		    	var directionsDisplay = new google.maps.DirectionsRenderer(objConfigDR);

                google.maps.event.addListener(gMarker, 'dragend', function(){
                
                     start = new google.maps.LatLng(gMarker.position.lat(),gMarker.position.lng());
                     end = new google.maps.LatLng(gMarkerDV.position.lat(),gMarkerDV.position.lng());
                     var request = {
                         origin:start,
                         destination:end,
                         travelMode: google.maps.TravelMode.DRIVING
                       };
                       directionsService.route(request, function(result, status) {
                         if (status == google.maps.DirectionsStatus.OK) {
                           directionsDisplay.setDirections(result);
                         }
                       });
                       console.log("esto esta dragg" + start + " -- " + end);
                       log.value = "A " + start + " -\n\nB " + end;
                   });
            }
	}

}
//namespace --> google.maps.algo
    
	//---
//});