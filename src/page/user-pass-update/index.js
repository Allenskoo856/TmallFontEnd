'use strict';


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');


// page 逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-pass-update'
        });

    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    password: $.trim($('#password').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },

    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }

        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '长度不得少于六位';
            return result;
        }

        if (formData.passwordNew !== formData.passwordConfirm) {
            console.log(formData.passwordNew + '::' + formData.passwordConfirm);
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;

    },

    loadUserinfo: function () {

        _user.getUserInfo(function (res) {

        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    }
};


$(function () {
    page.init();
});