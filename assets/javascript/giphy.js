        // Intial array of berries
        var berries = ["Blueberry", "Goji berry", "Rasberry", "Cranberry"];

        // displayBerryInfo function re-renders the HTML to display the appropriate content
        function displayBerryInfo() {

            var berry = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + berry + "&limit=1&api_key=eejgKEuBRPrMbeMvfSxPzrJXjApElEz6";
            console.log(this)

            // Creating an AJAX call for the specific button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                // Creating a div to hold the berry
                var berryDiv = $("<div class='berry'>");

                // Storing the rating data
                var rating = response.data[0].rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                berryDiv.append(pOne);

                // Retrieving the URL for the gif
                var gifURL = response.data[0].embed_url;

                // Creating an element to hold the image
                var gif = $("<div>").attr("src", gifURL);

                // Appending the image
                berryDiv.append(gif);

                // Putting each searched gif below each other
                $("#gif-view").append(berryDiv);
              
            });

        }

        // Function for displaying berry gif
        function renderButtons() {

            // Deleting the berry prior to adding new berry
            $("#buttons-view").empty();

            // Looping through the array of movies
            for (var i = 0; i < berries.length; i++) {
                console.log("loop ran");
                // Then dynamicaly generating buttons for each movie in the array

                var a = $("<button>");
                // Adding a class of movie to our button
                a.addClass("berry");
                // Adding a data-attribute
                a.attr("data-name", berries[i]);
                // Providing the initial button text
                a.text(berries[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }

        // This function handles events where a button is clicked
        $("#add-berry").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var berry = $("#berry-input").val().trim();

            // Adding movie from the textbox to our array
            berries.push(berry);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        });

        // Adding a click event listener to all elements with a class of "berry"
        $(document).on("click", ".berry", displayBerryInfo);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();