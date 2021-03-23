var SliderStatus = true;

// Navigation
(function($){

	"use strict"

	$(window).on("scroll", function(){
		var navBar = $(".navbar-fixed-top"),
			windowHeight = $(this).innerHeight()-navBar.innerHeight();

		if($(this).scrollTop() > windowHeight)
		{
			SliderStatus = false;
			navBar.removeClass("bottom");
		}
		else
		{
			SliderStatus = true;
			navBar.addClass("bottom");
		}
	});
})(jQuery);

// Header Slider

// TEMPLATE
(function($){
	$(document).on("ready", function(){
		"use strict"
		

		//Header fit screen

	    $(function() {
	        "use strict";
	        $("#header").css({
	            "height": ($(window).height()) + "px"
	        });
	        $(window).resize(function() {
	            $("#header").css({
	                "height": ($(window).height()) + "px"
	            });
	        });
	    });

		// anchor handler
		$(document).on("click", "a", function(e){
			var full_url = this.href,
				windowWidth = window.innerWidth,
				navBar = (windowWidth >= 768) ? $(".navbar-fixed-top") : $(".navbar-header"),
				windowLocation = window.location.href.split("#")[0],
				parts = full_url.split("#");

			if(windowLocation !== parts[0])
				return

			if(parts[1].length > 0 && $("#" + parts[1]).length > 0)
			{
				$.smoothScroll({
					offset : -navBar.innerHeight(),
					scrollTarget: "#" + parts[1],
					speed : 500
				});
			}

		    return false;
		});


		// animated element
		
	    // $(".skill-bar .percentage").appear(function() {
	    //     var element = $(this),
	    //     	animation = element.data("value");
	    //     element.animate({
	    //     	"width" : animation
	    //     }, 2000);
	    // });
	});


   

    //Google map

	// $(document).on("ready", function() {

	// 	var map;

	// 	$(".btn-map").click(function() {
	// 		if($("#google_map").children() > 0)
	// 			$("#google_map").slideToggle(300, function(){
	// 				map.getCenter();
	// 			});
	// 		else
	// 			$("#google_map").slideToggle(300, initialize);
    //     });

	// 	function initialize() {
	// 	    var mapOptions = {
	// 	        zoom: 17,
	// 	        center: new google.maps.LatLng(-6.86041, 107.590006),
	// 	        disableDefaultUI: true,
	// 	        scrollwheel: false,
	// 	        styles: [{
	// 	            "featureType": "water",
	// 	            "elementType": "geometry",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 17
	// 	            }]
	// 	        }, {
	// 	            "featureType": "landscape",
	// 	            "elementType": "geometry",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 20
	// 	            }]
	// 	        }, {
	// 	            "featureType": "road.highway",
	// 	            "elementType": "geometry.fill",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 17
	// 	            }]
	// 	        }, {
	// 	            "featureType": "road.highway",
	// 	            "elementType": "geometry.stroke",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 29
	// 	            }, {
	// 	                "weight": 0.2
	// 	            }]
	// 	        }, {
	// 	            "featureType": "road.arterial",
	// 	            "elementType": "geometry",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 18
	// 	            }]
	// 	        }, {
	// 	            "featureType": "road.local",
	// 	            "elementType": "geometry",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 16
	// 	            }]
	// 	        }, {
	// 	            "featureType": "poi",
	// 	            "elementType": "geometry",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 21
	// 	            }]
	// 	        }, {
	// 	            "elementType": "labels.text.stroke",
	// 	            "stylers": [{
	// 	                "visibility": "on"
	// 	            }, {
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 16
	// 	            }]
	// 	        }, {
	// 	            "elementType": "labels.text.fill",
	// 	            "stylers": [{
	// 	                "saturation": 36
	// 	            }, {
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 40
	// 	            }]
	// 	        }, {
	// 	            "elementType": "labels.icon",
	// 	            "stylers": [{
	// 	                "visibility": "off"
	// 	            }]
	// 	        }, {
	// 	            "featureType": "transit",
	// 	            "elementType": "geometry",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 19
	// 	            }]
	// 	        }, {
	// 	            "featureType": "administrative",
	// 	            "elementType": "geometry.fill",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 20
	// 	            }]
	// 	        }, {
	// 	            "featureType": "administrative",
	// 	            "elementType": "geometry.stroke",
	// 	            "stylers": [{
	// 	                "color": "#000000"
	// 	            }, {
	// 	                "lightness": 17
	// 	            }, {
	// 	                "weight": 1.2
	// 	            }]
	// 	        }]
	// 	    };

	// 	    map = new google.maps.Map(document.getElementById('google_map'), mapOptions);

	// 	    var contentString = "<div class='map-tooltip'><h2>Manja<span>real</span></h2></div>";

	// 	    var infowindow = new google.maps.InfoWindow({
	// 	    	content: contentString
	// 	    });

	// 		var marker = new google.maps.Marker({
	// 			position: new google.maps.LatLng(-6.86041, 107.590006),
	// 			map: map,
	// 			icon : "images/map-pin.png"
	// 		});

	// 		google.maps.event.addListener(marker, 'click', function() {
	// 			infowindow.open(map,marker);
	// 		});
	// 	}
	// });

})(jQuery);