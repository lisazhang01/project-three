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
            redirect_to: '/api/photos'
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

  //Show all photos on /homes
  // var showAllPhotos = function(photos) {
  //   var photoElem = "";

  //   for (var i = 0; i < 20; i++) {

  //     photoElem += '<div class="col-sm-4">' +

  //   }
  // }

  //Testing masonry
  var $grid = $('.grid').imagesLoaded(function(){
    //Init isotope after all images are loaded
   $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });
  });
}); //End doc ready

