// 沙箱模式（自执行函数）
(function(doc, win) {
    // 赋值为了减少变量的搜索过程
    var docEl = doc.documentElement,
        // 重置事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);