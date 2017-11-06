//import webpack from 'webpack';
//import path from 'path';

var path = require("path");

var config = {
    entry: "./frontend/src/app.js",
    output: {
        path: __dirname + "/frontend/build",
        filename: "bundle.js"
    }
};

module.exports = config;
