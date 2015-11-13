 define(["jquery", "lodash", "q"],
 function($, _, Q) {
  
	function getBookTypes () {
		var monkeybutt = 1;
		console.log(monkeybutt);
	 	var deferred = Q.defer();
	  	console.log("yep");

	  $.ajax({ url:"https://nss-book-store.firebaseio.com/booktypes.json"})
	    // XHR was successful
	    .done(function(data) {
	   	console.log("data", data);
	    types = Object.keys(data).map(key => types[ key ]);
	    console.log("types", types);
	      // Now we can resolve the promise and send the data
	      deferred.resolve(types);
	    })

	    // XHR failed for some reason
	    .fail(function(xhr, status, error) {
	      // Since the call failed, we have to reject the promise
	      deferred.reject(error);
	    });
	  return deferred.promise;
	}
});