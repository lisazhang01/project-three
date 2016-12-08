$(document).ready(function() {
  var token = $('meta[name="csrf-token"]').attr('content');
  $.ajaxSetup({
    beforehand: function (xhr) {
      xhr.setRequestHeader( 'X-CSRF-TOken', token);
    }
  });

  //loader
  Pace.on("done", function(){
    $("#myloader").fadeOut(500);
  });

  // Initialising Masonry grid
  var isoOpt = {
    layoutMode  : 'masonry',
    itemSelector: '.grid-item',
    percentPosition: true,
  };
  var $isoGrid;

  //Calling photos and dynamically generate grid items to append to grid
  var displayPhotos = function () {
    $.ajax({
      method: 'GET',
      url   : '/api/photos',
    }).done(function(photos){
      var items    = "";
      var template = '<div class="grid-item col-xs-6 col-sm-4 col-md-4" data-id="!id"><div class="hovereffect"><img src="!image"><div class="overlay"></div></div></div>';
      var $grid    = $('.grid');

      $grid.html("");

      if ($isoGrid !== undefined) {
        $isoGrid.isotope('destroy');
      }
      $isoGrid = $grid.isotope(isoOpt);

      photos.forEach(function(photo, index, array){
        items += template.replace('!image', "http:" + photo.avatar).replace('!id', photo.id);
      });

      //Appends and loads images, then calling isotope to arrange images into layout
      var $items = $(items);
      $isoGrid.append($items);
      $grid.imagesLoaded(function(){
        $isoGrid.isotope('appended', $items).isotope('layout');
      });
    });
  };

  //Display only photos uploaded by current user
  var filterByUser = function() {
    $.ajax({
      method: 'GET',
      url   : '/api/myphotos',
    }).done(function(photos){
      var items    = "";
      var template = '<div class="grid-item col-xs-6 col-sm-4 col-md-4" data-id="!id"><div class="hovereffect"><img src="!image"><div class="overlay"></div></div></div>';
      var $grid    = $('.grid');

      $grid.html("");
      if ($isoGrid !== undefined) {
        $isoGrid.isotope('destroy');
      }
      $isoGrid = $grid.isotope(isoOpt);

      photos.forEach(function(photo, index, array){
        items += template.replace('!image', "http:" + photo.avatar).replace('!id', photo.id);
      });

      //Appends and loads images, then calling isotope to arrange images into layout
      var $items = $(items);
      $isoGrid.append($items);
      $grid.imagesLoaded(function(){
        $isoGrid.isotope('appended', $items).isotope('layout');
      });
    });
  };

  //Show upload form on click
  var openUploadForm = function(e) {
    $('#upload').on('click', function(e) {
      e.preventDefault();
      $('#upload-modal').modal('show');
      $('.nav-collapse').collapse('hide');
    });
  };

  //Upload photo on click and refreshes page
  var photoUpload = function() {
    $('#upload-btn').on('click', function (e) {
      e.preventDefault();
      $('#upload-modal').modal('hide');

      var data = {
        avatar:  $('input[name="user-photo"]')[0].files[0] ? $('input[name="user-photo"]')[0].files[0] : "",
        description:  $('input[name="photo-description"]').val(),
        user_id: $('#user-id-data').data('id'),
      };

      var formData = new FormData();
      for (var key in data) {
        formData.append(key, data[key]);
      }

      $.ajax({
        url: '/api/photos',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (resp) {
          window.location.href = '/homes';
          console.log(resp);
        }
      });
    });
  };

  //Show one photo & related description, comments in modal
  var clickOnePhoto = function(e){
    $('.grid').on('click', '.grid-item .hovereffect', function (e) {
      e.preventDefault();
      var id = $(this).parents('.grid-item').data('id');

      $.ajax({
        url: '/api/photos/' + id,
        method: 'GET'
      }).done(function(photo){

        var commentArray = photo.comments.reverse();
        console.log(commentArray);
        var commentTextArray = [];

        var extractCommentText = function(commentTextArray) {
          if (commentArray == []) {
            console.log("no comments");
          } else {
            for (var i=0; i<commentArray.length; i++) {
            commentTextArray.push(commentArray[i].text);
          }
            return commentTextArray;
          }
        };
        extractCommentText(commentTextArray);

        var showModal = $('#show-modal');

        var template = '<div class="row"><img class="img-responsive" src="!image"></div><div class="row"><div class="col-sm-12 col-xs-12" id="like"><a href="#"><span class="glyphicon glyphicon-heart-empty pull-right"></span></a></div></div><div class="row" id="description"><h3 class="col-sm-12 col-xs-12">!description</h3></div>';

        var commentTemplate = '<div class="form-group"><label for="comments-box">Comments</label><div id="comments"><ul><li>!comment1</li><li>!comment2</li><li>!comment3</li></ul></div><textarea class="form-control" id="photo-comments" rows="1"></textarea> <button type="button" data-id="!id" class="btn btn-default btn-xs pull-right submit">Submit</button></div>';


        var footerTemplate = '<button type="button" class="btn btn-default btn-sm delete-photo" data-id="!id"><span class="glyphicon glyphicon-trash"></span></button>';

        template = template.replace('!image', "http:" + photo.avatar).replace('!description', photo.description).replace('!id', photo.id);

        commentTemplate = commentTemplate.replace('!comment1', commentTextArray[0]).replace('!comment2', commentTextArray[1]).replace('!comment3', commentTextArray[2]).replace('!id', photo.id);

        footerTemplate = footerTemplate.replace('!id', photo.id);

        //append new elem
        showModal.find('.modal-title').html('');
        showModal.find('.modal-body').html('');
        showModal.find('.modal-footer').html('');
        // showModal.find('.modal-title').append(header);
        showModal.find('.modal-body').append(template + commentTemplate);
        showModal.find('.modal-footer').append(footerTemplate);
        //Show modal
        showModal.modal('show');
      });
    });
  }; //end clickOnePhoto function

  //Delete a photo on click delete button
  var deletePhoto = function () {
    $(document).on("click", "button.delete-photo", function(e) {
      e.preventDefault();

      var id = $(this).data('id');

      $.ajax ({
        url     : '/api/photos/' + id,
        method  : 'DELETE',
      }).done(function(resp){
        window.location.href = '/homes'
        console.log("Photo is deleted");
        $('#show-modal').modal('hide');
      }).fail(function(resp){
        console.log("Delete unsuccessful");
      });
    });
  };

  //Add comment to photo from modal
  var addCommentToPhoto = function () {
    $(document).on('click', "button.submit", function(e) {
      e.preventDefault();
      //Jquery gets comment text and photo id
      var id          = $(this).data('id');
      var text        = $('#photo-comments').val();
      var commentData = {
        text: $('#photo-comments').val()
      }
      //Saves to database
      $.ajax ({
        url: '/api/photos/' + id + '/comments',
        method: 'POST',
        data: commentData,
        dataType: 'json',
      }).done(function(resp) {
        console.log("msg saved");
      });
      $('#photo-comments').val('');
      //Creates new comment and append to modal
      var newCommentTemplate = '<li>!text</li>';
      newCommentTemplate = newCommentTemplate.replace('!text', text);
      $('#comments ul').prepend(newCommentTemplate);
    });
  };

  //Append categories to drop down list
  var generateCategoryDropdownList = function() {
    $(document).on('click', ".category-list", function(e) {
      e.preventDefault();

      $.ajax({
        method: 'GET',
        url:    '/api/categories',
      }).done(function(categories){

        var categoriesTemplate = '<li><a href="#">!c1</a></li><li><a href="#">!c2</a></li><li><a href="#">!c3</a></li><li><a href="#">!c4</a></li><li><a href="#">!c5</a></li><li><a href="#">!c6</a></li><li><a href="#">!c7</a></li><li><a href="#">!c8</a></li><li><a href="#">!c9</a></li><li><a href="#">!c10</a></li>';

        categoriesTemplate = categoriesTemplate.replace('!c1', categories[0].name).replace('!c2', categories[1].name).replace('!c3', categories[2].name).replace('!c4', categories[3].name).replace('!c5', categories[4].name).replace('!c6', categories[5].name).replace('!c7', categories[6].name).replace('!c8', categories[7].name).replace('!c9', categories[8].name).replace('!c10', categories[9].name);

        $('.dropdown-menu.categories').html('');

        $('.dropdown-menu.categories').append(categoriesTemplate);
      });
    });
  };

  //Click on show all photos to display all
  var showAllPhotosButton = function() {
    $(document).on('click', 'button#see-all-photos', function(e) {
      displayPhotos();
    });
  };

  var clickMyUploads = function () {
    $(document).on('click', 'button#see-my-uploads', function(e) {
      filterByUser();
    });
  };

  var init = function() {
    //Photo functions
    displayPhotos();
    clickOnePhoto();
    photoUpload();
    openUploadForm();
    deletePhoto();
    showAllPhotosButton();
    //comment controller functions
    addCommentToPhoto();
    //Categories controller functions
    generateCategoryDropdownList();
    //user controller
    clickMyUploads();
    setIdentifier();
  };

  init();
}); //End doc ready
