'use strict';

var _mm = require('util/mm.js');

var _payment = {

    getPaymentInfo : function (orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data : {
                orderNo : orderNo
            },
            success: resolve,
            error: reject
        });
    },

    getPaymentStatus : function (orderNo ,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data : {
                orderNo : orderNo
            },
            success: resolve,
            error: reject
        });
    }
};


module.exports = _payment;