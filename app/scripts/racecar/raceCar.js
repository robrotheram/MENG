define(['jquery', 'three', '../racecar/3DCanvas', '../racecar/modelManager', 'three-controls', '../racecar/modelinfo'], function () {

  var texture = THREE.ImageUtils.loadTexture('images/metal3.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  jetEngineView = {
    renderer: renderer,
    modelInfomation: modelinfo,
    init: function (containerID) {
      this.modelInfomation.init();
      this.outercontainer = $(containerID);
      this.renderer.init($(containerID));
      this.load();
      this.renderer.camera.position.x = 40;
      this.renderer.camera.position.y = 22;
      this.renderer.camera.position.z = 35;
      document.addEventListener('click', this.selectPart);

    },
    animate: function () {
      _this = this;
      this.renderer.tRenderer.render(renderer.scene, renderer.camera);
      this.renderer.controls.update();
      if (this.play) {
        console.log(this.speed);
        if (this.models.models['Nose']) {
          this.models.models['Nose'].rotation.z -= this.speed;
        }
        if (this.models.models['Fan']) {
          this.models.models['Fan'].rotation.z -= this.speed;
        }
        if (this.models.models['Compressor2']) {
          this.models.models['Compressor2'].rotation.z -= this.speed;
        }
        if (this.models.models['Compressor']) {
          this.models.models['Compressor'].rotation.z -= this.speed;
        }
        if (this.models.models['Turbine']) {
          this.models.models['Turbine'].rotation.z -= this.speed;
        }
      }
      //console.log(this.renderer.camera.position.x+" | "+this.renderer.camera.position.y+" | "+this.renderer.camera.position.z);

      requestAnimationFrame(function () {
        _this.animate();
      });
    },
    models: modelManager,
    vector: new THREE.Vector3(),
    testnumber: 100,
    raycaster: new THREE.Raycaster(),
    outercontainer: null,
    speed: 0.02,
    play: false,
    load: function () {
      this.models.load(this.renderer.scene);
    },
    reset: function () {
      this.play = false;
      this.renderer.camera.position.x = 150;
      this.renderer.camera.position.y = 40;
      this.renderer.camera.position.z = 150;
    },
    selectPart: function (event) {
      var mouse = {x: 0, y: 0};
      mouse.x = ((event.clientX - jetEngineView.outercontainer.offset().left) / jetEngineView.outercontainer.width() ) * 2 - 1;
      mouse.y = -(((event.pageY - jetEngineView.outercontainer.offset().top) / jetEngineView.outercontainer.outerHeight() ) * 2 - 1);
      jetEngineView.vector.set(mouse.x, mouse.y, 0.5);
      jetEngineView.vector.unproject(jetEngineView.renderer.camera);
      jetEngineView.raycaster.set(jetEngineView.renderer.camera.position,
        jetEngineView.vector.sub(jetEngineView.renderer.camera.position).normalize());

      jetEngineArr = jetEngineView.models.convertToArray();
      intersects = jetEngineView.raycaster.intersectObjects(jetEngineArr);
      for (var modelID in jetEngineView.models.models) {
        jetEngineView.models.models[modelID].material = modelManager.materialarray[modelID];
      }
      if (intersects.length > 0) {
        obj = intersects[0].object;
        if ((obj.name == "Compressor") || (obj.name == "Compressor2")) {
          jetEngineView.models.models["Compressor"].material = new THREE.MeshNormalMaterial();
          jetEngineView.models.models["Compressor2"].material = new THREE.MeshNormalMaterial();
          jetEngineView.modelInfomation.setPartsInfo("Compressor");
        } else if ((obj.name == "Shaft") || (obj.name == "Nose")) {
          jetEngineView.models.models["Shaft"].material = new THREE.MeshNormalMaterial();
          jetEngineView.models.models["Nose"].material = new THREE.MeshNormalMaterial();
          jetEngineView.modelInfomation.setPartsInfo("Shaft");
        } else {
          obj.material = new THREE.MeshNormalMaterial();
          jetEngineView.modelInfomation.setPartsInfo(intersects[0].object.name);
        }
      }
    }
  }
});
