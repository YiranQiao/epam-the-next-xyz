'use strict'

$(function() {
  function getdata(){
    $.ajax({
      url:'/api/articles',
      success: function(data) {

          var length=data.length;

          $("#one").text(data[length-1].summary);
          $("#two").text(data[length-2].summary);
          $("#three").text(data[length-3].summary);

          $( "#imgOne" ).attr("src",data[length-1].image);
          $( "#imgT" ).attr({src: data[length-2].image});
          $( "#imgTH" ).attr({src: data[length-3].image});
      }

    });
  }

$("#one").click(function(){

})
//
  getdata();
});
