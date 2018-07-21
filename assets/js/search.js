$(document).on("click", "#restaurentsubmit", function (e) {

  $(".searchresults").empty();
  var isValid = true;
  var food = $("#foodyousearchfor").val();
  var zip = $("#zip").val();
  console.log(food);
  console.log(zip);
  $('#foodyousearchfor,#zip').each(function () {
    if ($.trim($(this).val()) == '') {
      isValid = false;
      $(this).css({
        "border": "1px solid red",
        "background": "#FFCECE"
      });
    }
    else {
      $(this).css({
        "border": "",
        "background": ""
      });
    }
  });
  if (isValid == false)
    event.preventDefault();

  // Create the Query here by grabbing the place and food from the page
  var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + food + "&location=" + zip + "&price=1" + "&limit=20" +"&radius=20000";

  console.log("url: " + queryURL);

  //Prefilter start
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }//End if
  });//End prefilter

  if(food.length==0 ||zip.length ==0){
    //do nothing
  }
  else{
    $.ajax({
      url:queryURL,
      method:'GET',
      headers: { 'Authorization': 'Bearer ' + 'wEs3a44nrETvxdwwFOpyxxTWigVGkLNA1mU8aVsl7_55WsohnRihzkvHm9k7yZ78-rXXbTlhvmSK7SvFoocWJVKcvGgWPjG7m98ZKPPLUxPpzLY4DBXg2ljRbjRKW3Yx' }
    }).then(function(response){
      console.log(response);
      displayresults(response);

    })
  }
});


function displayresults(response){

  
  for(var i=0;i<response.businesses.length;i++){
    var address = response.businesses[i].location.display_address;
   
    var name = response.businesses[i].name;
   
    var phone = response.businesses[i].display_phone;
   
    var rating = response.businesses[i].rating;
    var imageurl = response.businesses[i].image_url;

    var yelpurl = response.businesses[i].url;
    

    var resrow = $("<row>");
    resrow.addClass("myclass");
    var p1 = $("<p>").html('<strong>' +name+ '</strong>' );
    var p2 = $("<p>").html('<strong> Address :  </strong>' +address);
    var p3 = $("<p>").html('<strong>Phone : </strong>' +phone);
    var p4 = $("<p>").html('<strong>Rating : </strong>' +rating);
    var p5 = $("<td class='imagetd'>").html('<img src="'+imageurl+'" width="90" height="150">');
    var p6 = $('<a href ="' +yelpurl+ '" target="_blank"><input type="submit" id= "viewsubmit" value="VIEW"></a>');
   
    var texttd = $("<td>");
    texttd.append(p1,p2,p3,p4,p6);
    resrow.append(p5,texttd);
    $(".searchresults").append(resrow);
  }

  $("#viewsubmit").on("click",function(e){

    location.href= yelpurl;

});
  
}

