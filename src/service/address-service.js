'use strict';

var _mm = require('util/mm.js');

var _Address = {
    // 获取商品列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 新疆收件人
    save : function (addressInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取单条地址信息
    getAddress : function (shippingId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId  : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人地址
    update : function (addressInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteAddress : function (shippingId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId  : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _Address;