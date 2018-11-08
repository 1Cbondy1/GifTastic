// Initial array of animals
var animals = ["Bear", "Puffin", "Ferret", "Wolf", "Falcon", "Elephant"];

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

    var animal = $(this).attr("data-name");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + animal;

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var animalSpan = $("<span>");

        // defining variables for still and animated versions of the gif that has been selected
        var imgStill = response.data.images.fixed_height_still.url;
        var imgAnimate = response.data.images.fixed_height.url;

        // creating a img tag in the html DOM to place the gif links into
        var imgPlace = $("<img src= '" + imgStill + "' data-still='" + imgStill + "' data-animate='" + imgAnimate + "' data-state='still' class='animal-gif'>");

        // appending selected gif to the span
        animalSpan.append(imgPlace);

        // prepending span containing selected gif to the beggining of the animals-view div
        $("#animals-view").prepend(animalSpan);

        $(".animal-gif").on("click", function() {

            console.log($(this).attr("data-state"));

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } 
            else if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });

}

function renderButtons() {

    $("#added-buttons").empty();

    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");

        a.addClass("animal-btn");

        a.attr("data-name", animals[i]);

        a.text(animals[i]);

        $("#added-buttons").append(a);
    }
}

$("#add-animal").on("click", function(event) {

    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();
});

$(document).on("click", ".animal-btn", displayGif);

renderButtons();