
'use strict';


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var temperateIndex  = require('./index.string');


// page 逻辑部分
var page = {

    data  : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function () {
         this.onLoad();
        this.bindEvent();
    },

    bindEvent : function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {

            if (window.confirm('确实要取消该订单吗?')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        })
    },

    onLoad: function () {
        navSide.init({
            name: 'order-list'
        });
        // 加载detail 数据
        this.loadDetail();
    },


    // 加载订单列表
    loadDetail : function () {
        var orderDetailHtml     = '',
            _this               = this,
            $Con                = $('.content');
        $Con.html('<div class="loading"></div>');

        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.filterData(res);
            orderDetailHtml = _mm.renderHtml(temperateIndex, res);
            $Con.html(orderDetailHtml);
        }, function (errMsg) {
            $Con.html('<p class="err-tip">' + errMsg + '</p>');
            console.log(errMsg);
        });
    },

    filterData : function (data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }

};

$(function () {
    page.init();
});
