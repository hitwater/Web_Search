define(["ajaxcall", "layout"], function (ajaxcall, layout) {  
  'use strict';
  //Return the results related to a new index chosen with the pagination links
  /**
  	@param {int} startIndex: results page index
  	@param {int} active: new active item in pagination anchor list
  	@param {int} firstPage: new first page number in pagination anchor list
  */
  function getPageData(startIndex, active, firstPage, callback) { 
		var query = document.getElementById("query").value;
		if (query !== "") {
    		ajaxcall.getData({callback: //call api
    			function(response) { 
    				if (response === "error") { 
    					if (document.getElementById("itembox").style.display !== "block") {
    					    document.getElementById("itembox").style.display = "block";
    					}
    					if (document.getElementById("imagebox").style.display === "block") {
    						document.getElementById("imagebox").style.display = "none";
    					}
    					document.getElementById("itembox").innerHTML = '<li><h4>Unable to connect to API server</h4>';
    				}
    				else if (response === "loading" && document.getElementById("itembox").style.display !== "block") {
    					if (document.getElementById("itembox").style.display !== "block") {
    					    document.getElementById("itembox").style.display = "block";
    					}
    					document.getElementById("itembox").innerHTML = '<li><h4>Loading...</h4>';
    				}
    				else if (response !== "error" && response !== "loading") {
    					var totalResults = layout.paintIt(response, active, firstPage); //paints the web with first results
    					if (callback) {
    						callback(totalResults);
    					}
    					if (document.getElementById("itembox").style.display !== "block") {
    						document.getElementById("itembox").style.display = "block";	
    					}
    		   		}
    			}, query:query, startIndex:startIndex});
    	}
  }
  return {
  	getPageData:getPageData
  };
});