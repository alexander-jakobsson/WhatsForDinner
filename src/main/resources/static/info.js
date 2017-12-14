
//adds class if not present, removes class if present.
function myFunction() {
    var popup = document.getElementById("infopop");
    popup.classList.toggle("show");
    // popup.classList.toggle("hide");
}

function favoriteSelected(){
    var selected = document.getElementsByClassName("description")
    selected.classlist.toggle("selected")
}

document.getElementById("searchButton").addEventListener("click", foodSearch, false);
document.getElementById("favoritebtn").addEventListener("click", displayFavorites, false);
document.getElementById("searchBar").onkeypress = function(e) {
    if (!e) {
    e = window.event;
    }

    var keyCode = e.keyCode;
    if (keyCode == '13'){ // Enter pressed
        foodSearch();
    }
}

function getRecipe(recipeID) {
    var finalURL = "http://api.yummly.com/v1/api/recipe/" 
                    + recipeID
                    + "?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7"

    let myResult = $.ajax({
        url: finalURL,
        dataType: "json",
        

        success: function(data) {

            $( "#results #" + recipeID + " .bigPicture" )
                .append( "<a href=" + data.source.sourceRecipeUrl
                    + " target=_blank>" 
                    + "<img title='Click to go to recipe' class='imageresult' src=\"" 
                    + data.images[0].hostedLargeUrl 
                    + "\" ></a>" 
                )
        },

        type: 'GET'
    })

    return myResult;
}

function addToFavorites(recipeID) {
    var finalURL = "http://api.yummly.com/v1/api/recipe/" 
                    + recipeID
                    + "?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7"

    let myResult = $.ajax({
        url: finalURL,
        dataType: "json",
        

        success: function(data) {
                    document.getElementById("toBeAdded").value =
                    data.name + ", "
                    + data.source.sourceRecipeUrl + ", "
                    + data.images[0].hostedLargeUrl

        },

        type: 'GET'
    })

    return myResult;
}

function foodSearch() {
    var search = document.getElementById("searchBar").value;
    var searchArray = search.split(" ");
    var results =  document.getElementById("results");
    var basicURL = "http://api.yummly.com/v1/api/recipes"
                    + "?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7&requirePictures=true&flavor.salty.min=0";
    var finalURL = basicURL;
    for (let i = 0; i < searchArray.length; i++) {
        finalURL += "&allowedIngredient[]=" + searchArray[i];
        console.log(finalURL);
    }
   
    console.log(searchArray);
    console.log(finalURL);
    results.innerHTML = "";

    $.ajax({
        url: finalURL,
        dataType: "json",

        success: function(data) {
            console.log(data.criteria);
            console.log(data.matches);
            for (i = 0; i < data.matches.length; i++ ) {

                currentMatch = data.matches[i];
                var resultOfGetRecipe = getRecipe(currentMatch.id);
                console.log(JSON.stringify(resultOfGetRecipe));
                var ingredientsJoined  = currentMatch.ingredients.join(", ");
                console.log(currentMatch.ingredients);
                $( "#results" ).append("<div id=\"" + currentMatch.id + "\">"

                                        + "<div class='bigPicture'>"
                                        + "<div id='chartContainer" + i 
                                            + "' 'salty=" + currentMatch.flavors.salty 
                                            + "' 'sour=" + currentMatch.flavors.sour 
                                            + "' 'sweet=" + currentMatch.flavors.sweet 
                                        + "</div>"
                                        + "<div class='description'>"
                                        + "<p class='recipename'>" + currentMatch.recipeName + "   "
                                        + '<span recipeID="' + currentMatch.id + '" class="heartFavoriteButton">♥</span>'
                                        + "</p>"
                                        + "<p class='ingredientlist'>" + ingredientsJoined + "</p>"
                                        + "</div>"
                                        + "</div>");
            }
        },

        type: 'GET'
    })
}

function displayFavorites() {
    var favorites = document.getElementById("favoritestring").innerHTML;
    var favoritesArray = favorites.split(";");
    var results =  document.getElementById("results");
    results.innerHTML = "";
    for (var i = 0; i < favoritesArray.length; i++) {
        var favoriteData = favoritesArray[i].split(",");
        $("#results").append("<div id=\"" + favoriteData[1] + "\">"
        + "<div class='bigPicture'>"
            + "<a href=" + favoriteData[1] + " target=_blank>"
            + "<img title='Click to go to recipe' class='imageresult' src=\"" + favoriteData[2] + "\" ></a>"
            +"</div>"
            +"<div class='flavorProfile' function flavors()></div>"
            + "<div class='description'>"
            + "<p class='recipename'>" + favoriteData[0] 
            + "<span id='" + favoriteData[0] + "' class='removefavorite'>      ~~~ . ⃠ . </span>"
            + "</p>"
        + "</div>"
        + "</div>")
    }
}

function jstoggle() {
    $('.searchp').toggleClass("show");
}

function createChart(myButton) {
    var currentButton = document.getElementbyId("myButton")
    var currentFlavors = {
        sweet: currentButton.getAttribute("sweet"),
        sour: currentButton.getAttribute("sour"),
        salty: currentButton.getAttribute("salty")
    };

    var chart = new CanvasJS.Chart("myButton", {
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 300,
            indexLabel: "",
            dataPoints: [
                {y: currentMatch.flavors.sweet, label: "Sweet"},
                {y: currentMatch.flavors.sour, label: "Sour"},
                {y: currentMatch.flavors.salty, label: "Salty"}
            ]
        }]
    });
    chart.render();

}


$(document).on("click","#results .bigPicture", function(){
    console.log("You just clicked a picture div! :)")
});
$(document).on("click","#results .description", function(){
    console.log("You just clicked a description div! :)")
});
$(document).on("click","#results .heartFavoriteButton", function(){
    console.log("You just clicked a Heart Button! :)")
    console.log(event.target);
    addToFavorites(event.target.getAttribute("recipeID"));
});

$(document).on("click","#results .removefavorite", function(){
    console.log("You just clicked a Heart Button! :)")
    console.log(event.target);
    addToFavorites(event.target.getAttribute("recipeID"));
});

function flavors(){
    currentMatch = data.matches[i];
    var spicy=currentMatch.flavors.piquant;
    if (spicy<0.1667 ) {

    }else if (spicy < 0.34 ){

    }else if(spicy<0.501){

    }else if(spicy<0.67){

    }else if(spicy<0.84){

    }else{

    }

}