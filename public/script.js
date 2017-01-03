console.log("Wired up and ready to roll");

$(document).ready(function() {
  $('#new-user').submit(function(e) {
    e.preventDefault();
    var user = $(this).serialize();

    $.post('/users', user, function(data) {
      $('#new-user')[0].reset();
    });
  });

  $('.delete').click(function() {
    var userId = $(this).data('id');
    console.log("button was clicked", userId);


    $.ajax({
      url: '/users/' + userId,
      type: 'DELETE',
      success: function(result) {
        $(this).parent().remove();
      }
    });
  });
});
