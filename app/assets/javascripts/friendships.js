
  var getFriends = function(){

    var friendsTemplate = '<div class="row find-id" data-id="!id"> <div id="finder"> <div class="col-md-12"> <div class="row"> <div class="col-md-7"> <h5><!--nick--> - <!--name--> Delete This</h5> <p><!--bio--> Delete This</p> </div> <div class="col-md-3"> <a href="#"> <button class="btn btn-primary btn-sm" type="button" id="find-me">Visit Profile!</button> </a> </div> </div> </div> </div> </div>';

    $.ajax({
      method: "GET",
      url:    "api/friendships/",
    }).done(function(data){

      $("#friends-container").html("");
      var friendsData = data;
      friendsData.forEach(function(elem, index, array){

        var friendsTPL = friendsTemplate;
        friendsTPL = friendsTPL.replace('!id', elem.id);
        friendsTPL = friendsTPL.replace("<!--name-->", elem.name);
        friendsTPL = friendsTPL.replace("<!--nick-->", elem.nickname);
        friendsTPL = friendsTPL.replace("<!--bio-->", elem.bio);

        $("#friends-container").append(friendsTPL);
      });
    });
  };

  var addFriend = function() {

    var id = $("#user-image").parent().attr("data-id");
    var fParam = {
      friend_id: id
    };

    $.ajax({
      method: "POST",
      url: "/api/friendships",
      data: {friendship: fParam},
      dataType: "json"
    }).done(function(data){
      console.log(data);
    });

  };

// FUNCTIONS TO BE MOVED TO CENTRAL CONTROLLER

  $(document).on("click", "a#my-friends", function() {
    var id = $(this).parents("div.col-md-12").parent().data("id");
    console.log(id);
    getFriends();
  });

  $(document).on("click", "a#my-friends", function() {
    getFriends();
  });

  $(document).on("click", "button#friend-btn", function() {
    addFriend();
  });