/**
 * Copyright (C) 2014 yanni4night.com
 * index.js
 *
 * changelog
 * 2015-12-21[22:12:01]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
var names = ['佳薇', '刘媛', '胡蓉', '第一帅', '刘赫', '张鹤', '吴朦', '铁牛', '铁马', '五爷', '六婊', '倪倪', '小曼', '夹夹', '阿哥', '玛丽', '小兰', '闻静', '小贝', '菜菜', '晓丹', '峰姐', '海洋', '铁柱', '小海', '底迪', '赵祎', '庆庆', '小花', '李鹏', '陈梦', '雨探', '小饱', '阿毛', '蛋蛋', '小熊', '静宁', '杨老师', '大师兄'];
var index = 0;
var sb = function(name) {
    return $('<div/>').text(name).addClass('item').attr('data-name', name).attr('data-index', index++);
};

var $names = [];

for (var i = 0; i < 5; ++i) {
    $names = $names.concat(names.map(sb));
}

$('.container').append($names);

function to(name) {
    var target = $('[data-name="' + name + '"]').last();
    var height = +target.attr('data-index') * 100;
    $('.container').css('top', 0).animate({
        top: '-' + height + 'px'
    },5e3,'easeOutElastic');
}