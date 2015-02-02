var camera, scene, renderer, fan, shaft, loader, controls, play;
var jetEngine = {};
var x = 0;
var default_texture = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('images/crate.jpg')});
var material_texture = default_texture;
var texture = THREE.ImageUtils.loadTexture('images/wood.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

var play = false;
var container;
var $container;
var _this;

var SPEED = 0.01;

var count = 0;
var mouse = {x: 0, y: 0};
var oldButton;
var materialsData;
var EventsControls;

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

  // find intersections
  var vector = new THREE.Vector3();
  var raycaster = new THREE.Raycaster();

// mouse listener

  document.addEventListener('click', function (event) {


    var mouse = {x: 0, y: 0};
    mouse.x = ((event.clientX - $container.offset().left) / $container.width() ) * 2 - 1;
    mouse.y = -(((event.pageY - $container.offset().top) / $container.outerHeight() ) * 2 - 1);
    console.log('x: ' + mouse.x + '|    y:' + mouse.y);

    vector.set(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    raycaster.set(camera.position, vector.sub(camera.position).normalize());
    jetEngineArr = _this.convertToArray();
    intersects = raycaster.intersectObjects(jetEngineArr);
    for (var modelID in jetEngine) {
      jetEngine[modelID].material = new THREE.MeshNormalMaterial();
    }
    if (intersects.length > 0) {


      obj = intersects[0].object;
      obj.material = new THREE.MeshPhongMaterial({
        // light
        map: texture,
        // dark
        shininess: 50
      });

      console.log('INTERSECT Count: ' + ++count);

    }

  }, false);



  loader = new THREE.JSONLoader();

  loader.load("jetengine/v2/fan.json", _this.addFan);
  loader.load("jetengine/v2/shaft.json", _this.addShaft);
  loader.load("jetengine/v2/nose.json", _this.addNose);
  loader.load("jetengine/v2/compressor1.json", _this.addCompressor);
  loader.load("jetengine/v2/compressor2.json", _this.addCompressor2);
  loader.load("jetengine/v2/combustion.json", _this.addCompbustion);
  loader.load("jetengine/v2/turbine.json", _this.addTurbine);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);


  window.addEventListener('resize', _this.onWindowResize, false);


//  amera: {"x":146.90523813315187,"y":37.57719245188191,"z":150.21266339543962}
  camera.position.x= 150;
  camera.position.y= 40;
  camera.position.z= 150;

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
  $("#material_title").html("<i class='fa fa-info-circle fa-fw'></i> " + materialsData.materials[i].name);
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
  var name = 'Fan';
  model.name = name;
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
  // EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addNose = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Nose';
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
  // EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addShaft = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Shaft';
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
  // EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addCompressor = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Compressor';
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
//  EventsControls.attach(jetEngine[x]);
  x++;
};

Jet.prototype.addCompressor2 = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Compressor2';
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
  // EventsControls.attach(jetEngine[x]);
  x++;
};
Jet.prototype.addCompbustion = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Combustion';
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
  // EventsControls.attach(jetEngine[x]);
  x++;
};
Jet.prototype.addTurbine = function (geometry, materials) {
  var material = new THREE.MeshNormalMaterial();
  model = new THREE.Mesh(geometry, material);
  model.scale.set(15, 15, 15);
  model.name = 'Turbine';
  model.position.set(0, 0, 0);
  jetEngine[model.name] = model;
  scene.add(jetEngine[model.name]);
  // EventsControls.attach(jetEngine[x]);
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

  //console.log("camera: "+JSON.stringify(camera.position));
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


Jet.prototype.convertToArray = function () {
  JetEngineArray = [];
  for (var modelID in jetEngine) {
    var value = jetEngine[modelID];
    JetEngineArray.push(value);
  }
  return JetEngineArray;

};

Jet.prototype.setSpeed = function (spd) {
  SPEED = (spd / 100);
};


Jet.prototype.hilightPart = function (spd) {
  for (var modelID in jetEngine) {
    jetEngine[modelID].material = new THREE.MeshNormalMaterial();
  }

  SelectedObj = jetEngine[spd];
  if (spd == 'Combustion') {
    jetEngine['Compressor2'].material = new THREE.MeshLambertMaterial({color: 0x8888ff});
  }
  jetEngine[spd].material = new THREE.MeshLambertMaterial({color: 0x8888ff});

};


Jet.prototype.animate = function () {


  if (play) {
    console.log(SPEED);
    jetEngine['Nose'].rotation.z -= SPEED;
    jetEngine['Fan'].rotation.z -= SPEED;
    jetEngine['Compressor2'].rotation.z -= SPEED;
    jetEngine['Combustion'].rotation.z -= SPEED;
    jetEngine['Turbine'].rotation.z -= SPEED;

  }


  requestAnimationFrame(_this.animate);
  renderer.render(scene, camera);

  controls.update();
  // EventsControls.update();
};


