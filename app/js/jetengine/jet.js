var camera, scene, renderer, fan, shaft, loader, controls, play;
var jetEngine = [];
var x = 0;
var material_texture = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('images/crate.jpg')});
var texture = THREE.ImageUtils.loadTexture('images/metal2.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10);
var play = false;
var container;
var $container;
var _this;
var raycaster;
var mouseVector;

function Jet($con) {

  $container = $con;
  _this = this;
  container = document.createElement('div');
  width = $con.width();
  height = $con.height();

  container.style.width = width;
  container.style.height = height;
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.domElement.id = 'jetEngine';
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  $con.append(container);

  raycaster = new THREE.Raycaster();

  camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
  camera.position.z = 200;
  camera.position.y = 0;
  camera.position.x = 30;

  controls = new THREE.TrackballControls(camera, container);

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
  window.addEventListener('click', _this.onMouseMove, false);

  _this.animate();
}


Jet.prototype.changeColor = function () {
  for (i = 0; i < jetEngine.length; i++) {
    jetEngine[i].material = new THREE.MeshPhongMaterial({
      // light
      map: texture,
      // dark
      shininess: 50
    });

  }
};

Jet.prototype.playPause = function (btn) {

  play = !play;
  if (play) {
    $(playbtn).html('Puase');
  } else {
    $(playbtn).html('Play');
  }
};

Jet.prototype.reset = function () {
  play = false;
  for (i = 0; i < jetEngine.length; i++) {
    jetEngine[i].material = new THREE.MeshNormalMaterial()
  }

  camera.position.z = 200;
  camera.position.y = 0;
  camera.position.x = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
};


Jet.prototype.addmodel = function (geometry, materials) {
  var obj = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
  obj.scale.set(15, 15, 15);
  jetEngine[x] = obj;
  scene.add(jetEngine[x]);
  x++;
};

Jet.prototype.onWindowResize = function () {

  width = container.width();
  height = container.height();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.handleResize();
};

Jet.prototype.animate = function () {


  if (play) {

    if (jetEngine[0] != null) {
      try {
        jetEngine[0].rotateZ(1);
        jetEngine[1].rotateZ(1);
        jetEngine[2].rotateZ(10);
        jetEngine[3].rotateZ(0);
        jetEngine[4].rotateZ(1);
        jetEngine[5].rotateZ(30);
      } catch (err) {

      }

    }
  }

  requestAnimationFrame(_this.animate);
  renderer.render(scene, camera);

  controls.update();


};

Jet.prototype.onMouseMove = function (e) {

  var isHovered = $container.is(":hover");
  console.log(isHovered);
  if (isHovered) {
    mouseVector = new THREE.Vector3();
    mouseVector.x = 2 * (e.clientX / width ) - 1;
    mouseVector.y = 1 - 2 * ( e.clientY / height );

    var vector = mouseVector.clone().unproject(camera);
    var direction = new THREE.Vector3(0, 0, -1).transformDirection(camera.matrixWorld);
    raycaster.set(vector, direction);
    var intersects = raycaster.intersectObjects(jetEngine);

    var intersection = intersects[intersects.length - 1];
    obj = intersection.object;

    obj.material = new THREE.MeshPhongMaterial({
      // light
      map: texture,
      // dark
      shininess: 50
    });
  }


};
