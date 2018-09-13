var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]; 

      // displayAnimalGifs function re-renders the HTML to display the appropriate content
      function displayAnimalGifs() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fapyKRiT6KIoUlJqZLaAl5VHUIf5Q3cs&limit=10&q=" + animal;

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {


          var animalDiv = $("<div class='animal'>");

          // Creating a div to hold the movie
          var animalView = $("#animal-view");

          console.log(response);

          animalView.html("");

          for (var i=0; i<10; i++) {

            var imgURL = "https://media.giphy.com/media/"+response.data[i].id + "/giphy.gif";
    
            //alert(imgURL);
            
            var rating = $("<p>Rating: "+response.data[i].rating+"</p>");

            var image = $("<img>").attr("src", imgURL);
            image.addClass("gif");
            image.addClass("playing");

            // Appending the image
            
            animalDiv.append(rating);
            animalDiv.append(image);
          }

        //   // Storing the plot
        //   var plot = response.Plot;

        //   // Creating an element to hold the plot
        //   var pThree = $("<p>").text("Plot: " + plot);

        //   // Appending the plot
        //   movieDiv.append(pThree);

        //   // Retrieving the URL for the image
        //   var imgURL = response.Poster;

        //   // Creating an element to hold the image
        //   var image = $("<img>").attr("src", imgURL);

        //   // Appending the image
        //   movieDiv.append(image);

        //   // Putting the entire movie above the previous movies
           $("#animal-view").prepend(animalDiv);
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("movie-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".movie-btn", displayAnimalGifs);


      





      $(document).ready(function() {
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    });


    //$(".gif").on('click', function() {
    //$(document).on("click", ".gif", clickOnGif(this));
    
    //function clickOnGif(){

    $(document).on("click", ".gif", function(){
        //alert("Clicked");
      var src = $(this).attr("src");
    if($(this).hasClass('playing')){
       //stop
       $(this).attr('src', src.replace(".gif", "_s.gif"))
       //alert($(this).attr('src'));
       $(this).removeClass('playing');
    } else {
      //play
      $(this).addClass('playing');
      $(this).attr('src', src.replace("_s.gif", ".gif"))
    }
    });
