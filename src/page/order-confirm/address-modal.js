

'use strict';


var _mm                     = require('util/mm.js');
var _order                  = require('service/order-service.js');
var _Address                = require('service/address-service.js');
var templateAddressModal    = require('./address-modal.string');
var _cities                 = require('util/cities/index.js');


var addressModal = {
    show : function (option) {
        // 绑定参数
        this.option = option;
        this.option.data = option.data || {};
        this.modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    // 关闭弹窗
    hide : function () {
        this.modalWrap.empty();
    },
    bindEvent : function () {
        var _this = this;
        // 省份和城市的二级联动
        this.modalWrap.find('#receiver-province').change(function () {
            var selectProvince = $(this).val();
            _this.loadCity(selectProvince);
        });

        // 提交收货地址
        this.modalWrap.find('.address-btn').click(function () {
            var receiverInfo    = _this.getReceiverInfo(),
                isUpdate        = _this.option.isUpdate;
            // 使用新地址且验证通过
            if (!isUpdate && receiverInfo.status) {
                _Address.save(receiverInfo.data, function (res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
                // 更新收件人且验证通过
            }else if (isUpdate && receiverInfo.status) {
                _Address.update(receiverInfo.data, function (res) {
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了!!!');
            }
        });

        // 保证点击modal内容区域的时候不关闭弹窗
        this.modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        });
        // 关闭弹窗
        this.modalWrap.find('.close').click(function () {
            _this.hide();
        });
    },

    loadModal : function () {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate    : this.option.isUpdate,
            data        : this.option.data
        });
        this.modalWrap.html(addressModalHtml);
        // 加载身份;
        this.loadProvince();

    },
    loadProvince : function () {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 如果是更新地址, 并且有省份信息, 做省份的回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            // 加载城市
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    // 加载城市信息
    loadCity : function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新地址, 并且有城市信息, 做城市的回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }

    },
    // 获取select款的选项, 输入数组 输出html
    getSelectOption : function (optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i <length; i++) {
            html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>'
        }
        return html;
    },
    // 获取表单收件人的信息,并且做表单的验证
    getReceiverInfo : function () {
        var receiverInfo = {},
            result       = {
                status : false
            };
        receiverInfo.receiverName           = $.trim(this.modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince       = $.trim(this.modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity           = $.trim(this.modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone          = $.trim(this.modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress        = $.trim(this.modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip            = $.trim(this.modalWrap.find('#receiver-zip').val());

        if (this.option.isUpdate) {
            receiverInfo.id        = $.trim(this.modalWrap.find('#receiver-id').val());
        }
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人信息';
        }else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入收件人省份';
        }else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入收件人城市';
        }else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        }else if (!_mm.validate(receiverInfo.receiverPhone, 'phone')) {
            result.errMsg = '电话验证错误,请输入正确的电话号码!';
        }else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
};

module.exports = addressModal;