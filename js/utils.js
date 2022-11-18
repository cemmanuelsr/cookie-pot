$(document).ready(function() {
  $("#first-party-cookie-list").toggle();
  $("#third-party-cookie-list").toggle();
  $("#session-cookie-list").toggle();
  $("#navigation-cookie-list").toggle();
  $("#local-storage-list").toggle();
  $("#first-party-cookies-title").click(function() {
    $("#first-party-cookie-list").toggle();
  });
  $("#third-party-cookies-title").click(function() {
    $("#third-party-cookie-list").toggle();
  });
  $("#session-cookies-title").click(function() {
    $("#session-cookie-list").toggle();
  });
  $("#navigation-cookies-title").click(function() {
    $("#navigation-cookie-list").toggle();
  });
  $("#local-storage-title").click(function() {
    $("#local-storage-list").toggle();
  });
});
