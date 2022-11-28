$(document).ready(function() {
  $("#cookie-list").toggle();
  $("#local-storage-list").toggle();
  $("#cookies-title").click(function() {
    $("#cookie-list").toggle();
  });
  $("#local-storage-title").click(function() {
    $("#local-storage-list").toggle();
  });
});
