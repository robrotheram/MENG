window.onload = function () {

  var renderer = new THREE.WebGLRenderer();
  width = 600;
  height = 400;
  var $container = $('#container');
  width = $container.width();
  height = $container.height();
  renderer.setSize(width, height);
  $container.append(renderer.domElement);

  var speed = 0.2;
  var time = 0;

  function animate() {
    var newtime = (new Date()).getTime();
    var diffTime = newtime - time;
    var angle = speed * diffTime * 2 * Math.PI / 1000;
    mesh.rotation.y += angle;
    time = newtime;
    renderer.render(scene, camera);
    requestAnimationFrame(function () {
      animate();
    });
  }

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(
    60,             // Field of view
    width / height,      // Aspect ratio
    0.1,            // Near plane
    10000           // Far plane
  );
  camera.position.set(-15, 10, 10);
  camera.lookAt(scene.position);

  var geometry = new THREE.CubeGeometry(5, 5, 5);
  var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.overdraw = true;
  scene.add(mesh);

  var light = new THREE.PointLight(0xFFFF00);
  light.position.set(-15, 5, 10);
  scene.add(light);


  animate();
};
