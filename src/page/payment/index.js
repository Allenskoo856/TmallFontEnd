'use strict';


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm = require('util/mm.js');
var _payment = require('service/payment.js');
var temperateIndex = require('./index.string');


// page 逻辑部分
var page = {

    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();

    },

    onLoad: function () {

        // 加载detail 数据
        this.loadPaymentInfo();
    },


    // 加载支付订单列表
    loadPaymentInfo: function () {
        var paymentHtml = '',
            _this = this,
            $Con = $('.page-wrap');
        $Con.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber, function (res) {
            paymentHtml = _mm.renderHtml(temperateIndex, res);
            $Con.html(paymentHtml);
            _this.listenOrderStatus();
        }, function (errMsg) {
            $Con.html('<p class="err-tip">' + errMsg + '</p>');
        });

    },

    listenOrderStatus : function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res === true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function (errMsg) {

            });
        }, 5e3)
    }
};

$(function () {
    page.init();
});
