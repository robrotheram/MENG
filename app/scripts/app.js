define(["jquery",
    "angular",
    "jquery-ui",
    'models/jetEngine',
    'bootstrap',
    'conrollers/app',
    'conrollers/jetenginetest'],

  function ($, angular) {

    var module = angular.module("myApp", []);
    angular.bootstrap(document, ["myApp"]);

    jetEngineView.init("#jet");
    jetEngineView.animate();

    $("#playbtn").click(function (event) {
      jetEngineView.play = !jetEngineView.play;
      if (jetEngineView.play) {
        $("#playbtn").html('Puase');
      } else {
        $("#playbtn").html('Play');
      }
    });


    $("#steelImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo(1);
    });
    $("#nickelImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo(0);
    });
    $("#titainumImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo(2);
    });
    $("#woodImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo(3);
    });
    $("#carbomImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo(3);
    });
    $("#ironImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo(3);
    });


    $("#infoSection").hide();
    $("#infoSection").width(0);
    $("#infoSection").css({opacity: 0.5});

    $("#chooseSection").hide();
    $("#chooseSection").width(0);
    $("#chooseSection").css({opacity: 0.5});

    $("#slider").slider({
      range: "min",
      value: 37,
      min: 1,
      max: 100,
      slide: function (event, ui) {
        jetEngineView.speed = (ui.value / 100);
      }
    });

  }); // End of require
