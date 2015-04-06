define(['jquery', 'three', '../3DView/loader', 'three-tgaloader'], function () {
  modelManager = {
    models: {},
    lights: {},
    scene: null,
    datafile: null,
    materialarray: {},
    textureLoader: null,
    loader: null,
    meshloader: function (fileName) {
      return function (geometry) {
        model = new THREE.Mesh(geometry);
        model.scale.set(15, 15, 15);
        fileName = modelManager.pathToFile(fileName);
        model.name = fileName;
        model.position.set(0, 0, 0);
        modelManager.models[model.name] = model;
        modelManager.models[model.name].material = modelManager.materialarray[model.name];
        modelManager.scene.add(modelManager.models[model.name]);
      }
    },
    loadTGA: function () {
      this.textureLoader = new THREE.TGALoader();
    },
    loadIMG: function (textureIMG) {
      this.textureLoader = THREE.ImageUtils.loadTexture('images/metal3.jpg');
      this.textureLoader.wrapS = this.textureLoader.wrapT = THREE.RepeatWrapping;
    },

    load: function (s) {
      this.scene = s;


      this.loader = new THREE.JSONLoader();

      this.lights['amLight'] = new THREE.AmbientLight(0x404040); // soft white light
      this.scene.add(this.lights['amLight']);
    },
    pathToFile: function (fileName) {
      fileName = fileName.replace(modelManager.datafile, "");
      fileName = fileName.replace(".json", "");
      return fileName;
    },
    convertToArray: function () {
      JetEngineArray = [];
      for (var modelID in this.models) {
        var value = this.models[modelID];
        JetEngineArray.push(value);
      }
      return JetEngineArray;
    }
  }
});
