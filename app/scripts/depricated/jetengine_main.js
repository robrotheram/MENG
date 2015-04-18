require.config({
  baseUrl: "scripts",
  paths: {
    "jquery": "../vendor/jquery/dist/jquery.min.js",
    "jquery-ui": "../vendor/jquery-ui/jquery-ui.min.js",
    "jquery-ui-touch": "../vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js",
    "bootstrap": "../vendor/bootstrap/dist/js/bootstrap.min.js",
    "angular": "../vendor/angular/angular.min.js",
    "three": "../vendor/threejs/build/three.min.js",
    "three-controls": "../vendor/three.js-controls/src/TrackballControls",
    "three-tgaloader": "../3DView/tgaloader"
  },
  shim: {
    "jquery-ui": {
      deps: ["jquery"],
      exports: "$"
    },
    "jquery-ui-touch": {
      exports: "$",
      deps: ['jquery-ui']
    },
    "angular": {
      exports: "angular"
    },
    "bootstrap": {
      deps: ["jquery"]
    },

    "three": {exports: 'THREE'},
    "three-controls": {deps: ['three'], exports: 'THREE'},
    "three-tgaloader": {deps: ['three'], exports: 'THREE'}
  }
// End of shims
});
require(["jetengine_app.js"]); // End of require



