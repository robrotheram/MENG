define(["../vendor/jquery/dist/jquery.min",
    "angular",
    "jquery-ui",
    '3DView/3DView',
    'bootstrap',
    'conrollers/app',
    'conrollers/controller', 'three'],

  function ($) {
    function init() {
      _3DView.init("#jet");
      _3DView.animate = function () {
        this.renderer.tRenderer.render(renderer.scene, renderer.camera);
        this.renderer.controls.update();
        if (_3DView.play) {
          console.log(_3DView.speed);
          if (_3DView.models.models['wheels']) {
            _3DView.models.models['wheels'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['tyres']) {
            _3DView.models.models['tyres'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['body']) {
            _3DView.models.models['body'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['front_foil']) {
            _3DView.models.models['front_foil'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['front_suspension']) {
            _3DView.models.models['front_suspension'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['back_foil']) {
            _3DView.models.models['back_foil'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['back_suspension']) {
            _3DView.models.models['back_suspension'].rotation.y -= _3DView.speed;
          }
          if (_3DView.models.models['breaks']) {
            _3DView.models.models['breaks'].rotation.y -= _3DView.speed;
          }
        }

        //console.log(_3DView.renderer.camera.position.x,_3DView.renderer.camera.position.y,_3DView.renderer.camera.position.z);
        requestAnimationFrame(function () {
          _3DView.animate();
        });
      };
      _3DView.selectPart = function (model) {
        if ((model.name == "Compressor") || (model.name == "Compressor2")) {
          _3DView.models.models["Compressor"].material = new THREE.MeshNormalMaterial();
          _3DView.models.models["Compressor2"].material = new THREE.MeshNormalMaterial();
          _3DView.modelInfomation.setPartsInfo("Compressor");
        } else if ((model.name == "Shaft") || (model.name == "Nose")) {
          _3DView.models.models["Shaft"].material = new THREE.MeshNormalMaterial();
          _3DView.models.models["Nose"].material = new THREE.MeshNormalMaterial();
          _3DView.modelInfomation.setPartsInfo("Shaft");
        } else {
          model.material = new THREE.MeshNormalMaterial();
          _3DView.modelInfomation.setPartsInfo(model.name);
        }
      };

      _3DView.renderer.controls.minDistance = 20;
      _3DView.renderer.controls.maxDistance = 100;
      _3DView.models.loadTGA();
      loadMaterials();
      _3DView.models.datafile = "scripts/data/RaceCar/";
      loadModel(_3DView.models.datafile + "back_foil.json");
      loadModel(_3DView.models.datafile + "back_suspension.json");
      loadModel(_3DView.models.datafile + "body.json");
      loadModel(_3DView.models.datafile + "breaks.json");
      loadModel(_3DView.models.datafile + "front_foil.json");
      loadModel(_3DView.models.datafile + "front_suspension.json");
      loadModel(_3DView.models.datafile + "tyres.json");
      loadModel(_3DView.models.datafile + "wheels.json");


      setUPLights();

    }

    function loadModel(filename) {
      _3DView.models.loader.load(filename, _3DView.models.meshloader(filename));
    }

    _3DView.modelInfomation.partJsonPath = "scripts/data/Info/racecar_parts.json";
    _3DView.modelInfomation.materialJsonPath = "scripts/data/Info/materials.json";
    _3DView.modelInfomation.getMaterials("steel");
    _3DView.modelInfomation.getParts("body");

    function loadMaterials() {
      var texture1 = _3DView.models.textureLoader.load('scripts/data/RaceCar/rb0_main.tga');
      var texture3 = _3DView.models.textureLoader.load('scripts/data/RaceCar/generic_main.tga');
      _3DView.models.materialarray["back_foil"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
      _3DView.models.materialarray["back_suspension"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
      _3DView.models.materialarray["body"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
      _3DView.models.materialarray["breaks"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
      _3DView.models.materialarray["front_foil"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
      _3DView.models.materialarray["front_suspension"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
      _3DView.models.materialarray["tyres"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
      _3DView.models.materialarray["wheels"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
    }

    function setUPLights() {
      _3DView.models.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 2);
      _3DView.models.lights['mainLight'].position.set(1, 1, 1);
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
      _3DView.renderer.camera.position.x = 40;
      _3DView.renderer.camera.position.y = 22;
      _3DView.renderer.camera.position.z = 35;
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

  }); // End of require
