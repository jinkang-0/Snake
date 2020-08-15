var theme = localStorage.getItem("theme");

var score = 0;
var highScore = 0;

// settings
var frameRate = 10;
var worldSize = 16;

function init() {

  if (theme) {

    document.body.className = theme;
  
    if (theme == "light") {
      document.getElementById("theme-switch").classList.replace("fa-sun", "fa-moon");
    }
  
  } else {
    localStorage.setItem("theme", "dark");
  }

}

function changeTheme() {

  if (theme == "dark") {
    theme = "light";
    document.getElementById("theme-switch").classList.replace("fa-sun", "fa-moon");
    document.body.className = "light";
  } else if (theme == "light") {
    theme = "dark";
    document.getElementById("theme-switch").classList.replace("fa-moon", "fa-sun");
    document.body.className = "dark";
  }

  localStorage.setItem("theme", theme)

}

function updateSettings() {
  document.getElementById("frameRate").blur();
  document.getElementById("worldSize").blur();

  frameRate = parseInt(document.getElementById("frameRate").value);
  worldSize = parseInt(document.getElementById("worldSize").value) * 2;

  document.getElementById("frameRate-val").innerHTML = `${frameRate}`;
  document.getElementById("worldSize-val").innerHTML = `${worldSize}x${worldSize}`;

  setup();
}

function updateScore() {
  score++;
  if (score > highScore) highScore++;
  document.getElementById("score").innerHTML = score;
  document.getElementById("high-score").innerHTML = highScore;
}

function resetScore() {
  score = 0;
  document.getElementById("score").innerHTML = score;
}

function winGame() {
  document.getElementById("win-text").style.display = "block";
}