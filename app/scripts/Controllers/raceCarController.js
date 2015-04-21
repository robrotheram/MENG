define(["../app",
    "jquery",
    "jquery-ui",
    "jquery-ui-touch",
    '3DView/3DView',
    'bootstrap',
    'three'],

  function (app, $) {

    /**
     * @class racecar
     * @memberOf angular_module
     */


    app.controller('racecar', function ($scope) {
      $scope.pageName = "Race Car";
      var height = $("#mainPanelBody").height();
      height += 55;
      $("#materialBody").height(height);


      /**
       * @name $init
       * @function init
       * @memberOf angular_module.racecar
       * @description Sets up the entire page. Loads in the module and texture. Loads the material list and the custom check section
       */

      function init() {
        _3DView.new();
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
          if ((model.name == "Compressor") || (model.name == "Compressor2")) {
            _3DView.models.models["Compressor"].material = selectMaterial;
            _3DView.models.models["Compressor2"].material = selectMaterial;
            _3DView.modelInfomation.setPartsInfo("Compressor");
          } else if ((model.name == "Shaft") || (model.name == "Nose")) {
            _3DView.models.models["Shaft"].material = selectMaterial;
            _3DView.models.models["Nose"].material = selectMaterial;
            _3DView.modelInfomation.setPartsInfo("Shaft");
          } else {
            model.material = selectMaterial;
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


      /**
       * @name loadModel
       * @function loadModel
       * @memberOf angular_module.racecar
       * @param {String} filename relative File Path to the model
       * @description send the relative file path to the model
       */


      function loadModel(filename) {
        _3DView.models.loader.load(filename, _3DView.models.meshloader(filename));
      }

      _3DView.modelInfomation.partJsonPath = "scripts/data/Info/racecar_parts.json";
      _3DView.modelInfomation.materialJsonPath = "scripts/data/Info/materials.json";
      _3DView.modelInfomation.getMaterials("steel");
      _3DView.modelInfomation.getParts("body");


      /**
       * @name loadMaterials
       * @function loadMaterials
       * @memberOf angular_module.racecar

       * @description Load the materials for each part of the model
       */

      function loadMaterials() {
        var texture1 = _3DView.models.textureLoader.load('scripts/data/RaceCar/rb0_main.tga');
        var texture3 = _3DView.models.textureLoader.load('scripts/data/RaceCar/generic_main.tga');
        _3DView.models.materialarray["back_foil"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
        _3DView.models.materialarray["back_suspension"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
        _3DView.models.materialarray["body"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
        _3DView.models.materialarray["breaks"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
        _3DView.models.materialarray["front_foil"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
        _3DView.models.materialarray["front_suspension"] = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: texture3
        });
        _3DView.models.materialarray["tyres"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
        _3DView.models.materialarray["wheels"] = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
      }



      /**
       * @name loadMaterials
       * @function loadMaterials
       * @memberOf angular_module.racecar

       * @description Load the required lights for the model
       */

      function setUPLights() {
        _3DView.models.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 2);
        _3DView.models.lights['mainLight'].position.set(1, 1, 1);
        _3DView.models.scene.add(_3DView.models.lights['mainLight']);
      }


      init();
      _3DView.animate();


      /**
       * @memberOf angular_module.racecar
       * Set up the play pause button
       */

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






      $(document).on('click', ".dropedIMG", function () {
        $("#FanCheck").css('background-color', '#FFF');
        $(this).remove();
        $("#FanCheck").append('<style>#FanCheck::before{padding-top: 100%;}</style>');
        $("#FanCheck").append('<style>#FanCheck{border: solid;border-radius:50%; }</style>');
        $("#FanCheck").html('<span class="drop-thing-text"><h4>Drop Material here</h4></span>');

      });




      /** Depreicated functions below **/

      /*



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

     */

    });

  }); // End of require
