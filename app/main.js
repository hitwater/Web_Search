define(["events","getpage"], function (events, getpage) {
	'use strict';
	var searchButton = document.getElementById("search_button");
	//Event triggered when someone pushes the search button
	searchButton.addEventListener("click", function() {
		//Check if there is a query string
		getpage.getPageData(0, 1, 1,function(totalResults){ events.addEvents(totalResults); });
    });
    	
});
