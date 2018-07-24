$(document).ready(function () {
    $('select').formSelect();
});

$('.chips').chips();

$("#recipesubmit").on("click",function(e){
    var choice = $("#choice").val();
    var diet = $(".diet").val();
    var allergy = $(".allergy").val();
    
    console.log(choice);
    console.log(diet,allergy);

    console.log(allergy);
    console.log(allergy.length);
    
    if(choice == null){
       
        $(this).css({
            "border": "1px solid red",
            "background": "red"
          });
    }
    else{
        
        if(diet != null){
            choice = choice+"&allowedDiet[]="+diet;
            console.log(choice);
        }
        if(allergy!=null){
            for(var i=0;i<allergy.length;i++){

                choice+= "&allowedAllergy[]="+allergy[i];
            }
            console.log(choice);
        }
        
        var queryUrl = "http://api.yummly.com/v1/api/recipes?_app_id=fdcfc01e&_app_key=83ef5d0b3506805bd21bcb62ae101402&q="+choice+ "&maxResult=12&start=12";
    
        $.ajax({
            url:queryUrl,
            method:"GET"
        }).then(function(response){
            console.log(response);
            displayrecipe(response);
        })
    }


    function displayrecipe(response){
        $("#reciperesults").empty();

        console.log(response.matches.length);
        for(var i=0;i<response.matches.length;i++){

            var name = response.matches[i].recipeName;
            var url = response.matches[i].imageUrlsBySize[90];
            // var id = response.matches[i].id;
            // console.log(id);

            var resrow = $("<row>");
            resrow.addClass("myclass");
            var p1 = $("<p>").html('<strong>' +name+ '</strong>' );
            
            var p5 = $("<td class='imagetd'>").html('<img src="'+url+'" width="90" height="150">');

            var p6 = $('<input type="submit" id= "viewsubmit" value="VIEW"></a>');

            p6.attr("getId", response.matches[i].id);
            //console.log()
           
           
            var texttd = $("<td>");
            texttd.append(p1,p6);
            resrow.append(p5,texttd);
            $("#reciperesults").append(resrow);


           
        }
    }


    $(document.body).on("click", "#viewsubmit", function() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = mm + '-' + dd + '-' + yyyy;

        var recipeId = $(this).attr("getId");
        localStorage.setItem("recipe", recipeId);

       
    
        window.open('details.html');
    
    });

   
})