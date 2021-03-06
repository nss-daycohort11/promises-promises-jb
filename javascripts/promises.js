requirejs.config({ 
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    "q": "../lib/bower_components/q/q"
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "lodash", "hbs", "bootstrap", "get-books", "getBookTypes", "getBooks"], 
  function($, _, Handlebars, bootstrap, books, getBookTypes, getBooks) {

  //New Ben code
    //my vars to work with
    var typeObject = {};
    var bookObject ={};
    var finalObject ={};
    var filteredObject ={};

      //begin promises tower
      getBookTypes()
      .then(function(dataReturned){
        //log first data
        console.log("dataReturned", dataReturned);

        //set type object to be first data
        typeObject = dataReturned;

        //get next set of data, examine second promise
        return getBooks();

        //run if second promise resolved
      }).then(function(secondDataReturned){
          console.log("second dataReturned: ", secondDataReturned);

          //set book object to second data returned
          bookObject = secondDataReturned ;
          
      }).done(function(data){
        console.log("data in done function is ", data);
          
          console.log("type object", typeObject);
          console.log("book object", bookObject);

          typeObject = Object.keys( typeObject ).map(key => typeObject[ key ]);
          bookObject = Object.keys( bookObject ).map(key => bookObject[ key ]);

          finalObject = bookObject.map(book => {
              book.type = _.find(typeObject, { id:book.booktype }).label;
              console.log("book", book);
              return book;
          });

      

          //set final Object with new keys, we could have just referenced book object but whatevs
          finalObject.books = bookObject;

          console.log("finalObject", finalObject);

          require(['hbs!../templates/benBooks'], function(bookTpl) {
            $("#bookList").html(bookTpl(finalObject));
          });



           //populate select here
          $("#selected-filter").change(function(){
            filteredObject = {
              books :{}
            };

            var selectedItem = $("#selected-filter").val();
            console.log("bookObject", bookObject);

            for(var key in bookObject){
                console.log(bookObject[key].readableBookType);

                if(bookObject[key].readableBookType  === selectedItem){

                  console.log("current book",bookObject[key]);
                  filteredObject.books[key] = bookObject[key];

              } if (selectedItem === "no filter"){
                filteredObject = finalObject;
              }
            }

                console.log("final Filtered", filteredObject);
                require(['hbs!../templates/benBooks'], function(bookTpl) {
                  $("#bookList").html(bookTpl(filteredObject));
                });
            


                });

      });

    //OLD STEVE CODE
        // books.load(function(bookArray) {
        //   require(['hbs!../templates/books'], function(bookTpl) {
        //     $("#bookList").html(bookTpl({ books:bookArray }));
        //   });
        // });
  });





  //Steve Pseudo-code
    /* Here's some pseudo-code for how it should look once you
       start using promises

    getBookTypes()
      .then(function(types) {
        getBooks(types);
      })
      .then(function(books) {
        // add the type key to each book that is currently
        // being performed in the get-books file

        // then bind the template to the data 
        // (p.s. make the handlebar template a module dependency)
        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ books:bookArray }));
        });

      })
     */






// 1) You should have two XHRs, each performed in their own require module.
// 2) Each module should return a promise for use in the promises.js module.
// 3) I've included Bootstrap, so use the grid system to build rows for each book.
// 4) console.log everything to ensure you know what's contained in every variable and how the program logic executes.
// 5) Update the handlebars file to output all the other properties of the book. You choose the layout and style.










