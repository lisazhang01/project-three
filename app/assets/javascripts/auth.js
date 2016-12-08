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
      window.location.href = "/homes"
    }).fail(function(resp){
      alert('Authentication failure: ' + resp.errors.join(' '));
    });
  });

  $('#logout-button').on('click', function(){
      $.auth.signOut().then(function(){
        window.location.href = "/"
      });
  });

  $('#login-form').on('submit', function(e){
      e.preventDefault();
    $.auth.emailSignIn({
      email: $('#login-form input[name="email"]').val(),
      password: $('#login-form input[name="password"]').val(),
    }).then(function(user){
      window.location.href = "/homes"
    }).fail(function(resp){
      alert('Authentication failure: ' + resp.errors.join(' '));
    });
  });

});

