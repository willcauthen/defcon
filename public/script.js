console.log("Wired up and ready to roll");

$(document).ready(function() {

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
