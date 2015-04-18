define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("webapp", ['ngRoute']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when("/", angularAMD.route({
        templateUrl: 'scripts/views/home.html'
      }))
      .when("/racecar", angularAMD.route({
        templateUrl: 'scripts/views/app.html', controller: 'racecar', controllerUrl: 'Controllers/raceCarController'
      }))
      .when("/jetengine", angularAMD.route({
        templateUrl: 'scripts/views/app.html', controller: 'jetengine', controllerUrl: 'Controllers/jetEngineController'
      }))
      .otherwise({redirectTo: "/"});
  });

  return angularAMD.bootstrap(app);
});
