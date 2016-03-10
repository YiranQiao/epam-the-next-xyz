'use strict'
$(function() {
  function getdata(){
    $.ajax({
      url:'/api/articles',
      success: function(data) {

      data.forEach(function(){

      })

          $("#one").text(data[0].summary);
          $("#two").text(data[1].summary);
          $("#three").text(data[2].summary);

          $( "#imgOne" ).attr("src",data[0].image);
          $( "#imgT" ).attr({src: data[1].image});
          $( "#imgTH" ).attr({src: data[2].image});
      }

    });
  }

$("#one").click(function(){

})

  getdata();
});
