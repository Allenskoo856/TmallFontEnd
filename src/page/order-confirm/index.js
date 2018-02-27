'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm                 = require('util/mm.js');
var _order              = require('service/order-service.js');
var _Address            = require('service/address-service.js');
var templateAddress     = require('./address-list.string');
var templateProduct     = require('./product-list.string');



var page = {
    data : {
        selectedAddressID : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        // 加入购物车
        $(document).on('click', '.cart-add', function () {
            _car.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val(),

            }, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            })
        })

    },
    // 加载list数据
    loadDetail : function(){

    },
    // 加载地址列表
    loadAddressList :function (data) {
        var _this = this;
        _Address.getAddressList(function (res) {
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败, 请刷新后重试</p>');
        })
    },

    loadProductList : function () {
        var _this = this;
        _order.getProductList(function (res) {
            var ProductListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(ProductListHtml);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息失败, 请刷新后重试</p>');
        })
    }
};


$(function(){
    page.init();
})