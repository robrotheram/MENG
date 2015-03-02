define(["jquery",
    "angular",
    "jquery-ui",
    'models/jetEngine',
    'bootstrap',
    'conrollers/app',
    'conrollers/jetenginetest'],

  function ($, angular) {
    require(["jquery-ui-touch"]);

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
      jetEngineView.modelInfomation.setMaterialInfo("Steel");
    });
    $("#nickelImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo("Nickel superalloy");
    });
    $("#titainumImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo("Titanium alloy");
    });
    $("#woodImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo("Wood");
    });
    $("#carbomImage").click(function (event) {
      jetEngineView.modelInfomation.setMaterialInfo("Carbon fibre");
    });


    $("#resetAnswer").click(function (event) {

      $("#FanCheck").css('background-color', '#FFF');
      $("#FanCheck").empty();
      $("#CompressorCheck").css('background-color', '#FFF');
      $("#CompressorCheck").empty();
      $("#CombustionCheck").css('background-color', '#FFF');
      $("#CombustionCheck").empty();
      $("#ShaftCheck").css('background-color', '#FFF');
      $("#ShaftCheck").empty();
      $("#TurbineCheck").css('background-color', '#FFF');
      $("#TurbineCheck").empty();

    });


    $("#checkAnswer").click(function (event) {
      var count = 0;
      if ($('#FanCheck .titainum').length > 0) {
        count++;
        $("#FanCheck").css('background-color', '#5cb85c');
      } else {
        $("#FanCheck").css('background-color', '#d9534f');
      }

      if ($('#CompressorCheck .titainum').length > 0) {
        count++;
        $("#CompressorCheck").css('background-color', '#5cb85c');
      } else {
        $("#CompressorCheck").css('background-color', '#d9534f');
      }

      if ($('#CombustionCheck .nickle').length > 0) {
        count++;
        $("#CombustionCheck").css('background-color', '#5cb85c');
      } else {
        $("#CombustionCheck").css('background-color', '#d9534f');
      }


      if ($('#ShaftCheck .steel').length > 0) {
        count++;
        $("#ShaftCheck").css('background-color', '#5cb85c');
      } else {
        $("#ShaftCheck").css('background-color', '#d9534f');
      }


      if ($('#TurbineCheck .nickle').length > 0) {
        count++;
        $("#TurbineCheck").css('background-color', '#5cb85c');
      } else {
        $("#TurbineCheck").css('background-color', '#d9534f');
      }

      if (count == 5) {
        alert("You got it correct");
      } else {
        alert("You got it Wrong look again");
      }

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
      step: 1,
      max: 10,
      slide: function (event, ui) {
        var value = (ui.value / 100);
        console.log(value);
        jetEngineView.speed = (value);
      }
    });

  }); // End of require
