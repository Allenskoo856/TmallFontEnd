'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {

    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },

    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },

    loadStepUsername: function () {
        $(".step-username").show();
    },
    loadStepQuestion: function () {
        formError.hide();
        $(".step-username").hide();
        $('.step-question').show().find('.question').text(this.data.question);

    },
    loadStepPassw: function () {
        formError.hide();
        $(".step-question").hide()
            .siblings('.step-password').show();

    },
    bindEvent: function () {
        var _this = this;
        // 登录按钮的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show("请输入用户名");
            }
        });

        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassw();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show("请输入密码提示问题的答案");
            }
        });

        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token

                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show("请输入不少于6为数字的新密码");
            }
        });

    }

};


$(function () {
    page.init();
});
