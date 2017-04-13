// libraries
window.angular = require('../node_modules/angular');
window.jQuery = require('../node_modules/jquery/dist/jquery');
window.$ = jQuery;
window.g_blurnav = require('./blurnav.js');
    //for custom scrollbars//
require('jquery-mousewheel')($);
require('./jquery.mCustomScrollbar')($);
require('./scrollbars.min');
    //********************//
require('../node_modules/angular-animate/angular-animate.js');
require('../css/bootstrap.css');
require('../css/font-awesome.css');
require('../node_modules/animate.css/animate.css');
require('../node_modules/bootstrap/dist/js/bootstrap');
require('../node_modules/angular-sanitize');
require('../node_modules/angular-ui-router');

// godwin's scripts
//style sheets
require('../css/globals.css');
require('../css/login.css');
require('../css/classroom.css');
require('../css/classes.css');
require('../css/exams.css');
require('../css/configure.css');
require('../css/jquery.mCustomScrollbar.css');

// angular module initiater
require('./app.controller.js');
require('./config');

//services
require('./auth.service');
require('./smooth_scroll.service');
//require('./blur.service');

//directives
require('./app.directive');
require('./shortname.directive');
require('./orientation.directive');
require('./watch_changes.directive');
//require('./class_options.directive');

//filters
require('./fish_object.filter');

//controllers
require('./login.controller');
require('./signup.controller');
require('./classroom.controller');
require('./classes.controller');
require('./exams.controller');
require('./configure.controller');