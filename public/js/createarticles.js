'use strict';
$("#imgUrl").keyup(function(){
  var path=$("#imgUrl").val();
  $("#img").attr("src",path);
});