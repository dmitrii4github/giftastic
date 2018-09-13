var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]; 

      // displayAnimalGifs function re-renders the HTML to display the appropriate content
      function displayAnimalGifs() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fapyKRiT6KIoUlJqZLaAl5VHUIf5Q3cs&limit=10&q=" + animal;

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {


          var animalDiv = $("<div class='animal'>");

          // Creating a div to hold the animal
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

           $("#animal-view").append(animalDiv);
        });

      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a animal button is clicked
      //$("#add-animal").on("click", function(event) {

      $(document).on("click", "#add-animal", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        //alert(animal);

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal-btn"
      $(document).on("click", ".animal-btn", displayAnimalGifs);


      





      $(document).ready(function() {
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    });


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
