  var getFriends = function(){

    var friendsTemplate = '<div class="row" data-id="!id> <div class="col-md-12"> <div class="row"> <div class="col-md-2"> <img src="" alt=""> </div> <div class="col-md-7"> <h5><!--nick--> - <!--name--></h5> <p><!--bio--></p> </div> <div class="col-md-3"> <a href="#"> <button class="btn btn-primary btn-sm" type="button" class="find-me"">Visit Profile!</button> </a> <a href="#"> <button class="btn btn-primary btn-sm" type="button" id="no friend">Unfriend</button> </a> </div> </div> </div> </div>';

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

// FUNCTIONS TO BE MOVED TO CENTRAL CONTROLLER


  $(document).on("click", "a#my-friends", function(e) {
    getFriends();
  });