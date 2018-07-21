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


//search page js
$(document).on("click","#foodsearchsubmit",function(e){

  var getValue = $("#listsearch").val();
  console.log(getValue);
  
});


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}