define(function () {
	'use strict';
	//API id
	var API_ID = "AIzaSyAOkeze_9eWjH5XkE5m3N0iptgzRPeiAR4",
	//Custom Search Identifier
	CX = "018042016272617285396:zbz1kqzxosw",
	MAX_ITEMS = 10;
	function getData(options) {
		//Url with the api
		var url = "https://www.googleapis.com/customsearch/v1?key="+API_ID+"&cx="+CX+"&q=",
		//Ajax object
		xmlHttp =new XMLHttpRequest(),
		startIndex = options.startIndex  > 0 ?  options.startIndex - 1 : options.startIndex;
		//Checking call result
		xmlHttp.onreadystatechange=function() {
  			//On success, send result to callback
  			if (xmlHttp.readyState===4 && xmlHttp.status===200) {
    			options.callback(xmlHttp.responseText);
  			}
  			else if (xmlHttp.readyState===4 && xmlHttp.status !== 200) { //on error
  				options.callback("error");
  			}
  			else if (xmlHttp.readyState !== 4) { //while executing
  				options.callback("loading");
  			}
  		};
  		//url with the string query
  		url = url + options.query.replace(/\s/g,"%20").replace(/&/g,'&amp;').replace(/\?/g,'&quest;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  		//url with the number of items we want and start index
  		url = url + "&num="+MAX_ITEMS+"&start=" + ((startIndex * MAX_ITEMS) + 1);
  		//url = "json.txt";
  		//ajax call
		xmlHttp.open("GET",url,true);
		xmlHttp.send();
	}
	
    return {
        getData: getData
    };
});
