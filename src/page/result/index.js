


'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.result-con' + '.' + type + '-success');
    // 显示对应的提示元素
    $element.show('normal', 'linear');
})