define(["getpage"], function (getpage) {   
  'use strict';
  var FIRST_ITEM = 1;
  var LAST_ITEM = 6;
  function returnFirstPage() {
  	return parseInt(document.getElementById(document.getElementById("item-1").firstChild.id).innerHTML);
  }
  //Return the active item and the next starting item
  function returnActiveAndStartIndex(id) {
  	var activeItemArrTemp, //item with the active class
  	startIndex, 
  	active, 
  	activeListItem;
  	if (id === ".active") {
  		activeListItem = document.querySelector(".active"); //get the active item
	    //the index of the first result to return from the anchor in active item
	    startIndex = parseInt(document.getElementById(activeListItem.firstChild.id).innerHTML);
	    //Get the active list item in pagination list
	    activeItemArrTemp = activeListItem.id.split("-");
	    active = parseInt(activeItemArrTemp[1]);
  	}
  	else {
  		activeListItem = document.getElementById(id);
  		startIndex = parseInt(activeListItem.innerHTML); //anchor clicked is the selectedIndex
    	activeItemArrTemp = activeListItem.parentNode.id.split("-"); 
		active = parseInt(activeItemArrTemp[1]); //the next active item is the item clicked too
	}
	return {active:active,startIndex:startIndex};
  }
  //find the html object that triggered the event
  function findEventTarget(event) {
    var el = event.target, found;
    if (el.id === "" || !((el.id === "prev" || el.id === "next") || el.id.startsWith("anchor-"))) {
       	found = (el.id === "prev" || el.id === "next") || el.id.startsWith("anchor-");
        while (el && !found)    {
            el = el.parentElement;
            found = (el.id === "prev" || el.id === "next") || el.id.startsWith("anchor-");
        }
    }  
	else if ((el.id === "prev" || el.id === "next") || el.id.startsWith("anchor-")) {
		found = true;
	}
	return {id:el.id, found:found};
  }
  //returns next page to be showed
  function returnNextPage(id, totalResults) {
	var paginationObject;
    if (id !== "prev" && id !== "next") {     //If is an anchor "item-" + anchor	
		paginationObject = returnActiveAndStartIndex(id);
		//the first number in pagination doesn't change, so we take the first anchor number 
	    paginationObject.firstPage = returnFirstPage();
	}
	else {
	    paginationObject = returnActiveAndStartIndex(".active");
	    if (id === "prev") { //if the "prev" anchor is clicked
	        if (paginationObject.active === FIRST_ITEM) {
	            if (paginationObject.startIndex > 1) {
	            	paginationObject.startIndex = paginationObject.startIndex - 1; //substract 1 if we are in the first item
	            }
	            paginationObject.firstPage = paginationObject.startIndex; //the first page is also the index
	        }
	        else {
	            paginationObject.active = paginationObject.active - 1; //if we are not in the last item, substract 1
	            paginationObject.startIndex = paginationObject.startIndex - 1; //previous index
	            //the first number in pagination doesn't change, so we take the first anchor number 
				paginationObject.firstPage = returnFirstPage();
	        }
	    }
	    if (id === "next") { //if the "next" anchor is clicked
	        if (paginationObject.active === LAST_ITEM) {
	            if (paginationObject.startIndex < totalResults) {
	            	paginationObject.startIndex = paginationObject.startIndex + 1; //adds 1 if we are in the last item
	            }
	            paginationObject.firstPage = paginationObject.startIndex - (LAST_ITEM-1); //the first page is the new last page minus 5
	    	}
	    	else {
	            paginationObject.active = paginationObject.active + 1; //if we are not in the last item, add 1
	            paginationObject.startIndex = paginationObject.startIndex + 1; //next index
	            //the first number in pagination doesn't change, so we take the first anchor number 
				paginationObject.firstPage = returnFirstPage();
	    	}	
	    }
	}
	return paginationObject;
  }
  function addEvents(totalResults) {
    //adding event listener to every anchor in pagination
  	var parentUl = document.getElementById("itembox"); //getting the parent ul 
	parentUl.addEventListener("click", 
    	function (event) {
			var eventTarget;
			eventTarget = findEventTarget(event);
			if (eventTarget.found) {		
            	event.preventDefault();
				var paginationObject = returnNextPage(eventTarget.id, parseInt(totalResults));
	            getpage.getPageData(paginationObject.startIndex, paginationObject.active, paginationObject.firstPage);
        	}
        }, false);
	}
  	return {
		addEvents: addEvents
  	};
});