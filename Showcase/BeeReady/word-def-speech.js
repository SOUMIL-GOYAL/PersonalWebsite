if(localStorage.getItem("Correct-Words") == null){
  var cArray = [];
}else{
  var cArray = JSON.parse(localStorage.getItem("Correct-Words"));
}

let generatedWord = '';
var words = [];

function hardwords(){
    words = document.getElementById("hard").textContent.trim().split(" , ");
    generateWord();
}

function mediumwords(){
    words = document.getElementById("medium").textContent.trim().split(" , ");
    generateWord();
}

function easywords(){
    words = document.getElementById("easy").textContent.trim().split(" , ");
    generateWord();
}

function generateWord() {
  // Generate a random word from the array
  generatedWord = words[Math.floor(Math.random() * words.length)];
  callWord();
  let clear = document.getElementById("textbox").value = '';
  document.getElementById("textbox").style.backgroundColor = "white";  
  return clear;
}

document.getElementById('selection').addEventListener("change", function() {
  if (this.value == "1") {
    easywords();
  }else if (this.value == "2"){
    mediumwords();
  }else{
    hardwords();
  }
});

function correctarray(cWord){
  cArray.unshift(cWord.replace(/'/g, ''));
  localStorage.setItem("Correct-Words", JSON.stringify(cArray));
  console.log(localStorage.getItem("Correct-Words"));
  history();
}

function inputLower(){
  //console.log('inputLower function called'); // Add this line to check if the function is being called
  let input = document.getElementById("textbox").value;
  let iStr = input.toString();
  //console.log(input);
  const lowerInput = iStr.toLowerCase();
  genwordLower(lowerInput);
}

function genwordLower(lowerInput){
  const normalizedWord = generatedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const lowernorm = normalizedWord.toLowerCase();
  const matchlowernorm = lowernorm.replace(/'/g, '');
  matching(matchlowernorm, lowerInput);
}

function matching(matchlowernorm, lowerInput){
  //console.log(lowerInput, matchlowernorm);
  if (lowerInput === matchlowernorm){
    correctarray(generatedWord);
    generateWord();
    let clear = document.getElementById("textbox").value = '';
    document.getElementById("textbox").style.backgroundColor = "white";
    return clear;
  }
  else{
    let red = document.getElementById("textbox").style.backgroundColor = "lightcoral";
    return red
  }
}

function callWord(){
  // Call the text-to-speech function with the generated word as input
  speak(`The word is `, 1);
  speak(`${generatedWord}`, document.getElementById("adjustspeed").value);
}

function getDefinition() {
  NewgeneratedWord = generatedWord.replace(/'/g, '');
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${NewgeneratedWord}`)
    .then(response => response.json())
    .then(data => {
      try {
        var definition = data[0].meanings[0].definitions[0].definition;
        speak(`The definition of ${generatedWord} is: ${definition}`, document.getElementById("adjustspeed").value);
      } catch {
        speak(`Sorry, the definition of ${generatedWord} is unavailable`, document.getElementById("adjustspeed").value);
      }
      console.log(definition);
    })
}

// Function to convert text to speech using the Web Speech API
function speak(text, rate) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // Set the rate of speech
  synth.speak(utterance);
}

function history(){
    var dataLegnth = cArray.length;
    document.getElementById("history").innerHTML = "";
    //historyText = document.getElementById("history").textContent
    for (i in cArray){
      document.getElementById("history").innerHTML += "<div class='historyWord'><i class='fa-solid fa-check check'></i><p>"+cArray[i]+"</p></div>";
    }
}

history();

easywords();
