define(['jquery', 'three', '../3DView/loader', 'three-tgaloader'], function () {

  /**
   * @class modelManager
   * @memberOf 3DView
   */

  modelManager = {
    models: {},
    lights: {},
    scene: null,
    datafile: null,
    materialarray: {}, // Correct Material
    modelMaterialArray: {}, //Model Material
    textureLoader: null,
    loader: null,

    /**
     * @name reset
     * @function reset
     * @memberOf 3DView.modelManager
     * @description Rest all Data paths to null or empty
     */

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

    /**
     * @name meshloader
     * @function meshloader
     * @memberOf 3DView.modelManager
     * @description Load model into array and onto the scene
     * @param {String} fileName filepath to json data of the part
     * @returns {Function} call back function Load model into array and onto the scene
     */
    meshloader: function (fileName) {
      return function (geometry) {
        model = new THREE.Mesh(geometry);
        model.scale.set(15, 15, 15);
        fileName = modelManager.pathToFile(fileName);
        model.name = fileName;
        model.position.set(0, 0, 0);
        modelManager.models[model.name] = model;
        modelManager.models[model.name].material = new THREE.MeshNormalMaterial();
        modelManager.modelMaterialArray[model.name] = new THREE.MeshNormalMaterial();
        modelManager.scene.add(modelManager.models[model.name]);
      }
    },
    /**
     * @name loadTGA
     * @function loadTGA
     * @memberOf 3DView.modelManager
     * @description Creates a new TGALoader();
     */
    loadTGA: function () {
      this.textureLoader = new THREE.TGALoader();
    },
    /**
     * @name loadIMG
     * @function loadIMG
     * @memberOf 3DView.modelManager
     * @description Load simple IMG texture and set the to repeat.
     * @param {String} textureIMG Path to texture image
     */
    loadIMG: function (textureIMG) {
      this.textureLoader = THREE.ImageUtils.loadTexture(textureIMG);
      this.textureLoader.wrapS = this.textureLoader.wrapT = THREE.RepeatWrapping;
    },

    /**
     * @name load
     * @function load
     * @memberOf 3DView.modelManager
     * @description Sets up the scene with basic lights and JSON Loader for parts
     * @param {THREE.Scene} s A Three.js Sceen
     */
    load: function (s) {
      this.scene = s;


      this.loader = new THREE.JSONLoader();

      this.lights['amLight'] = new THREE.AmbientLight(0x404040); // soft white light
      this.scene.add(this.lights['amLight']);
    },
    /**
     * @name pathToFile
     * @function pathToFile
     * @memberOf 3DView.modelManager
     * @description Converts file path to file name without any file extensions
     * @param {String} fileName File path to Part in json format
     * @returns {String} File name
     */
    pathToFile: function (fileName) {
      fileName = fileName.replace(modelManager.datafile, "");
      fileName = fileName.replace(".json", "");
      return fileName;
    },
    /**
     * @name convertToArray
     * @function convertToArray
     * @memberOf 3DView.modelManager
     * @description Converts model object to an array of objects
     * @returns {Array|*} partArray Array of part data
     */
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
