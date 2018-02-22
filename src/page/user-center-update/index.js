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
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserinfo();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    phone: $.trim($('#phone').val()),
                    email: $.trim($('#email').val()),
                    question: $.trim($('#question').val()),
                    answer: $.trim($('#answer').val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res) {
                    _mm.successTips(res.msg);
                    window.location.href = './user-center.html';
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
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机格式不正确';
            return result;
        }

        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱的格式不正确';
            return result;
        }

        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题的答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;

    },

    loadUserinfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(temperateIndex, res);
            $('.panel-body').html(userHtml);

        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    }
};


$(function () {
    page.init();
});