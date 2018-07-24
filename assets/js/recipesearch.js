$(document).ready(function(){
    console.log("hi");
    $("#detailresults").empty();
    
    var recipeId = localStorage.getItem("recipe");

    console.log(recipeId);

    function displayRecipe(name) {

        var queryURL = "https://api.yummly.com/v1/api/recipe/" + name + "?_app_id=fdcfc01e&_app_key=83ef5d0b3506805bd21bcb62ae101402";

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(response)
        
            var name = response.name;
            var url = response.images[0].hostedLargeUrl;

            var resrow = $("<div>");
            resrow.addClass("detailsclass");

            var left = $("<td id='left'>");
            var right = $("<td id='right'>");

            var p1 = $("<h2>").html('<strong>' +name+ '</strong>' );
            
            var p5 = $("<tr class='imagetd'>").html('<img src="'+url+'" width="500" height="450">');

            var ingredients = $("<div>");

            for(var i = 0; i < response.ingredientLines.length; i++) {
                var ingredient = $("<h5>").text("- " + response.ingredientLines[i]);
                ingredients.append(ingredient); 
            }


            var p2 = $("<h5>").text("Serving size: "+response.numberOfServings);
            var p3 = $("<h5>").text("Rating : "+response.rating);
            var p4 = $("<h5>").text("Total Time : "+response.totalTime);
            
            var courseclass = $("<h5>").text("Course : "+response.attributes.course[0]);
             var source = $("<h5>").text("Source : "+response.source.sourceDisplayName+" / "); 
             var sourceurl = $("<a href ="+response.source.sourceRecipeUrl+"></a>").text("Visit"); 

console.log(response.attribution.url);
             var yummlyurl = $("<a href =" +response.attribution.url+ "></a>").html("<h5>SEE FULL RECIPE</h5>");

            source.append(sourceurl);
            left.append(ingredients);
            right.append(source,p2,courseclass,p3);
            resrow.append(p1,p5,left,right,yummlyurl);

            $("#detailresults").append(resrow);
        });
    }

    displayRecipe(recipeId);

    // when full recipe button clicked
    // user taken to original recipe page
    $(document.body).on("click", ".link", function() {
        var link = $(this).attr("link");
        console.log(link)
        window.location = link;
    });
})