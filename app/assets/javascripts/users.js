  var getMyself = function () {

    var myTemplate = '<div data-id="!id"> <div id="user-image"> <img src="!profilepic"> </div> <div id="user-info"> <h2><!--name--></h2> <h4><!--nick--></h4> <p><!--bio--></p> </div> </div>';

    $.ajax({
      method: "GET",
      url:    "api/myself/",
    }).done(function(data){

      $("#myinfo-container").html("");
      var myData = data;
      var myTPL = myTemplate;
      myTPL = myTPL.replace('!id', myData.id);
      myTPL = myTPL.replace('!profilepic', myData.image);
      myTPL = myTPL.replace("<!--name-->", myData.name);
      myTPL = myTPL.replace("<!--nick-->", myData.nickname);
      myTPL = myTPL.replace("<!--bio-->", myData.bio);

      $("#myinfo-container").append(myTPL);
    });

  };

  var getProfile = function(identity) {

    var id = identity;

    $.ajax({
      method: "GET",
      url: "api/users/" + id,
    }).done(function(elem){
      console.log(elem);
    });

  };

  var getProfiles = function() {

    var usersTemplate = '<div class="row" data-id="!id> <div class="col-md-12"> <div class="row"> <div class="col-md-2"> <img src="" alt=""> </div> <div class="col-md-7"> <h5><!--nick--> - <!--name--></h5> <p><!--bio--></p> </div> <div class="col-md-3"> <a href="#"> <button class="btn btn-primary btn-sm" type="button" class="find-me"">Visit Profile!</button> </a> </div> </div> </div> </div>';

    $.ajax({
      method: "GET",
      url:    "api/users/",
    }).done(function(data){

      $("#users-container").html("");
      var usersData = data;
      usersData.forEach(function(elem, index, array){

        var usersTPL = usersTemplate;
        usersTPL = usersTPL.replace('!id', elem.id);
        usersTPL = usersTPL.replace("<!--name-->", elem.name);
        usersTPL = usersTPL.replace("<!--nick-->", elem.nickname);
        usersTPL = usersTPL.replace("<!--bio-->", elem.bio);

        $("#users-container").append(usersTPL);
      });
    });

  };

  var updateProfile = function(identity) {

    var id = identity;

    var profileData = {
      name:     $("#profile-name").val(),
      nickname: $("#profile-nickname").val(),
      bio:      $("#profile-bio").val(),
      image:    $("#profile-pic").val()
    };

    $.ajax({
      method:   "PUT",
      url:      "/api/users/" + id,
      data:     profileData,
      dataType: "json"
    }).done(function(data) {
      console.log(data);
    });

  };

// IMPORT TO CENTRAL FILE

  if (top.location.pathname === '/homes')
  {
  getMyself();
  }

  $(document).on("click", "a#searchall", function(e) {
    getProfiles(id);
  });

  $(document).on("click", "button#save-profile", function(e) {
    var id = $("#user-image").parent().attr("data-id");
    updateProfile(id);
    getMyself();
    $('#profile-modal').modal('hide');
  });

  $(document).on("click", "find-me", function(e) {
    var a = $(this).parents(".row").find("id");
    console.log(a);
    console.log("hello");
  });
