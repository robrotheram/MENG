define(['jquery', 'three', 'models/loader'], function () {
  modelManager = {
    models: {},
    lights: {},
    scene: null,
    load: function (s) {
      this.scene = s;
      var loader = new THREE.JSONLoader();
      loader.load("scripts/data/JetEngine/fan.json", addFan);
      loader.load("scripts/data/JetEngine/shaft.json", addShaft);
      loader.load("scripts/data/JetEngine/nose.json", addNose);
      loader.load("scripts/data/JetEngine/combustion.json", addCompressor);
      loader.load("scripts/data/JetEngine/compressor2.json", addCompressor2);
      loader.load("scripts/data/JetEngine/compressor1.json", addCompbustion);
      loader.load("scripts/data/JetEngine/turbine.json", addTurbine);

      this.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 0.5);
      this.lights['mainLight'].position.set(0, 1, 0);
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
    },
  };
  function addFan(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    var name = 'Fan';
    model.name = name;
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addNose(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    model.name = 'Nose';
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addShaft(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    model.name = 'Shaft';
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addCompressor(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    model.name = 'Compressor';
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addCompressor2(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    model.name = 'Compressor2';
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addCompbustion(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    model.name = 'Combustion';
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }

  function addTurbine(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    model = new THREE.Mesh(geometry, material);
    model.scale.set(15, 15, 15);
    model.name = 'Turbine';
    model.position.set(0, 0, 0);
    modelManager.models[model.name] = model;
    modelManager.scene.add(modelManager.models[model.name]);
  }
});