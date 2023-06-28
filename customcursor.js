const cursor = $("#customcursor");
var x, y, width, height, iw, ih, xvel, yvel, ex, ey, mousex, mousey;

var kp = 1;
var ki = 0;

var lastx = 0;
var lasty = 0;
var eix = 0;
var eiy = 0;
var lastscrollx = 0;
var lastscrolly = 0;

function mousehandler(e) {
    if (typeof(e.pageX) !== "number") {
        mousex += window.scrollX - lastscrollx;
    } else {
        mousex = e.pageX;
    }
    if (typeof(e.pageY) !== "number") {
        mousey += window.scrollY - lastscrolly;
    } else {
        mousey = e.pageY;
    }

    width = cursor.outerWidth(true);
    height = cursor.outerHeight(true);

    iw = $(document).innerWidth();
    ih = $(document).innerHeight();

    ex = mousex - lastx;
    ey = mousey - lasty;

    eix += ex;
    eiy += ey;

    x = ex * kp + eix * ki + lastx;
    y = ey * kp + eiy * ki + lasty;

    if (x + width > iw) {
        x = iw - width;
    }
    if (x < 0) {
        x = 0;
    }
    if (y + height > ih) {
        y = ih - height;
    }
    if (y < 0) {
        y = 0;
    }


    cursor.css({ left: x, top: y });

    lastx = x;
    lasty = y;
    lastscrollx = window.scrollX;
    lastscrolly = window.scrollY;
}

$(document).on("mousemove", function(e) {
    mousehandler(e);
});
$(window).scroll(function(e) {
    mousehandler(e);
});