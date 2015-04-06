define(['jquery', 'three', '../3DView/3DCanvas', '../3DView/modelManager', 'three-controls', '../3DView/modelinfo'], function () {

  var texture = THREE.ImageUtils.loadTexture('images/metal3.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  _3DView = {
    renderer: renderer,
    modelInfomation: modelinfo,
    init: function (containerID) {
      this.outercontainer = $(containerID);
      this.renderer.init($(containerID));
      this.load();
      this.renderer.camera.position.x = 40;
      this.renderer.camera.position.y = 22;
      this.renderer.camera.position.z = 35;
      document.addEventListener('click', this.onSelectPart);

    },
    animate: null,
    models: modelManager,
    vector: new THREE.Vector3(),
    testnumber: 100,
    raycaster: new THREE.Raycaster(),
    outercontainer: null,
    speed: 0.005,
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
    selectPart: null,
    onSelectPart: function (event) {
      var mouse = {x: 0, y: 0};
      mouse.x = ((event.clientX - _3DView.outercontainer.offset().left) / _3DView.outercontainer.width() ) * 2 - 1;
      mouse.y = -(((event.pageY - _3DView.outercontainer.offset().top) / _3DView.outercontainer.outerHeight() ) * 2 - 1);
      _3DView.vector.set(mouse.x, mouse.y, 0.5);
      _3DView.vector.unproject(_3DView.renderer.camera);
      _3DView.raycaster.set(_3DView.renderer.camera.position,
        _3DView.vector.sub(_3DView.renderer.camera.position).normalize());

      jetEngineArr = _3DView.models.convertToArray();
      intersects = _3DView.raycaster.intersectObjects(jetEngineArr);
      for (var modelID in _3DView.models.models) {
        _3DView.models.models[modelID].material = modelManager.materialarray[modelID];
      }
      if (intersects.length > 0) {
        _3DView.selectPart(intersects[0].object);
      }
    }
  }
});
