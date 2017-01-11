console.log("Auth is plugged in");
$(document).ready(function(){

  
  checkAuth();

  $('#new-user').submit(function(e) {
    e.preventDefault();
    var user = $(this).serialize();

    $.post('/users', user, function(data) {
      // $('#new-user')[0].reset();
    });
  });
});
function checkAuth(){
  $.get('/current-user', function(data) {
    console.log(data.user);
    if(data.user) {
      $('.not-logged-in').hide(); 
      $('.logged-in').show();
    } else {
      $('.not-logged-in').show(); 
      $('.logged-in').hide();
    }
  });
}