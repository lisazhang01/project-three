$(document).ready(function() {
  //Upload photo function
  var photo_upload = {
    // EDIT UPDATE ARTIST PROFILE
    bindUploadButton: function () {
      var that = this;
      $('#photo-upload-form').on("submit", function (e) {
        e.preventDefault();

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
          method: 'post',
          data: formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          success: function (resp) {
            displayPhotos();
            console.log(resp)
          }
        })
      });
    },
    init: function () {
      this.bindUploadButton();
    }
  }
  photo_upload.init();

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
      var template = '<div class="grid-item col-xs-6 col-sm-4 col-md-3"><img src=<!--image-->></div>';
      var $grid    = $('.grid');
      $grid.html("");

      photos.forEach(function(photo, index, array){
        items += template.replace('<!--image-->', "http:" + photo.avatar);
      });

//Appends and loads images, then calling isotope to arrange images into layout
      var $items = $(items);
      $isoGrid.append($items);
      $grid.imagesLoaded(function(){
        $isoGrid.isotope('appended', $items).isotope('layout');
      });
    });
  };
  displayPhotos();


  // //Append new photo to grid-items
  //   $('#upload-btn').on( 'click', function() {
  //   // create new item elements
  //   var $items = getItemElement().add( getItemElement() ).add( getItemElement() );
  //   // append elements to container
  //   $grid.append( $items )
  //     // add and lay out newly appended elements
  //     .isotope( 'appended', $items );
  // });

}); //End doc ready

