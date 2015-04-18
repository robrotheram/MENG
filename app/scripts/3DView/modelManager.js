define(['jquery', 'three', '../3DView/loader', 'three-tgaloader'], function () {
  modelManager = {
    models: {},
    lights: {},
    scene: null,
    datafile: null,
    materialarray: {}, // Correct Material
    modelMaterialArray: {}, //Model Material
    textureLoader: null,
    loader: null,
    reset: function () {
      this.models = {};
      this.lights = {};
      this.datafile = null;
      this.materialarray = {};
      this.textureLoader = null;
      this.loader = null;
      var obj, i;
      if (this.scene != null) {
        for (i = this.scene.children.length - 1; i >= 0; i--) {
          obj = this.scene.children[i];
          this.scene.remove(obj);
        }
      }
    },
    meshloader: function (fileName) {
      return function (geometry) {
        model = new THREE.Mesh(geometry);
        model.scale.set(15, 15, 15);
        fileName = modelManager.pathToFile(fileName);
        model.name = fileName;
        model.position.set(0, 0, 0);
        modelManager.models[model.name] = model;
        //modelManager.models[model.name].material = modelManager.materialarray[model.name];
        modelManager.models[model.name].material = new THREE.MeshNormalMaterial();
        modelManager.modelMaterialArray[model.name] = new THREE.MeshNormalMaterial();
        modelManager.scene.add(modelManager.models[model.name]);
      }
    },
    loadTGA: function () {
      this.textureLoader = new THREE.TGALoader();
    },
    loadIMG: function (textureIMG) {
      this.textureLoader = THREE.ImageUtils.loadTexture('images/steel.jpg');
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
