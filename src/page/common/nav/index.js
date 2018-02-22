/*
* @Author: Administrator
* @Date:   2017-06-08 09:52:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-10 22:26:51
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//导航

var nav = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        // this.loadCartCount();
    },
    bindEvent: function () {
        //登录点击事件
        $('.js-login').click(function () {
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {

            });
        });


    },
    //加载用户信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide();
            $('.user.login').show().find('.username').text(res.username);
            console.log(res);
        }, function (errMsg) {
            console.log(errMsg);
        });
    },
    loadCartCount: function () {

    }

};
module.exports = nav.init();