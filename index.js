const express =require('express');
const app = express();
const server = require('http').Server(app)
const io = require("socket.io")(server);
const port = 3000;
const path = require("path");




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/Website.html"));
});
;


app.use(express.static(__dirname + '/public'))



server.listen(port, () => console.log("Server gestartet"));


function Player(socket, PaddleID){


const verbindungen = [null, null];
// Sucht die aktuelle Spieleranzahl
io.on('connection', function(socket){
    
    let Spielernummer = -1;
    for (var i in verbindungen){
        if(verbindungen[i] === null){
            Spielernummer = i;
        }
    }



socket.emit('Du hast die Spielernummer: ', Spielernummer);



if(Spielernummer == -1) return;
verbindungen[Spielernummer] = socket;

socket.broadcast.emit('Es hat sich Spielernummer', playerIndex, 'verbunden');
})

    this.Schlägernummer = Schlägernummer;
    

    if(Schlägernummer = 1){
        this.Schläger = Spielobjekt(spieler1)
    }
    else {
        this.Schläger = Spielobjekt(spieler2)
    }
}
