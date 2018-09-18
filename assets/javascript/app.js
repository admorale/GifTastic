// Array with the initial buttons
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar-glider", "chinchilla", "hedgehog", "hermit-crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup-pig", "serval", "salamander", "frog"];
// Initial fucntion to populate the first buttons
function initialLoad(){
$("#topics").empty();
for (i=0; i < animals.length; i++) {
    var topicName = animals[i];
    $("#topics").append("<button class='topicBtn' id="+topicName+">"+topicName+"</button>")
}
}
initialLoad();

// Generating GIFs from animal buttons
$(document).on("click", ".topicBtn", function(event) {    
    function addEventToBtn() {
    $("#topicGif").empty();
    var topicValue = event.target.id;
    var URL = "https://api.giphy.com/v1/gifs/search?q="+topicValue+"&limit=10&api_key=ePH8hUjeUvUmm5FngErya18PPS3yvnKZ"
    $.ajax({
        url: URL,
        method: "GET",
      }).then(function(resp) {
        responses=resp.data;
        var animalName = "GIF"+topicValue;
        for (i=0; i<responses.length;i++){
            $("#topicGif").append("<div class ='gifRepo' id='"+animalName+i+"'></div>");
            $("#"+animalName+i).append("<p> Rating: "+responses[i].rating+"</p>");
            $("#"+animalName+i).append("<img src="+responses[i].images.fixed_height_still.url+" data-still='"+responses[i].images.fixed_height_still.url+"' data-animate='"+responses[i].images.fixed_height.url+"' data-state='still' class='gif'>");
        }
        // Adding event listener to the dinamically created GIFs 
        $(".gif").on("click", function(event) {
            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
             } else {
               $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
        });
        // End of section - Adding event listener to new dinamically generated GIFs 
    }
      )}
      addEventToBtn();
})
// Create new animal buttons
$("#searchAnimal").on("click", function(){
    var topicValue = $("#searchTopic").val();
    $("#topics").append("<button class='topicBtn' id="+topicValue+">"+topicValue+"</button>");
    $("#searchTopic").val("");
    animals.push(topicValue);
})

