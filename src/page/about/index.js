'use strict';


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');




// page 逻辑部分
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        navSide.init({
            name: 'about'
        });
    }
};


$(function () {
    page.init();
});