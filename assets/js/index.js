document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
  });

$(document).on("click","#submit",function(e){
  var getValue = $("#list").val();
  console.log(getValue);
  console.log("clicked");

  if(getValue == "food"){

      location.href="#foodsearch";

  }else if(getValue =="recipe"){

    location.href="#recipesearch";

  }else {

    location.href = "#restaurentsearch";

  }
  
});