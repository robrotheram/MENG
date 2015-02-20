define(['jquery'], function ($) {

  $("#Engine").click(function () {
    console.log("hekk");

    $("#chooseSection").animate({
      'width': 0,
      'opacity': 0
    }, 750, function () {
      $("#chooseSection").hide();
    });

    $("#infoSection").animate({
      'width': 0,
      'opacity': 0
    }, 750, function () {
      $("#infoSection").hide();
      $("#webGLROW").show();
      $("#webGLROW").animate({
        'width': "100%",
        'opacity': 1
      }, 750, function () {
      });
    });
  });


  $("#Material").click(function () {
    console.log("hekk");


    $("#chooseSection").animate({
      'width': 0,
      'opacity': 0
    }, 750, function () {
      $("#chooseSection").hide();
    });

    $("#webGLROW").animate({
      'width': 0,
      'opacity': 0
    }, 750, function () {
      $("#webGLROW").hide();
      $("#infoSection").show();
      $("#infoSection").animate({
        'width': "100%",
        'opacity': 1
      }, 750, function () {
      });
    });
  });


  $("#Choose").click(function () {
    console.log("hekk");

    $("#infoSection").animate({
      'width': 0,
      'opacity': 0
    }, 750, function () {
      $("#infoSection").hide();
    });

    $("#webGLROW").animate({
      'width': 0,
      'opacity': 0
    }, 750, function () {
      $("#webGLROW").hide();
      $("#chooseSection").show();
      $("#chooseSection").animate({
        'width': "100%",
        'opacity': 1
      }, 750, function () {
      });
    });
  });
});
