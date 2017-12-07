
//adds class if not present, removes class if present.
function myFunction() {
    var popup = document.getElementById("infopop");
    popup.classList.toggle("show");
    // popup.classList.toggle("hide");
}

document.getElementById("searchButton").addEventListener("click", bookSearch, false);

document.getElementById("searchBar").onkeypress = function(e) {
    if (!e) {
    e = window.event;
    }

    var keyCode = e.keyCode;
    if (keyCode == '13'){ // Enter pressed
        bookSearch();
    }
}

// http://api.yummly.com/v1/api/recipes?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7
// &allowedIngredient[]=garlic&allowedIngredient[]=cognac
// http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
//    &allowedIngredient[]=garlic&allowedIngredient[]=cognac

function bookSearch() {
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

            // "http://api.yummly.com/v1/api/recipes?_app_id=92951a32&_app_key=d9bea4f85046c51b5bc24474077128d7"
           // console.log(data);
            console.log(data.criteria);
            console.log(data.matches);
            for (i = 0; i < data.matches.length; i++ ) {

               // results.innerHTML = data.matches[i].recipeName;
                $( "#results" ).append( " <img src=\"" + data.matches[i].smallImageUrls + "\" >");
                $( "#results" ).append( "<p>" + data.matches[i].recipeName + "</p>" );

            }
        },

        type: 'GET'
    })
}



