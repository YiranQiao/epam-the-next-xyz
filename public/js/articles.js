'use strict'
$(function() {
  function getdata(){

  var pathname = window.location.pathname;
  //alert(pathname);
  var id=pathname.substring(pathname.length-1);

    $.ajax({
      url:'/api/articles'+'/'+id,
      success: function(data) {
          $("h1").text(data.title)
          $("#content").text(data.summary);
          $( "#img" ).attr("src",data.image);
      }

    });
  }
 // getdata();
});
