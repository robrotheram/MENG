/**
 * Created by robert on 16/02/15.
 */
require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone'
  }
});
require(['views/app'], function (AppView) {
  new AppView;
});
