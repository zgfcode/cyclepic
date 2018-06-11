// 获取操作元素
var picborder = document.getElementById('picborder');
var cyclicarea = document.getElementById('cyclicarea');
var oDivs = cyclicarea.getElementsByTagName('div');
// 获取焦点
var nowpic = document.getElementById('nowpic');
var oLis = nowpic.getElementsByTagName('li');

// 获取左右切换按钮
var toLeft = document.getElementById('toLeft');
var toRight = document.getElementById('toRight');


// 平移到 第二张
// 一屏1200
// 2 left 1 * -1200   -1200
// 3 left 2 * -1200   -2400
//
// 当前图片索引* 负的 一屏1200 就是向左要偏移的位置


// 第一次 要由第一张平移到到二张 step = 1
// step * -1200 -1200
// 第二次 要由第二张平移到到三张 step = 2
// step * -1200 -2400

var length = oDivs.length;

// 获取picborder展示区域宽度
var wid = picborder.clientWidth;
// console.log(wid);
var step = 0; // 记录当前索引
// 执行轮播  4
var timer = setInterval(autoMove, 3000);

function autoMove(n) {
    step++; // 1
    // 点我点击时候 将对应索引传递进来 赋给n 让step偏移的索引 = n 否则什么也不做 让step 变成我点击的那个li的索引 然后进行平移
    typeof n != "undefined" ? step = n : null;


    if (step > length - 1) { // 如果step大于最后一张索引（当最后一张执行完动画时，再继续平移时 立马变成第一张然后 紧接着平移出来第二张 ） 让left立马为0 回到第一张 （最后一张和第一张一模一样）
        utils.css(cyclicarea, 'left', 0); // 立马变成第一张
        step = 1;// 紧接着从第二张开始
    }
    moveAnimate({
        ele: cyclicarea, // 执行元素
        target: { // left偏移 当前图片索引 * -wid
            left: step * -wid
        },
        // effect: 2,
        duration: 300
    });
    // 同步 焦点选中
    changenowpic(step);
}

// 焦点选中
function changenowpic(n) {
    n >= length - 1 ? n = 0 : null;
    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i];
        i === n ? utils.addClass(cur, 'selected') : utils.removeClass(cur, 'selected')
    }
}

for (var i = 0; i < oLis.length; i++) {
    var cur = oLis[i];
    cur.ind = i;
    cur.onclick = function () {
        autoMove(this.ind);

        //     moveAnimate({
        //         ele: cyclicarea,
        //         target:{
        //             left: this.ind * -wid
        //         },
        //         duration: 300
        //     });
        //     changenowpic(this.ind);
        //     step = this.ind;
    }
}

// picborder 滑入 停止轮播
picborder.onmousemove = function () {
    // 滑入 显示 左右切换
    toLeft.style.display = toRight.style.display = 'block';
    clearInterval(timer);
};

// picborder 滑出 继续轮播
picborder.onmouseout = function () {
    // 滑出 隐藏 左右切换
    toLeft.style.display = toRight.style.display = 'none';
    timer = setInterval(autoMove, 3000);
};
toRight.onclick = function () {
    autoMove();
};
toLeft.onclick = function () {
    step--;
    if (step === -1) { // 当到达第一张后 在继续减减时 立马让cyclicarea平移到和第一张一模一样的那个 图片那
        utils.css(cyclicarea, 'left', (length - 1) * -wid);
        // 紧接着让动画从到数第二张开始
        step = length - 2
    }
    moveAnimate({
        ele: cyclicarea,
        target: {
            left: step * -wid
        },
        duration: 300
    });
    changenowpic(step);
};