define(['jquery', 'three', 'three-controls'], function () {
  renderer = {
    init: function (con) {
      this.setSize(con.width(), con.height());
      this.container = document.createElement('div');
      this.container.style.width = this.width;
      this.container.style.height = this.height;
      this.container.appendChild(this.tRenderer.domElement);
      this.camera.position.z = 500;
      con.append(this.container);
      this.setupControls();
    },
    width: 10,
    height: 10,
    controls: null,
    camera: new THREE.PerspectiveCamera(60, this.width / this.height, 1, 2000),
    scene: new THREE.Scene(),
    tRenderer: new THREE.WebGLRenderer({alpha: true}),
    container: null,
    updateCamera: function () {
      this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 2000);
    },
    setSize: function (w, h) {
      this.width = w;
      this.height = h;
      this.updateCamera();
      this.tRenderer.setSize(w, h);
    },
    setupControls: function () {
      this.controls = new THREE.TrackballControls(this.camera, this.container);
      this.controls.rotateSpeed = 4.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;
      this.controls.noZoom = false;
      this.controls.noPan = false;
      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;
      this.controls.keys = [65, 83, 68];
      this.controls.minDistance = 20;
      this.controls.maxDistance = 100;
    }
  }
});
