console.log("Auth is plugged in");
$(document).ready(function(){

  checkAuth();

  $('#logout').click(function(e) {
    e.preventDefault();

    $.get('/logout', function(data) {
      $('.not-logged-in').show(); 
      $('.logged-in').hide();
    });
  });

  $('#new-user').submit(function(e) {
    e.preventDefault();
    var user = $(this).serialize();

    $.post('/users', user, function(data) {
      $('#new-user')[0].reset();
    });
  });

  $('#login-form').submit(function(e){
    e.preventDefault();
var user = $(this).serialize();

    $.post('/login', user, function(data){
      
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