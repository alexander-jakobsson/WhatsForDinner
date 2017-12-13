
//adds class if not present, removes class if present.
function myFunction() {
    var popup = document.getElementById("infopop");
    popup.classList.toggle("show");
    // popup.classList.toggle("hide");
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

// http://api.yummly.com/v1/api/recipes?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7
// &allowedIngredient[]=garlic&allowedIngredient[]=cognac
// http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
//    &allowedIngredient[]=garlic&allowedIngredient[]=cognac

function getRecipe(recipeID) {
    var finalURL = "http://api.yummly.com/v1/api/recipe/" 
                    + recipeID
                    + "?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7"

    let myResult = $.ajax({
        url: finalURL,
        dataType: "json",
        

        success: function(data) {

            $( "#results #" + recipeID + " .bigPicture" ).append( "<a href=" + data.source.sourceRecipeUrl
                                     + " target=_blank>" +
                                        "<img title='Click to go to recipe' class='imageresult' src=\"" + data.images[0].hostedLargeUrl + "\" ></a>")

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
                getRecipe(currentMatch.id);
                var ingredientsJoined  = currentMatch.ingredients.join(", ");
                console.log(currentMatch.ingredients);
                $( "#results" ).append("<div id=\"" + currentMatch.id + "\">"
                                        + "<div class='bigPicture'>" //searchimg class + onclick= jstoggle
                                        + "<div id='chartContainer" + i + "' 'salty=" + currentMatch.flavors.salty +"' 'sour=" + currentMatch.flavors.sour +"' 'sweet=" + currentMatch.flavors.sweet + "' style= height: 370px width = 100%>Click for flavor profile</div>"
                                        + "</div>"
                                        + "<div class='description'>" //searchp class
                                        + "<p class='recipename'>" + currentMatch.recipeName + "</p>"
                                        + "<p class='ingredientlist'>" + ingredientsJoined + "</p>"
                                        + "</div>"
                                        + "</div>");
               // $( "#results" ).append( "<p>" + currentMatch.recipeName + "</p>" );
               // $( "#results" ).append( "<p>" + currentMatch.ingredients + "</p>" );
                
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
        $("#results").append("<div id=\"" + i + "\">"
            + "<div class='bigPicture'>"
            + "<img class='imageresult' src=\"" + favoriteData[2] + "\">"
            +"</div>"
            + "<p class='recipename'>"+ favoriteData[0]  +
        "</p>"
        + "</div>"
        + "</div>"
    )}
}




function jstoggle() {
    $('.searchp').toggleClass("show");

}

// $(".searchimg").click(function() {
//     $('.searchp').toggleClass("show");
// })


//pie chart script

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
// var myPieButton = document.getElementById("chartContainer0");
// myPieButton.addEventListener(
//     "click",
//     function () {
//         createChart("chartContainer0")
//     }
// );



