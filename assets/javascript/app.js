var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]

function initialLoad(){
for (i=0; i < animals.length; i++) {
    var topicName = animals[i];
    $("#topics").append("<button class='topicBtn' id="+topicName+">"+topicName+"</button>")
}
}
initialLoad();

$("#searchAnimal").on("click", function(){
    var topicValue = $("#searchTopic").val();
    $("#topics").append("<button class='topicBtn' id="+topicValue+">"+topicValue+"</button>");
    $("#searchTopic").val("");
})

$(".topicBtn").on("click", function(event) {
    //console.log(event.target.id);
    var topicValue = event.target.id;
    //console.log(topicValue);
    var URL = "http://api.giphy.com/v1/gifs/search?q="+topicValue+"&limit=10&api_key=ePH8hUjeUvUmm5FngErya18PPS3yvnKZ"
    $.ajax({
        url: URL,
        method: "GET",
        //data: {"api-key":"688ebf136fc34c92aa7ab402ce7123df", 'q': searchTerm, 'begin_date': startDate, 'end_date': endDate,"sort":"newest"}
      }).then(function(resp) {
        //console.log(resp);
        responses=resp.data;
        console.log(responses);
        var animalName = "GIF"+topicValue;
        //var animalNameRepo = animalName+i
        console.log(animalName);
        for (i=0; i<responses.length;i++){
            $("#topicGif").append("<div class ='gifRepo' id='"+animalName+i+"'></div>");
            $("#"+animalName+i).append("<p> Rating: "+responses[i].rating)+"</p>";
            $("#"+animalName+i).append("<img src="+responses[i].images.fixed_width_still.url+" data-still='"+responses[i].images.fixed_width_still.url+"' data-animate='"+responses[i].images.fixed_width.url+"' data-state='still' class='gif'>");
        }
})
})


