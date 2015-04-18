define(["../app",
    "jquery",
    "jquery-ui",
    "jquery-ui-touch",
    '3DView/3DView',
    'bootstrap',
    'three'],

  function (app, $) {
    app.controller('jetengine', function ($scope) {
      $scope.pageName = "Jet Engine";
      var height = $("#mainPanelBody").height();
      height += 55;
      $("#materialBody").height(height);


      function init() {
        _3DView.new();
        _3DView.init("#jet");
        _3DView.animate = function () {
          this.renderer.tRenderer.render(renderer.scene, renderer.camera);
          this.renderer.controls.update();
          if (_3DView.play) {
            console.log(_3DView.speed);
            if (_3DView.models.models['nose']) {
              _3DView.models.models['nose'].rotation.z -= _3DView.speed;
            }
            if (_3DView.models.models['fan']) {
              _3DView.models.models['fan'].rotation.z -= _3DView.speed;
            }
            if (_3DView.models.models['compressor2']) {
              _3DView.models.models['compressor2'].rotation.z -= _3DView.speed;
            }
            if (_3DView.models.models['combustion']) {
              _3DView.models.models['combustion'].rotation.z -= _3DView.speed;
            }
            if (_3DView.models.models['turbine']) {
              _3DView.models.models['turbine'].rotation.z -= _3DView.speed;
            }
          }


          requestAnimationFrame(function () {
            _3DView.animate();
          });
        };
        selectMaterial = new THREE.MeshPhongMaterial({
          // light
          specular: '#a9fcff',
          // intermediate
          color: '#00abb1',
          // dark
          emissive: '#006063',
          shininess: 100
        });
        _3DView.selectPart = function (model) {
          // alert(model.name);
          if ((model.name == "compressor") || (model.name == "compressor2")) {
            _3DView.models.models["compressor"].material = selectMaterial;
            _3DView.models.models["compressor2"].material = selectMaterial;
            _3DView.modelInfomation.setPartsInfo("compressor");
          } else if ((model.name == "shaft") || (model.name == "nose")) {
            _3DView.models.models["shaft"].material = selectMaterial;
            _3DView.models.models["nose"].material = selectMaterial;
            _3DView.modelInfomation.setPartsInfo("shaft");
          } else {
            model.material = selectMaterial;
            _3DView.modelInfomation.setPartsInfo(model.name);
          }
        };

        _3DView.renderer.controls.minDistance = 50;
        _3DView.renderer.controls.maxDistance = 300;

        _3DView.models.loadIMG('images/steel.jpg');
        loadMaterials();
        _3DView.models.datafile = "scripts/data/JetEngine/";

        loadModel(_3DView.models.datafile + "fan.json");
        loadModel(_3DView.models.datafile + "shaft.json");
        loadModel(_3DView.models.datafile + "nose.json");
        loadModel(_3DView.models.datafile + "combustion.json");
        loadModel(_3DView.models.datafile + "compressor2.json");
        loadModel(_3DView.models.datafile + "compressor.json");
        loadModel(_3DView.models.datafile + "turbine.json");

        setUPLights();

        _3DView.modelInfomation.partJsonPath = "scripts/data/Info/jetengine_parts.json";
        _3DView.modelInfomation.materialJsonPath = "scripts/data/Info/materials.json";
        _3DView.modelInfomation.getMaterials("steel");
        _3DView.modelInfomation.getParts("shaft");


        _3DView.renderer.camera.position.x = 150;
        _3DView.renderer.camera.position.y = 40;
        _3DView.renderer.camera.position.z = 150;


      }

      function loadModel(filename) {
        _3DView.models.loader.load(filename, _3DView.models.meshloader(filename));
      }

      function loadMaterials() {
        var texture1 = THREE.ImageUtils.loadTexture('images/steel.jpg');
        var texture2 = THREE.ImageUtils.loadTexture('images/nickle.jpg');
        var texture3 = THREE.ImageUtils.loadTexture('images/titanium.jpg');

        texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
        texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
        texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;

        _3DView.models.materialarray["fan"] = new THREE.MeshPhongMaterial({
          map: texture3,
          shininess: 50,
          shading: THREE.FlatShading
        });
        _3DView.models.materialarray["shaft"] = new THREE.MeshPhongMaterial({
          map: texture1,
          shininess: 50,
          shading: THREE.FlatShading
        });
        _3DView.models.materialarray["nose"] = new THREE.MeshPhongMaterial({
          map: texture1,
          shininess: 50,
          shading: THREE.FlatShading
        });
        _3DView.models.materialarray["combustion"] = new THREE.MeshPhongMaterial({
          map: texture3,
          shininess: 50,
          shading: THREE.FlatShading
        });
        _3DView.models.materialarray["compressor2"] = new THREE.MeshPhongMaterial({
          map: texture2,
          shininess: 50,
          shading: THREE.FlatShading
        });
        _3DView.models.materialarray["compressor"] = new THREE.MeshPhongMaterial({
          map: texture2,
          shininess: 50,
          shading: THREE.FlatShading
        });
        _3DView.models.materialarray["turbine"] = new THREE.MeshPhongMaterial({
          map: texture2,
          shininess: 50,
          shading: THREE.FlatShading
        });


      }

      function setUPLights() {
        _3DView.models.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 0.5);
        _3DView.models.lights['mainLight'].position.set(0, 1, 0);
        _3DView.models.scene.add(_3DView.models.lights['mainLight']);
      }


      init();
      _3DView.animate();

      $("#playbtn").click(function (event) {
        _3DView.play = !_3DView.play;
        if (_3DView.play) {
          $("#playbtn").html('Puase');
        } else {
          $("#playbtn").html('Play');
        }
      });


      $("#resetbtn").click(function (event) {
        _3DView.renderer.camera.position.x = 150;
        _3DView.renderer.camera.position.y = 50;
        _3DView.renderer.camera.position.z = 150;
        _3DView.renderer.camera.lookat = _3DView.renderer.lookat;
      });


      $("#steel").click(function (event) {
        _3DView.modelInfomation.setMaterialInfo("Steel");
      });
      $("#nickel").click(function (event) {
        _3DView.modelInfomation.setMaterialInfo("Nickel superalloy");
      });
      $("#titanium").click(function (event) {
        _3DView.modelInfomation.setMaterialInfo("Titanium alloy");
      });
      $("#wood").click(function (event) {
        _3DView.modelInfomation.setMaterialInfo("Wood");
      });
      $("#carbom").click(function (event) {
        _3DView.modelInfomation.setMaterialInfo("Carbon fibre");
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


      $("#infoSection").hide();
      $("#infoSection").width(0);
      $("#infoSection").css({opacity: 0.5});

      $("#chooseSection").hide();
      $("#chooseSection").width(0);
      $("#chooseSection").css({opacity: 0.5});

      $("#slider").slider({
        range: "min",
        min: 1,
        step: 0.1,
        max: 10,
        value: 4,
        slide: function (event, ui) {
          var value = (ui.value / 100);
          console.log(value);
          _3DView.speed = (value);
        }
      });


      $(document).on('click', ".dropedIMG", function () {
        $("#FanCheck").css('background-color', '#FFF');
        $(this).remove();
        $("#FanCheck").append('<style>#FanCheck::before{padding-top: 100%;}</style>');
        $("#FanCheck").append('<style>#FanCheck{border: solid;border-radius:50%; }</style>');
        $("#FanCheck").html('<span class="drop-thing-text"><h4>Drop Material here</h4></span>');

      });


    });


  }); // End of require
