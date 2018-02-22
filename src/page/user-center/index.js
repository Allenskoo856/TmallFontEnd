'use strict';


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var temperateIndex = require('./index.string');


// page 逻辑部分
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserinfo();
    },
    loadUserinfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(temperateIndex, res)
            $('.panel-body').html(userHtml);

        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    }
};


$(function () {
    page.init();
});