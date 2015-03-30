define(['jquery', 'three', '../racecar/loader', 'three-tgaloader'], function () {
  modelManager = {
    models: {},
    lights: {},
    scene: null,
    materialarray: {},
    material1: null,
    material2: null,
    material3: null,
    material4: null,

    load: function (s) {
      this.scene = s;
      var load = new THREE.TGALoader();
      var texture1 = load.load('scripts/data/RaceCar/rb0_main.tga');
      var texture2 = load.load('scripts/data/RaceCar/tyre.tga');
      var texture3 = load.load('scripts/data/RaceCar/generic_main.tga');
      var texture4 = load.load('scripts/data/RaceCar/rb0_wheel.tga');

      this.material1 = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
      this.material2 = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture2});
      this.material3 = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture3});
      this.material4 = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture4});


      var loader = new THREE.JSONLoader();
      loader.load("scripts/data/RaceCar/back_foil.json", addbackFoil);
      loader.load("scripts/data/RaceCar/back_suspension.json", addback_suspension);
      loader.load("scripts/data/RaceCar/body.json", addbody);
      loader.load("scripts/data/RaceCar/breaks.json", addbreaks);
      loader.load("scripts/data/RaceCar/front_foil.json", addfrontFoil);
      loader.load("scripts/data/RaceCar/front_suspension.json", addfront_suspension);
      loader.load("scripts/data/RaceCar/tyres.json", addtyres);
      loader.load("scripts/data/RaceCar/wheels.json", addwheel);

      this.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 2);
      this.lights['mainLight'].position.set(1, 1, 1);
      this.scene.add(this.lights['mainLight']);
      this.lights['amLight'] = new THREE.AmbientLight(0x404040); // soft white light
      this.scene.add(this.lights['amLight']);
    },
    convertToArray: function () {
      JetEngineArray = [];
      for (var modelID in this.models) {
        var value = this.models[modelID];
        JetEngineArray.push(value);
      }
      return JetEngineArray;
    }
  };


  function addbackFoil(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material1);
    model.scale.set(15, 15, 15);
    var name = 'backFoil';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material1;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addback_suspension(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material3);
    model.scale.set(15, 15, 15);
    var name = 'backSuspension';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material3;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addfrontFoil(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material1);
    model.scale.set(15, 15, 15);
    var name = 'frontFoil';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material1;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addfront_suspension(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material3);
    model.scale.set(15, 15, 15);
    var name = 'frontSuspension';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material3;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addbody(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material1);
    model.scale.set(15, 15, 15);
    var name = 'body';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material1;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addtyres(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material3);
    model.scale.set(15, 15, 15);
    var name = 'tyres';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material3;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addwheel(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material3);
    model.scale.set(15, 15, 15);
    var name = 'wheel';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material3;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addbreaks(geometry, materials) {
    model = new THREE.Mesh(geometry, modelManager.material3);
    model.scale.set(15, 15, 15);
    var name = 'breaks';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.materialarray[model.name] = modelManager.material3;
    modelManager.scene.add(modelManager.models[model.name]);
  }

});
