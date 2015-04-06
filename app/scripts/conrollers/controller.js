var imageImgID;
define(['jquery', 'jquery-ui', 'jquery-ui-touch'], function ($) {
  $(".scrollToTOP").draggable({
    appendTo: "body",
    activeClass: "draggable",
    helper: "clone",
    start: function () {
      imageImgID = this.id;
      $("#FanCheck").css('background-color', '#0073ea');
    },
    stop: function () {
      if( $('#leftmenu').is(':empty') ) {
        $("#FanCheck").css('background-color', '#FFF');
      }else{
        _3DView.modelInfomation.check();
      }

    }
  });

  $(".drop-thing").droppable({
    activeClass: "droppable",
    hoverClass: "ui-state-hover",
    helper: "clone",
    drop: function (event, ui) {

      //alert(_3DView.modelInfomation.selectedPartID);
      $(this).find(".materialImg").remove();
      for (var i = 0; i < _3DView.modelInfomation.materialsData.materials.length; i++) {
        if (_3DView.modelInfomation.materialsData.materials[i].id == imageImgID) {
          var imgData = '<img  src="' + _3DView.modelInfomation.materialsData.materials[i].texture_img + '" ' +
            'id="titainumImage" class="scrollToTOP img img-circle img-responsive img-thumbnail dropedIMG materialImg"/>';
          _3DView.modelInfomation.selectedMaterial[_3DView.modelInfomation.selectedPartID] = {
            html: imgData,
            id: imageImgID
          };
          _3DView.modelInfomation.check();
          $("#FanCheck").html(imgData);
        }
      }
      //
      //obj.addClass("dropedIMG");
      //obj.appendTo(this);

    }
  });
  $(document).on('click', ".dropedIMG", function () {
    $("#FanCheck").css('background-color', '#FFF');
    $(this).remove();
  });
});
