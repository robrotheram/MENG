define(['jquery', 'jquery-ui'], function ($) {
  require(["jquery-ui-touch"]);
  $(".scrollToTOP").draggable({
    appendTo: "body",
    activeClass: "draggable",
    helper: "clone"
  });

  $(".drop-thing").droppable({
    activeClass: "droppable",
    hoverClass: "ui-state-hover",
    helper: "clone",
    drop: function (event, ui) {
      var name = $(".ui-draggable").attr("class").split(' ')[0];
      alert(name);
      $(this).find(".materialImg").remove();
      for (var i = 0; i < jetEngineView.modelInfomation.materialsData.materials.length; i++) {
        if (jetEngineView.modelInfomation.materialsData.materials[i].name == name) {
          var imgData =  '<img  src="'+jetEngineView.modelInfomation.materialsData.materials[i].texture_img+'" ' +
            'id="titainumImage" class="scrollToTOP img img-circle img-responsive img-thumbnail materialImg"/>';
          jetEngineView.modelInfomation.materialsData.materials[i].imgData = imgData
            $("#FanCheck").html(imgData);
        }
      }
      //
      //obj.addClass("dropedIMG");
      //obj.appendTo(this);

    }
  });
  $(document).on('click', ".dropedIMG", function () {
    $(this).remove();
  });
});
