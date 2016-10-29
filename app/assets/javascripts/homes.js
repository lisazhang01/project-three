$(document).ready(function() {
  var token = $('meta[name="csrf-token"]').attr('content');
  $.ajaxSetup({
    beforehand: function (xhr) {
      xhr.setRequestHeader( 'X-CSRF-TOken', token);
    }
  });

  //Initialising Masonry grid
  var $isoGrid = $('.grid').isotope({
    layoutMode: 'masonry',
    itemSelector: '.grid-item',
    percentPosition: true,
  });

  //Calling photos and dynamically generate grid items to append to grid
  var displayPhotos = function () {
    $.ajax({
      method: 'GET',
      url:    '/api/photos',
    }).done(function(photos){
      var items    = "";
      var template = '<div class="grid-item col-xs-6 col-sm-4 col-md-3" data-id="!id"><a href=""><img src="!image"></a></div>';
      var $grid    = $('.grid');
      $grid.html("");

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

  // Upload photo function
  var photo_upload = {
    bindUploadButton: function () {
      var that = this;
      $('#upload-btn').on('click', function (e) {
        e.preventDefault();
        $('#upload-modal').modal('hide');

        var data = {
          avatar:  $('input[name="user-photo"]')[0].files[0] ? $('input[name="user-photo"]')[0].files[0] : "",
          description:  $('input[name="photo-description"]').val(),
        };

        var formData = new FormData();
        for (var key in data) {
          formData.append(key, data[key]);
        }

        console.log(formData);

        $.ajax({
          url: '/api/photos',
          method: 'POST',
          data: formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          success: function (resp) {
            window.location.href = '/homes';
            console.log(resp);
          }
        });
      });
    },
    init: function () {
      this.bindUploadButton();
    }
  };

  //Get one photo
var getPhoto = function (id, cb) {
  $.ajax({
    url: '/api/photos/' + id,
    method: 'GET',
  }).done(function(photo){
    cb(photo);
  });
};

//Set photo info into template
var setPhotoShowModal = function(photo) {
  var showModal = $('#show-modal');

  //Template for header (includes user display pic and user name -- links to user page)
  var header = '<div><a href="">User DP<img class="img-rounded" width="100px" src=""><div>User Name</div></a></div>';
  //Replace with links to user api
  // header = header.replace('!dp', "http:" + user.image).replace('!username', user.name);

  //Create html template
  var template = '<div><img class="img-responsive" src="!image"></div><div><a href="#"><span class="glyphicon glyphicon-heart pull-right"></span></a></div><div id="description">!description<a href="#"><span class="glyphicon glyphicon-pencil pull-right"></span></a></div><div id="comments">Comments</div>';
  //replace template fields with photo attr
  template = template.replace('!image', "http:" + photo.avatar).replace('!description', photo.description).replace('!id', photo.id);

  var footer = '<button type="button" class="btn btn-default btn-sm delete-photo" data-id="!id"><span class="glyphicon glyphicon-trash"></span>Delete Post</button>';

  footer = footer.replace('!id', photo.id);

  //append new elem
  showModal.find('.modal-title').html('');
  showModal.find('.modal-body').html('');
  showModal.find('.modal-footer').html('');
  showModal.find('.modal-title').append(header);
  showModal.find('.modal-body').append(template);
  showModal.find('.modal-footer').append(footer);
  //Show modal
  showModal.modal('show');
};

  //Show one photo in modal
  var clickOnePhoto = function(e){
    //On click of photo
    $('.grid').on('click', '.grid-item a img', function (e) {
      e.preventDefault();

      //Check if photo is user photo or friend photo
      // if ()

      var id = $(this).parents('.grid-item').data('id');
      getPhoto(id, setPhotoShowModal);
    });
  };

  //Show upload form on click
  var openUploadForm = function(e) {
    $('#upload').on('click', function(e) {
      e.preventDefault();
      $('#upload-modal').modal('show');
    });
  };

  //Delete a photo on click delete button
  var deletePhoto = function () {
    $(document).on("click", "button.delete-photo", function(e) {
      e.preventDefault();

      var id = $(this).data('id');
      console.log(id);

      $.ajax ({
        url     : '/api/photos/' + id,
        method  : 'DELETE',
      }).done(function(resp){
        window.location.href = '/'
        console.log("Photo is deleted");
        $('#show-modal').modal('hide');
      }).fail(function(resp){
        console.log("Delete unsuccessful");
      });
    });
  };

  var init = function() {
    //Photo controller functions
    displayPhotos();
    photo_upload.init();
    clickOnePhoto();
    openUploadForm();
    deletePhoto();
  };

  init();
}); //End doc ready
