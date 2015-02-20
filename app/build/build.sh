#!/bin/sh
r.js -o build/app.build.js;
cd ../dist/;
rm -r css/custom.css;
rm -r scripts/collections;
rm -r scripts/models;
rm -r scripts/views;
rm -r scripts/vendor/*;
cp -R ../app/scripts/vendor/requirejs scripts/vendor/. ;
rm -r build;
