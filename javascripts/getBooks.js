 define(["jquery", "q"], 
 function($, Q){

 	return function(dataPassed){

 			//set deffered object
		 	 var deferred = Q.defer();

		 	 //make ajax call
			 $.ajax({
			 	url: "https://nss-book-store.firebaseio.com/books.json",
			 	data: dataPassed
			 }).done(function(data){

			 	//resolve promise
			 	deferred.resolve(data);

			 })

			 //return promise state
			 return deferred.promise;
			 
	 	}
 });



