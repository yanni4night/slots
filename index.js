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

function shuffle(arr, size) {
    if (!size) {
        size = arr.length;
    }
    var tmp = arr.slice();
    var ret = [];
    while (tmp.length && ret.length < size) {
        var index = Math.random() * tmp.length | 0;
        ret.push(tmp[index]);
        tmp.splice(index, 1);
    }
    return ret;
}

var spm = ['胡蓉', '第一帅'];
var pm = ['佳薇', '刘媛', '刘赫', '张鹤', '吴朦'];
var po = ['阿哥', '铁牛'];
var poss = ['铁马', '五爷', '六婊', '倪倪', '小曼', '夹夹', '玛丽', '小兰',
    '闻静', '小贝', '菜菜', '晓丹', '峰姐', '海洋', '铁柱', '小海', '底迪', '赵祎', '庆庆', '小花', '李鹏', '陈梦', '雨探', '小饱', '阿毛', '蛋蛋',
    '小熊', '静宁', '杨老师', '大师兄'
];

var names = shuffle(spm.concat(pm).concat(po).concat(poss));

var index = 0;
var sb = function (name) {
    return $('<div/>').text(name).addClass('item').attr('data-name', name).attr('data-index', index++);
};

var $names = [];

for (var i = 0; i < 1; ++i) {
    $names = $names.concat(names.map(sb));
}

$('.container').append($names);

function to(name, done) {
    var target = $('[data-name="' + name + '"]').last();
    var height = +target.attr('data-index') * 100;

    target.siblings().removeClass('on').end().addClass('on');

    new Promise(function (resolve) {
        $('.container').css('top', 0).animate({
            top: -height
        }, 1500, 'easeOutElastic', function () {
            resolve($('.xcon').position());
        });
    }).then(function (pos) {
        var $li = $('<li/>').addClass('groupli').text(name).appendTo($(document.body));

        $li.css({
            position: 'fixed',
            left: pos.left,
            top: pos.top
        });

        var $holder = $('<li/>').addClass('groupli');
        $holder.appendTo($('.group'));

        $li.animate({
            left: $holder.position().left,
            top: $holder.position().top
        }, 'slow', function () {
            $li.css('position', 'static');
            $holder.replaceWith($li);
            done();
        });
    });

}

function toPrize(name) {
    var target = $('[data-name="' + name + '"]').last();
    var height = +target.attr('data-index') * 100;

    new Promise(function (resolve) {
        $('.container').css('top', 0).animate({
            top: -height
        }, 1500, 'easeOutElastic', function () {
            resolve();
        });
    }).then(function () {
        $('.dialog').find('h1').text(name).end().show();
    });
}

var total = 0;
var groupNames;

function select() {
    if (!groupNames) {
        var pmSize = pm.length;
        groupNames = pm.slice().concat(shuffle(poss, 20 - pmSize));
        groupNames = shuffle(groupNames, groupNames.length);
    }
    total--;
    var name = groupNames.shift();
    to(name, function () {
        if (total) {
            select();
        }
    });
}


var prizeNames;

$(document).on('click', '.do-group', function (e) {
    e.preventDefault();
    if (!total) {
        total = 20;
        groupNames = null;
        $('.group').empty();
        select();
    } else {
        console.log('forbidden');
    }
}).on('click', '.do-prize', function (e) {
    e.preventDefault();
    if (!total) {
        if (!prizeNames) {
            prizeNames = shuffle(names);
        }
        var name = prizeNames[0] || '已经没有人了';
        toPrize(name, function () {});
    } else {
        console.log('forbidden');
    }
}).on('click', '.dialog .buttons .get', function () {
    prizeNames.shift();
    $('.dialog').hide();
}).on('click', '.dialog .buttons .giveup', function () {
    $('.dialog').hide();
});