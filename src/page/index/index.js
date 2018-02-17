"use strict";

var _mm = require('util/mm.js');

console.log(_mm.getUrlParam('test'));

var html = '<div>{{data}}</div>';
var data = {
    data : 123
};

console.log(_mm.renderHtml(html, data));

