  var myID = undefined;

  var setIdentifier = function() {
    var executed = false;
    if (executed == false) {
      myID = $("#user-image").parent().attr("data-id");
      executed == true;
    };
  };

  var friendBtnControl = function() {

    var userID = $("#user-image").parent().attr("data-id");
    if (userID == myID) {
      $("#friend-btn").hide();
    } else if (userID != myID) {
      $("#friend-btn").show();
    };

  };

  var getMyself = function () {

    var myTemplate = '<div id="user-id-data" data-id="!id"> <div id="user-image"> <img src="!profilepic"> </div> <div id="user-info"> <h2><!--name--></h2> <h4><!--nick--></h4> <p><!--bio--></p> </div> </div>';

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

  var getMyProfile = function () {

    var myTemplate = '<div> <div id="user-image"> <img src="!profilepic"> </div> <div id="user-info"> <h2><!--name--></h2> <h4><!--nick--></h4> <p><!--bio--></p> </div> </div>';

    $.ajax({
      method: "GET",
      url:    "api/myself/",
    }).done(function(data){

      $("#myprofile-container").html("");
      var myData = data;
      var myTPL = myTemplate;
      myTPL = myTPL.replace('!id', myData.id);
      myTPL = myTPL.replace('!profilepic', myData.image);
      myTPL = myTPL.replace("<!--name-->", myData.name);
      myTPL = myTPL.replace("<!--nick-->", myData.nickname);
      myTPL = myTPL.replace("<!--bio-->", myData.bio);

      $("#myprofile-container").append(myTPL);
    });

  };

  var getProfile = function(identity) {

    var theirTemplate = '<div data-id="!id"> <div id="user-image"> <img src="!profilepic"> </div> <div id="user-info"> <h2><!--name--></h2> <h4><!--nick--></h4> <p><!--bio--></p> </div> </div>';

    var id = identity;

    $.ajax({
      method: "GET",
      url:    "api/users/" + id,
    }).done(function(data){

      $("#myinfo-container").html("");
      var theirData = data;
      var theirTPL = theirTemplate;
      theirTPL = theirTPL.replace('!id', theirData.id);
      theirTPL = theirTPL.replace('!profilepic', theirData.image);
      theirTPL = theirTPL.replace("<!--name-->", theirData.name);
      theirTPL = theirTPL.replace("<!--nick-->", theirData.nickname);
      theirTPL = theirTPL.replace("<!--bio-->", theirData.bio);

      $("#myinfo-container").append(theirTPL);
    });

  };

  var getProfiles = function() {

    var usersTemplate = '<div class="row find-id" data-id="!id"> <div id="finder"> <div class="col-sm-12"> <div class="row"> <div class="col-sm-2"> <img id="friend-pic" src="<!--img-->" alt=""> </div> <div class="col-sm-5"> <h5><!--nick--> - <!--name--></h5> <p><!--bio--></p> </div> <div class="col-sm-3"> <a href="#"> <button class="btn btn-primary btn-sm" type="button" id="find-me">Visit Profile!</button> </a> </div> </div> </div> </div> </div>';

    $.ajax({
      method: "GET",
      url:    "api/users/",
    }).done(function(data){

      $("#users-container").html("");
      var usersData = data;
      usersData.forEach(function(elem, index, array){

        var usersTPL = usersTemplate;
        usersTPL = usersTPL.replace('!id', elem.id);
        usersTPL = usersTPL.replace("<!--img-->", elem.image);
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

  if (top.location.pathname === '/homes') {
    getMyself();
    setIdentifier();
    friendBtnControl();
  };

  $(document).on("click", "a#searchall", function() {
    getProfiles();
  });

  $(document).on("click", "button#save-profile", function() {
    var id = $("#user-image").parent().attr("data-id");
    updateProfile(id);
    getMyself();
    $('#profile-modal').modal('hide');
  });

  $(document).on("click", "button#find-me", function() {
    var id = $(this).parents("div#finder").parent().data("id");
    getProfile(id);
    friendBtnControl();
    $('#search-modal').modal('hide');
    $('#friends-modal').modal('hide');
  });

  $(document).on("click", "a#identify-self", function() {
    getMyself();
  });

  $(document).on("click", "a#my-profile1", function() {
    getMyProfile();
  });