var camera, scene, renderer, fan, shaft, loader, controls, play;
var jetEngine = [];
var x = 0;
var material_texture = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('images/crate.jpg')});
var texture = THREE.ImageUtils.loadTexture('images/metal2.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10);
var play = false;

var _this;


function Jet($container) {

  _this = this;
  width = $container.width();
  height = $container.height();

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(width, height);
  $container.append(renderer.domElement);


  camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
  camera.position.z = 200;
  camera.position.y = 0;
  camera.position.x = 30;

  controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [65, 83, 68];

  scene = new THREE.Scene();

  loader = new THREE.JSONLoader();

  loader.load("jetengine/fan.json", _this.addmodel);
  loader.load("jetengine/shaft.json", _this.addmodel);
  loader.load("jetengine/nose.json", _this.addmodel);
  loader.load("jetengine/compressor.json", _this.addmodel);
  loader.load("jetengine/compressor2.json", _this.addmodel);
  loader.load("jetengine/combustion.json", _this.addmodel);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);


  window.addEventListener('resize', _this.onWindowResize, false);
  _this.animate();
}


function changeColor() {
  for (i = 0; i < jetEngine.length; i++) {
    jetEngine[i].material = new THREE.MeshPhongMaterial({
      // light
      map: texture,
      // dark
      shininess: 50
    });

  }
}

function playPause() {
  play = !play;
}


Jet.prototype.addmodel = function (geometry, materials) {
  var obj = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
  obj.scale.set(15, 15, 15);
  jetEngine[x] = obj;
  scene.add(jetEngine[x]);
  x++;
};

Jet.prototype.onWindowResize = function () {
  var $container = $('.webgl');
  width = $container.width();
  height = $container.height();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.handleResize();
};

Jet.prototype.animate = function () {


  if (play) {

    if (jetEngine[0] != null) {
      jetEngine[0].rotateZ(1);
      jetEngine[1].rotateZ(1);
      jetEngine[2].rotateZ(10);
      jetEngine[3].rotateZ(0);
      jetEngine[4].rotateZ(1);
      jetEngine[5].rotateZ(30);
    }
  }

  requestAnimationFrame(_this.animate);
  renderer.render(scene, camera);
  controls.update();
};
