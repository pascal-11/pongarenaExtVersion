//Nimmt unser hintergrund mit der genannten ID
var hintergrund = document.getElementById("Rasen");

//Mit getContext können 2d Objekte gezeichnet werden
var kontext = hintergrund.getContext("2d");

//Liste für unsere, aus dem Kosntruktor, erstellen Objekte
var objektListe = [];

var punkteSP1 = 0;
var punkteSP2 = 0;
var runde = 0;



// Konstruktor für rechteckige Objekte
var Rechteck = function (xAchse, yAchse, width, height, geschwX, geschwY) {

  this.xAchse = xAchse;

  this.yAchse = yAchse;

  this.width = width;

  this.height = height;

  this.geschwX = geschwX

  this.geschwY = geschwY



  objektListe.push(this); //fügt jedes erstelle Objekt am Array-Ende ein
};

// Funktion um unsere Objekte zeichnen zu können
Rechteck.prototype.zeichnen = function () { //mit .prototype kann unseren "Objekten" zusätzliche Attribute zu denen im Konstruktor mitgegeben werden

  //fillRect ermöglicht uns das zeichen von Elementen mit Angaben zur X und Y Achse, sowie Höhe, Breite und Geschwindigkeit
  kontext.fillRect(this.xAchse, this.yAchse, this.width, this.height, this.geschwX, this.geschwY);
};


/* Funktion um den Ball wieder von der Mitte aus starten zu lassen,
in entgegengesetzter Richtung, zu der er das Spielfeld verlassen hat */
function Anstoss() {
  ball.xAchse = hintergrund.width / 2;
  ball.yAchse = hintergrund.height / 2;
  ball.geschwX = -ball.geschwX;
  ball.geschwY = -ball.geschwY;
}

//Funktion für die Bewegung und das Kollisionsverhalten
Rechteck.prototype.bewegen = function () {


  //Verändert den x und y Achsen-Wert, um eine "Bewegung zu erhalten"
  this.xAchse = this.xAchse + this.geschwX;
  this.yAchse = this.yAchse + this.geschwY;

  if (ball.yAchse > hintergrund.height - 5) {
    ball.geschwY = -ball.geschwY;
  }

  if (ball.yAchse < 5) { //durch "< 5" anstatt "< 0" wird das Clippen des Balls in den Spieler minimiert
    ball.geschwY = -ball.geschwY;
  }

  //Trifft der Ball den Spieler, wird seine Geschwindigkeit invertiert
  if (ball.xAchse + 5 > hintergrund.width) {
    if (ball.yAchse > spieler2.yAchse &&
      ball.yAchse < spieler2.yAchse + 80) { //80 ist die Spielerhöhe
      ball.geschwX = -ball.geschwX;


      // Wird der Ball nicht getroffen, wird die Anstossfunktion ausgelöst
    } else {
      Anstoss();
      runde++;
      punkteSP1++;
    }
  }

  if (ball.xAchse < 5) {
    if (ball.yAchse > spieler1.yAchse &&
      ball.yAchse < spieler1.yAchse + 80) { //80 ist die Spielerhöhe
      ball.geschwX = -ball.geschwX;

    } else {
      Anstoss();
      runde++;
      punkteSP2++;

    }
  }

};


// Objekte die wir zeichnen

var ball = new Rechteck(300, 200, 10, 10, -2, -2);

// Spieler1 = linker Spieler; Spieler2 = rechter Spieler
var spieler1 = new Rechteck(5, 180, 5, 80, 0, 0);
var spieler2 = new Rechteck(595, 180, 5, 80, 0, 0);


//Spielersteuerung
//Spieler1 (W und S)

//JS bietet einem die Möglichkeit eine Funktion auszulösen, sobald eine Taste gedrückt wird
window.onkeydown = function (druecken) {


  // Jede Taste besitzt einen KeyCode (Hier W = 87 und S = 83)
  if (druecken.keyCode == 87) {
    spieler1.geschwY = -3; // Hier wird die Geschwindigkeit des Spielers festgelegt

  }

  if (druecken.keyCode == 83) {
    spieler1.geschwY = 3;

  }

  if (druecken.keyCode == 38) {
    spieler2.geschwY = -3;

  }

  if (druecken.keyCode == 40) {
    spieler2.geschwY = 3;
  }
}

/* Damit die Spieler nicht unendlich lange nach oben und unten "fahren",
muss man die y-Achsen Geschwindigkeit auf 0 setzten, sobald die Steuerungstasten
losgelassen werden */

//
window.onkeyup = function (loslassen) {
  spieler1.geschwY = 0;
  spieler2.geschwY = 0;
}


var update = function () {

  // zuerst immer das Spielfeld leeren
  kontext.clearRect(0, 0, hintergrund.width, hintergrund.height);


  for (var arr = 0; arr < objektListe.length; arr++) {
    objektListe[arr].zeichnen();
    objektListe[arr].bewegen();
  }
};

//Gesamte Darstellung des Textes, ermöglicht durch html canvas
function Umgebung() {
  kontext.font = "30px Monaco";
  kontext.fillStyle.runde = "red";
  kontext.fillText(runde, 360, 50);
  kontext.fillText("ROUND:", 230, 50);
  kontext.fillText("The Pong Arena", hintergrund.width / 2 - 100, 375);
  kontext.fillText(punkteSP1, 50, 70);
  kontext.fillText(punkteSP2, 550, 70);

}

// Wiederholungsrate
setInterval(update, 15); // 15 ergibt etwas mehr als 60 FPS (1000 Millisekunden/60 = 16,67)
// Intervall für das Anzeigen des Textes
setInterval(function () {
  Umgebung();
}, 15);

