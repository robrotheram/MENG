require.config({
    baseUrl : "scripts",
    paths : {
        "jquery" : "vendor/jquery/dist/jquery.min",
        "jquery-ui" : "vendor/jquery-ui/jquery-ui.min",
        "bootstrap" :"vendor/bootstrap/dist/js/bootstrap.min",
        "angular" : "vendor/angular/angular.min",
        "three": "vendor/threejs/build/three.min",
        "three-controls": "vendor/three.js-controls/src/TrackballControls",
    },
    shim : {
        "jquery-ui" : {
            deps : [ "jquery" ],
            exports : 'jQueryUI'
        },
        "angular" : {
            exports : "angular"
        },
        "bootstrap" : {
            deps : [ "jquery" ],
        },
        "three": { exports: 'THREE' },
        "three-controls": { deps: ['three'], exports: 'THREE' },
    }
// End of shims
});
require(["app"]); // End of require
