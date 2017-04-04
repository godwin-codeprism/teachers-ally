// libraries
window.angular = require('../node_modules/angular');
window.jQuery = require('../node_modules/jquery/dist/jquery');
window.$ = jQuery;
window.g_blurnav = require('./blurnav.js');
require('../node_modules/angular-animate/angular-animate.js');
require('../css/bootstrap.css');
require('../css/font-awesome.css');
require('../node_modules/animate.css/animate.css');
require('../node_modules/bootstrap/dist/js/bootstrap');
require('../node_modules/angular-sanitize');
require('../node_modules/angular-ui-router');

// godwin's scripts
require('../css/globals.css');
require('../css/login.css');
require('../css/classroom.css');
require('../css/classes.css');
require('../css/exams.css');
require('./app.controller.js');
require('./config');
require('./login.controller');
require('./signup.controller');
require('./classroom.controller');
require('./classes.controller');
require('./exams.controller');
//require('./blur.service');
require('./auth.service');
require('./app.directive');
require('./shortname.directive');
require('./orientation.directive');
require('./watch_changes.directive');
//require('./class_options.directive');
require('./fish_object.filter');