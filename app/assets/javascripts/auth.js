$(document).ready(function(){

  $.auth.configure({
    apiUrl: location.origin
  });

  $('#signup-form').on('submit', function(e){
    e.preventDefault();
    $.auth.emailSignUp({
      email: $('#signup-form input[name="email"]').val(),
      password: $('#signup-form input[name="password"]').val(),
      password_confirmation: $('#signup-form input[name="password_confirmation"]').val()
    }).then(function(user){
      alert('Welcome ' + user.name + '!');
    }).fail(function(resp){
      alert('Authentication failure: ' + resp.errors.join(' '));
    });
  });

  $('#logout-button').on('click', function(){
      $.auth.signOut();
  });

  $('#signup-form').on('submit', function(e){
      e.preventDefault();
    $.auth.emailSignIn({
      email: $('#signup-form input[name="email"]').val(),
      password: $('#signup-form input[name="password"]').val(),
      password_confirmation: $('#signup-form input[name="password_confirmation"]').val()
    }).then(function(user){
      alert('Welcome ' + user.name + '!');
    }).fail(function(resp){
      alert('Authentication failure: ' + resp.errors.join(' '));
    });
  });

});

