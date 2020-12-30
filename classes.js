class Player{
    constructor(token, name, x, y, d, atac, defense, vp, image, object){
        this.token = token;
        this.name = name;
        this.x = x;
        this.y = y;
        this.d = d;
        this.atac = atac;
        this.defense = defense;
        this.vp = vp;
        this.image = image;
        this.object = object;
    }

    attack(){
        attack(this.token,this.d)
        .then(function (datums) {
            var data = JSON.parse(datums);
            console.log(data);
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        })        
    }

    moveForward(){
        movePlayer(this.token,this.d)
        .then(function (datums) {
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        })
        actualizePlayer();
    }

    moveBackwards(){
        var posibleDir = ['N','E','S','O','N','E'];
        for (let i = 0; i < posibleDir.length; i++) {
            if(posibleDir[i] == this.d){
                this.d = posibleDir[i+2];
            }
        }
        this.moveForward();
    }

    rotateRight(){
        var posibleDir = ['N','E','S','O','N'];
        for (let i = 0; i < posibleDir.length; i++) {
            if(posibleDir[i] == this.d){
                this.d = posibleDir[i+1];
                break;
            }
        }
    }

    rotateLeft(){
        var posibleDir = ['N','O','S','E','N'];
        for (let i = 0; i < posibleDir.length; i++) {
            if(posibleDir[i] == this.d){
                this.d = posibleDir[i+1];
                break;
            }
        }
    }
    pickup(){
        pickup(this.token,objectToken)
        .then(function (datums) {
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        })
        this.moveForward();
        return this;
    }

}

class Item{

    constructor(token, name, attack, defense, imagex,y){

        this.token = token;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.image = image;
        this.x = x;
        this.y = y;

    }

}

class Map{
    constructor(){
        var cuadricula = new Array(40);
        for (var i = 0; i < cuadricula.length; i++) { 
            cuadricula[i] = new Array(40); 
        } 
        for (var i = 0; i < 40; i++) {
            for (var j = 0; j < 40; j++) { 
                cuadricula[i][j] = 0; 
            } 
        }
        this.cuadricula = cuadricula;
        this.enemies = [];
        this.objects = [];
        this.player = [];
        this.player[0] = 0;
        this.player[1] = 0;
    }
    // 1 --> enemic, 2--> objecte
    actualitzaMapa(){
        actualizeMapa();
    }
    //Retorna que hi ha a la posicio que li pasem
    getPosInfo(x,y){
        return this.cuadricula[x][y];
    }

}

class Enemie{
    constructor(x,y,dir,vp,image){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.vp = vp;
        this.image = image;
    }
}

//VARIABLES GLOBALS
var player;
var map;

class gameManager{
    
    constructor(){

    }
    
    startGame(nom){
        player = createUser(nom);
        fillUser(player.token);
        map = new Map();
        drawPlayerInfo();
        setInterval(document.onkeydown = this.checkKeys, 6);
        setInterval(actualitzaInfo,2000);
    }

    checkKeys(e){
        this.checkKeys = e || window.event;
        if(e == undefined){
            
        }else{
            
            switch (e.keyCode) {
                case 87:
                    player.moveForward();
                    console.log(player);
                    break;
                case 83:
                    player.moveBackwards();
                    console.log(player);
                    break;
                case 65:
                    player.rotateLeft();
                    drawView();
                    console.log(player);
                    break;
                case 68:
                    player.rotateRight();
                    drawView();
                    console.log(player);
                    break;
                default:
                    break;
            }
        }
    }

}


function actualizePlayer(){
    getPlayerInfo(player.token)
    .then(function (datums) {
      var data = JSON.parse(datums);
      setPlayerInfo(data);
    })
    .catch(function (err) {
      console.error('Augh, there was an error!', err.statusText);
    })
}

function setPlayerInfo(data){
    player.name = data.name;
    player.x = data.x;
    player.y = data.y;
    player.d = data.direction;
    player.atac = data.attack;
    player.defense = data.defense;
    player.vp = data.vitalpoints;
    player.image = data.image;
    player.object = data.object;
}

function creaJugador(playerName){
    var player = new Player('','','','','','','','','','');
    spawnPlayer(playerName)
    .then(function (datums) {
      var data = JSON.parse(datums);
      player.token = data.token;
      getPlayerInfo(player.token)
      .then(function (datums) {
        var data = JSON.parse(datums);
        player.name = data.name;
        player.x = data.x;
        player.y = data.y;
        player.d = data.direction;
        player.atac = data.attack;
        player.defense = data.defense;
        player.vp = data.vitalpoints;
        player.image = data.image;
        player.object = data.object;
      })
      .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
      })
    })
    .catch(function (err) {
      console.error('Augh, there was an error!', err.statusText);
    })
    return player;
}

function startGame(){
    
}

