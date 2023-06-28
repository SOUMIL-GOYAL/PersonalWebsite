const cursor = $("#customcursor");
var x, y, width, height, iw, ih, xvel, yvel, ex, ey;

var kp = 1;
var ki = 0;

var lastx = 0;
var lasty = 0;
var eix = 0;
var eiy = 0;

$(document).on("mousemove", function(e) {
    width = cursor.outerWidth(true);
    height = cursor.outerHeight(true);

    iw = window.innerWidth;
    ih = window.innerHeight;

    ex = e.pageX - lastx;
    ey = e.pageY - lasty;

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
});