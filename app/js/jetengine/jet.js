var camera, scene, renderer, fan, shaft, loader, controls, play;
var jetEngine = [];
var x = 0;
var material_texture = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('images/crate.jpg')});
var texture = THREE.ImageUtils.loadTexture('images/wood.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

var play = false;
var container;
var $container;
var _this;
var raycaster;
var mouseVector;

var oldButton;
var materialsData;

function Jet($con) {

  $container = $con;
  _this = this;
  container = document.createElement('div');
  width = $con.width();
  height = $con.height();


  _this.getMaterials();
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

  EventsControls = new EventsControls(camera, renderer.domElement);
  EventsControls.displacing = false;

  EventsControls.onclick = function () {

    this.focused.material = new THREE.MeshPhongMaterial({
      // light
      map: texture,
      // dark
      shininess: 50
    });
    console.log(this.focused.name);

  };

  loader = new THREE.JSONLoader();

  loader.load("jetengine/fan.json", _this.addFan);
  loader.load("jetengine/shaft.json", _this.addShaft);
  loader.load("jetengine/nose.json", _this.addNose);
  loader.load("jetengine/compressor.json", _this.addCompressor);
  loader.load("jetengine/compressor2.json", _this.addCompressor2);
  loader.load("jetengine/combustion.json", _this.addCompbustion);


  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);


  window.addEventListener('resize', _this.onWindowResize, false);


  _this.animate();
}


Jet.prototype.getMaterials = function () {
  $.getJSON("json/materials.json", function (data) {
    materialsData = data;
    //alert(materialsData.materials[0].name);
  });

};


Jet.prototype.selectmaterial = function (obj, i) {

  if (oldButton != null) {
    var typ = document.createAttribute("class");
    typ.value = "img img-circle img-responsive img-thumbnail materialImg";
    oldButton.attributes.setNamedItem(typ);
  }

  var typ = document.createAttribute("class");
  typ.value = "img img-circle img-responsive img-thumbnail materialImg materialSelected";
  obj.attributes.setNamedItem(typ);
  oldButton = obj;


  texture = THREE.ImageUtils.loadTexture(materialsData.materials[i].texture_img);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  $("#material_info").html(materialsData.materials[i].description);
  $("#material_info").append("<hr/><h4>Material Properties</h4>");
  $("#material_info").append("<b>Melting Point: </b>" + materialsData.materials[i].melting_point + "<br/>");
  $("#material_info").append("<b>Strength: </b>" + materialsData.materials[i].Strength + "<br/>");
  $("#material_info").append("<b>Density: </b>" + materialsData.materials[i].Density + "<br/>");
};





Jet.prototype.addFan = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Fan';
  model.position.set(0, 0, 0);
  jetEngine[x] = model;
  scene.add(jetEngine[x]);
  EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addNose = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Nose';
  model.position.set(0, 0, 0);
  jetEngine[x] = model;
  scene.add(jetEngine[x]);
  EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addShaft = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Shaft';
  model.position.set(0, 0, 0);
  jetEngine[x] = model;
  scene.add(jetEngine[x]);
  EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addCompressor = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Compressor';
  model.position.set(0, 0, 0);
  jetEngine[x] = model;
  scene.add(jetEngine[x]);
  EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addCompressor2 = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Compressor2';
  model.position.set(0, 0, 0);
  jetEngine[x] = model;
  scene.add(jetEngine[x]);
  EventsControls.attach(jetEngine[x]);
  x++;
};
Jet.prototype.addCompbustion = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Compbustion';
  model.position.set(0, 0, 0);

  jetEngine[x] = model;
  scene.add(jetEngine[x]);
  EventsControls.attach(jetEngine[x]);
  x++;
};











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
      try {
        jetEngine[0].rotateZ(1);
        jetEngine[1].rotateZ(1);
        jetEngine[2].rotateZ(0);
        jetEngine[3].rotateZ(1);
        jetEngine[4].rotateZ(1);
        jetEngine[5].rotateZ(1);
      } catch (err) {

      }

    }
  }

  requestAnimationFrame(_this.animate);
  renderer.render(scene, camera);

  controls.update();


};

Jet.prototype.dummy = function () {
  alert("hello");
};


Jet.prototype.onMouseMove = function (e) {

  var isHovered = $container.is(":hover");
  console.log(isHovered);
  if (isHovered) {
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / $('#jetEngine').width() ) * 2 - 1;
    mouse.y = -( event.clientY / $('#jetEngine').height() ) * 2 + 1;

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    var pos = camera.position;
    var ray = new THREE.Raycaster(pos, vector.unproject(camera).sub(camera.position).normalize());

    var intersects = ray.intersectObjects(jetEngine);
    if (intersects.length > 0) {
      console.log("touched:" + intersects[0]);

      // intersects[0].position.x = 1.1;
    }
    else {
      console.log("not touched");
    }
  }


};