//Fa una peticio a la API per crear un usuari
function createUser(name){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://battlearena.danielamo.info/api/spawn/b89f987e/'+name,false);
    xhr.send();
    var data = JSON.parse(xhr.responseText);
    var player = new Player('','','','','','','','','','');
    player.token = data.token;
    return player;
}
//Fa una peticio a la API per omplenar un usuari
function fillUser(token){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://battlearena.danielamo.info/api/player/b89f987e/'+token,false);
    xhr.send();
    var data = JSON.parse(xhr.responseText);
    player.name = data.name;
    player.x = data.x;
    player.y = data.y;
    player.d = data.direction;
    player.atac = data.attack;
    player.defense = data.defense;
    player.vp = data.vitalpoints;
    player.image = data.image;
    player.object = data.object;
}
//Fa una peticio a la API per omplenar el mapa
function fillMap(){
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
            map.cuadricula[i][j] = 0;
        }
    }
    getMapInfo(player.token)
    .then(function (datums) {
        var data = JSON.parse(datums);
        for (let i = 0; i < data.enemies.length; i++) {
          var enemie = new Enemie(data.enemies[i].x,data.enemies[i].y,data.enemies[i].direction,0,0);
          map.enemies.push(enemie);
        }
        for (let i = 0; i < map.enemies.length; i++) {
          map.cuadricula[map.enemies[i].x][map.enemies[i].y] = 1;
        }
  
        for (let i = 0; i < map.objects.length; i++) {
          map.cuadricula[map.objects[i].x][map.objects[i].y] = 2;
        }
  
        map.player[0] = player.x;
        map.player[1] = player.y;
        map.cuadricula[map.player[0]][map.player[1]] = 3;
        drawMap();
        drawView();
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    })
    
}
//Draw player info
function drawPlayerInfo(){
    document.getElementById("name").innerHTML = "Name "+player.name;
    document.getElementById("vida").innerHTML = "Vida "+player.vp;
    document.getElementById("attack").innerHTML = "Attack "+player.atac;
    document.getElementById("defense").innerHTML = "Defense "+player.defense;
}
//Dibuixa el mapa a la interficie grafica
function drawMap(){
    var canvas = document.getElementById('minimap');
    var context = canvas.getContext('2d');
    context.fillStyle = "#DEB887";
    context.fillRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < 40; i++){
        for(let j = 0; j < 40; j++){
            if(map.cuadricula[i][j] == 0){
                context.beginPath();
                context.lineWidth = "1";
                context.strokeStyle = "brown";
                context.rect(i*8, j*8, 8, 8);
                context.stroke();
            }
            if(map.cuadricula[i][j] == 1){
                //console.log("enemic");
                context.fillStyle = "#FF0000";
                context.fillRect(i*8,j*8, 8, 8);
            }
            if(map.cuadricula[i][j] == 3){
                console.log("player");
                context.fillStyle = "#7CFC00";
                context.fillRect(i*8,j*8, 8, 8);
            }
        }
    }
}
//Dibuixa el visor a la interficie grafica
function drawView(){
    switch (player.d) {
        case "N":
            var frontX = map.player[0];
            var frontY = map.player[1]+1;
            var element = map.getPosInfo(frontX,frontY);
            selectImage(element);
            break;
        case "S":
            var frontX = map.player[0];
            var frontY = map.player[1]-1;
            var element = map.getPosInfo(frontX,frontY);
            selectImage(element);
            break;
        case "O":
            var frontX = map.player[0]-1;
            var frontY = map.player[1];
            var element = map.getPosInfo(frontX,frontY);
            selectImage(element);
            break;
        case "E":
            var frontX = map.player[0]+1;
            var frontY = map.player[1];
            var element = map.getPosInfo(frontX,frontY);
            selectImage(element);
            break;
        default:
            console.log("Aqui hi ha un problema");
            break;
    }
}
//Seleciona la imatge a mostrar
function selectImage(element){
    switch (element) {
        case 0:
            pintaVisor('cami.jpeg');
            break;
        case 1:
            pintaVisor('enemic.jpeg');
            break;
        case 2:
            //dibuixar un objecte
            pintaVisor('objecte.jpeg');
            break;
        default: 
            break;
    }
}
//Funcio per pintar el visor
function pintaVisor(url){
    var canvas = document.getElementById('navigation');
    var context = canvas.getContext('2d');
    var base_image = new Image();
    base_image.src = "resources/"+url;
    base_image.onload = function () {
        context.drawImage(this, 0, 0);
    }
}
//actualitza la bruixola
function actualitzaBruixola(){
    var canvas = document.getElementById('compass');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var base_image = new Image();
    
    switch (player.d) {
        case 'N':
            base_image.src = "resources/N.png";
            break;
        case 'S':
            base_image.src = "resources/S.png";
            break;
        case 'E':
            base_image.src = "resources/E.png";
            break;
        case 'O':
            base_image.src = "resources/O.png";
            break;
        default:
            break;
    }
    base_image.onload = function () {
        context.drawImage(this, 0, 0,300,300);
    }
}
function drawEnemie(){
    getNearPlayers(player.token)
    .then(function (datums) {
        var data = JSON.parse(datums);
        var enemies = data.enemies;
        var pos = getFrontPos(); 
        for (let i = 0; i < enemies.length; i++) {
            if(enemies[i].x == pos[0] && enemies[i].y == pos[1]){
                console.log(enemies[i]);
                document.getElementById("showEnemy").src="resources/my_character-"+enemies[i].image+".png";
                document.getElementById("vidaEnemic").innerHTML = "Enemic amb "+enemies[i].vitalpoints+" de vida";
                break;
            }
        }
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    })  
}
function getFrontPos(){
    var pos = [];
    switch (player.d) {
        case 'N':
            pos[0] = player.x;
            pos[1] = player.y+1;
            break;
        case 'S':
            pos[0] = player.x;
            pos[1] = player.y-1;
            break;
        case 'O':
            pos[0] = player.x-1;
            pos[1] = player.y;
            break;
        case 'E':
            pos[0] = player.x+1;
            pos[1] = player.y;
            break;
        default:
            break;
    }
    return pos;
}

function actualitzaInfo(){
    fillMap();
    actualitzaBruixola();
    drawEnemie();
}

