//TYPING IN HOME
var typeIndex = 0;
var typeWordIndex = 0;
var final = "";
var typingList = [
    "Puzzle Solver",
    "Math-lover",
    "Brother",
    "Thinker",
    "Programmer",
    "Sportsman",
    "Inquirer",
    "Communicator",
    "Builder"
];
var backspacing = false;
var myVar = setInterval(function() {
    if (typeIndex >= typingList.length) {
        typeIndex = 0;
    }
    if (typeWordIndex >= typingList[typeIndex].length) {
        typeIndex = typeIndex + 1;
        typeWordIndex = 0;
        backspacing = true;
    }
    var currentWord = typingList[typeIndex];
    if (backspacing == false) {
        final = final + currentWord[typeWordIndex];
        document.getElementById("test").innerHTML = final;
        typeWordIndex++;
    }
    if (backspacing == true) {
        final = final.slice(0, final.length - 1);
        document.getElementById("test").innerHTML = final;
        if (final.length == 0) {
            backspacing = false;
        }
    }
}, 200);