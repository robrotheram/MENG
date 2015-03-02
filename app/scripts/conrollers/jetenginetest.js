define(['jquery', 'jquery-ui', 'jquery-ui-touch'], function ($) {
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
      $(this).find(".materialImg").remove();
      var obj = ui.draggable.clone();
      obj.addClass("dropedIMG");
      obj.appendTo(this);

    }
  });
  $(document).on('click', ".dropedIMG", function () {
    $(this).remove();
  });
});
