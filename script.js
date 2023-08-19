$(document).ready(function() {
    if (!$("#cloudcanvas").tagcanvas({
            textColour: "",
            textFont: "",
            textHeight: 30,
            // outlineColour: "transparent",
            reverse: true,
            depth: 0.7,
            maxSpeed: 0.075,
            // weight: true,
            clickToFront: 500,
            decel: .5,
            initial: [.5, 0],
            radiusX: 1,
            radiusY: 1,
            txtScale: 1,
            zoom: .9,
            pinchZoom: true,
            outlineMethod: 'colour',
            outlineColour: 'tagbg',


        }, "tags")) {
        // something went wrong hide the canvas container,
        // $("#cloudcanvascontainer");
    }
});

sizelistcol();
makelistcolpositions();
makesizeinachieve();
makeskillsize()


function resizeCanvas() {
    var container = document.getElementById("skillscanvascontainer");
    var canvas = document.getElementById("cloudcanvas");
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();

$(window).on('resize', function() {
    resizeCanvas();

    sizelistcol();
    makelistcolpositions();
    makesizeinachieve();


    makeskillsize()
});

$("#cloudcanvas").on("mouseleave", function() {
    $(this).tagcanvas("setspeed", [0.5, 0]);
});

$("#cloudcanvas a").each(function() {
    var currentlink = $(this);
    currentlink.on("click", function(e) {
        e.preventDefault();
        $("#skillsdetailscontainer .shown").removeClass("shown");
        var reference = currentlink.attr("href");
        $(reference).addClass("shown");
    });
});

$(".skillcard").each(function() {
    var currentcard = $(this);
    currentcard.on("mouseover", function() {
        currentcard.css({ "box-shadow": "0 0 10px " + currentcard.attr("hovercolor") });
        currentcard.find("i").css({ "color": currentcard.attr("hovercolor") });
    });
    currentcard.on("mouseleave", function() {
        currentcard.css({ "box-shadow": "" });
        currentcard.find("i").css({ "color": "" });
    });
    currentcard.click(function() {
        currentcard.toggleClass("flipped");
    });
    //currentcard.children(".cardfront")[0].css({ "box-shadow": "0 0 3px " + currentcard.attr("hovercolor") });
})

function pulse(thecard) {
    thecard.animate({

    });
}

function makeskillsize() {
    console.log("" + ($('.skillsdetail.shown').position().top + $(".skillsdetail.shown").height()));
    $("#skills").css({ "height": "" + ($('.skillsdetail.shown').offset().top + $(".skillsdetail.shown").height() - $("#skills").offset().top) });
    aligncovers();
}



//ACHIEVEMENTS SECTION
function makesizeinachieve() {
    var all = document.getElementsByClassName("list-column");
    var numperrow = calnumlistcol();
    if (numperrow == 1) {
        var totalheight = 0;
        for (var i = 0; i < all.length; i = i + numperrow) {
            totalheight += all[i].clientHeight;
        }
        document.getElementById("achieve").style.height = totalheight + 20 + "px";
    } else if (numperrow == 2) {
        var totalheight0 = 0;
        var totalheight1 = 0;
        for (var i = 0; i < all.length; i = i + numperrow) {
            totalheight0 += all[i].clientHeight;
        }
        for (var i = 1; i < all.length; i = i + numperrow) {
            totalheight1 += all[i].clientHeight;
        }
        if (totalheight0 >= totalheight1) {
            document.getElementById("achieve").style.height = totalheight0 + 20 + "px";
        }
        if (totalheight1 > totalheight0) {
            document.getElementById("achieve").style.height = totalheight1 + 20 + "px";
        }
    }
}

function calnumlistcol() {
    if (window.innerWidth >= 992) {
        return 2;
    } else if (window.innerWidth < 992) {
        return 1;
    }
}

function sizelistcol() {
    var numperrow = calnumlistcol();
    var w = $("#achievements").width();

    var them = document.getElementsByClassName("list-column");
    var available = w / numperrow;
    var realwidth = available - 10;
    for (var g = 0; g < them.length; g++) {
        them[g].style.width = realwidth + "px";
    }
    return available;
}

function makelistcolpositions() {
    var heightadd = 0;
    var width = sizelistcol();
    var numperrow = calnumlistcol();
    var theshown = document.getElementsByClassName("list-column");
    for (var u = 0; u < theshown.length; u++) {
        if (u % numperrow == 0) {
            if (u == 0) {
                theshown[u].style.position = "absolute";
                theshown[u].style.top = "0";
                theshown[u].style.left = "0";
            } else {
                theshown[u].style.position = "absolute";
                heightadd = 0;
                for (
                    var total = u / numperrow, done = u, counter = 0; counter < total; counter++, done = done - numperrow
                ) {
                    heightadd += theshown[done - numperrow].clientHeight + 10;
                }
                theshown[u].style.top = heightadd + "px";
                theshown[u].style.left = "0";
            }
        }

        if (u % numperrow == 1) {
            if (u == 1) {
                theshown[u].style.position = "absolute";
                theshown[u].style.top = 0;
                theshown[u].style.left = width + "px";
            } else {
                theshown[u].style.position = "absolute";
                heightadd = 0;
                for (
                    var total = Math.floor(u / numperrow), done = u, counter = 0; counter < total; counter++, done--
                ) {
                    heightadd += theshown[done - numperrow].clientHeight + 10;
                }
                theshown[u].style.top = heightadd + "px";
                theshown[u].style.left = width + "px";
            }
        }
    }
}