
//adds class if not present, removes class if present.
function myFunction() {
    var popup = document.getElementById("infopop");
    popup.classList.toggle("show");
    // popup.classList.toggle("hide");
}

document.getElementById("searchButton").addEventListener("click", foodSearch, false);

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

            $( "#results #" + recipeID + " .bigPicture" ).append( "<img src=\"" + data.images[0].hostedLargeUrl + "\" >")

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
                    + "?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7&requirePictures=true";
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
                $( "#results" ).append("<div id=\"" + currentMatch.id + "\">"
                                        + "<div class=bigPicture>"
                                        + "</div>"
                                        + "<div class=description>"
                                        + "<p>" + currentMatch.recipeName + "</p>"
                                        + "<p>" + currentMatch.ingredients + "</p"
                                        + "</div>"
                                        + "</div>");
               // $( "#results" ).append( "<p>" + currentMatch.recipeName + "</p>" );
               // $( "#results" ).append( "<p>" + currentMatch.ingredients + "</p>" );
                
            }
        },

        type: 'GET'
    })
}





