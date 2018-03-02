'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var  addressModal = require('./address-modal.js');

var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _Address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');


var page = {
    data: {
        selectedAddressID: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;

        // 地址的选择
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressID = $(this).data('id');
        });

        // 订单的提交
        $(document).on('click', '.order-submit', function () {
            var shipingId = _this.data.selectedAddressID;
            if (shipingId) {
                _order.createOrder({
                    shipingId : shipingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }else {
                _mm.errorTips('请选择地址之后再提交');
            }
        });

        //地址的添加
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate    : false,
                onSuccess   : function () {
                    _this.loadAddressList();
                }
            });
        });

        //地址的编辑
        $(document).on('click', '.address-update', function () {
            var shippingId = $(this).parents('.address-item').data('id');
            _Address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function () {
                        _this.loadAddressList();
                    }
                });
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            })

        });


    },
    // 加载list数据
    loadDetail: function () {

    },
    // 加载地址列表
    loadAddressList: function (data) {
        var _this = this;
        _Address.getAddressList(function (res) {
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败, 请刷新后重试</p>');
        })
    },

    loadProductList: function () {
        var _this = this;
        _order.getProductList(function (res) {
            var ProductListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(ProductListHtml);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息失败, 请刷新后重试</p>');
        })
    }
};


$(function () {
    page.init();
})