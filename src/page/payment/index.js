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
        this.loadDetail();
    },


    // 加载订单列表
    loadDetail: function () {
        var orderDetailHtml = '',
            _this = this,
            $Con = $('.content');
        $Con.html('<div class="loading"></div>');


    }
};

$(function () {
    page.init();
});
