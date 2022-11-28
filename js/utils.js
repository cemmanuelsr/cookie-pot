$(document).ready(function() {
  $("#cookie-list").toggle();
  $("#local-storage-list").toggle();
  $("#network-list").toogle();
  $("#cookies-title").click(function() {
    $("#cookie-list").toggle();
  });
  $("#local-storage-title").click(function() {
    $("#local-storage-list").toggle();
  });
  $("#network-title").click(function() {
    $("#network-list").toggle();
  });
});
