// Classe que serveix per guardar tota la informacio referent al jugador
class Player{
    constructor(token, name, x, y, d, atac, defense, vp, image, object, delToken){
        this.token = token; 
        this.name = name;
        this.x = x;
        this.y = y;
        this.d = d;
        this.atac = atac;
        this.defense  = defense;
        this.vp = vp;
        this.image = image;
        this.object = object;
        this.delToken = delToken;
        this.state = 'Alive';
    }
    attack(){
        if(this.vp > 0){
                attack(this.token,this.d)
                .then(function (datums) {
                    var data = JSON.parse(datums);
                    localStorage.setItem('DamageTotal',data);
                    document.getElementById("atacEnemic").innerHTML = "Li has tret "+data+" de vida!";
                    var audio = new Audio('resources/attack.wav');
                    audio.play();
                    detectKill();
                })
                .catch(function (err) {
                    console.error('Augh, there was an error!', err.statusText);
                }) 
        }        
    }

    moveForward(){
        var checkPos = getFrontPos();
        if(map.getPosInfo(checkPos[0], checkPos[1]) != 100){
            movePlayer(this.token,this.d)
            .then(function (datums) {
                actualizePlayer();
                var audio = new Audio('resources/step.wav');
                audio.play();
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            })
        } 
    }

    moveBackwards(){
        var posibleDir = ['N','E','S','O','N','E'];
        var checkPos = getFrontPos();
        if(map.getPosInfo(checkPos[0], checkPos[1]) != 100){
            for (let i = 0; i < posibleDir.length; i++) {
                if(posibleDir[i] == this.d){
                    movePlayer(this.token, posibleDir[i+2])
                    .then(function (datums) {
                        actualizePlayer();
                    })
                    .catch(function (err) {
                        console.error('Augh, there was an error!', err.statusText);
                    })
                    break;
                }
            }
        }
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
        if(this.vp > 0){
            pickup(this.token,objectToken)
            .then(function (datums) {
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            })
            this.moveForward();
        }
        return this;
    }
    escape(){
        for (let i = 0; i < 2; i++) {
            this.moveForward();
        }
    }

}

// Classe que guarda tota la informacio necessaria d'un item
class Item{
    constructor(token, name, attack, defense, image,x,y){
        this.token = token;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.image = image;
        this.x = x;
        this.y = y;
    }

}

// Classe que guarda tota la informació necessaria d'un mapa
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
    //Retorna que hi ha a la posicio que li pasem
    getPosInfo(x,y){
        if(x < 40 && x >= 0 && y < 40 && y >= 0){
            return this.cuadricula[x][y];
        }else{
            return 100;
        }
    }

}

// Classe que guarda tota la informació d'un enemic
class Enemie{
    constructor(x,y,dir,vp,image){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.vp = vp;
        this.image = image;
    }
}

// Classe que serveix per inicialitzar la partida i fer el control de les tecles
class gameManager{
    
    constructor(){

    }
    
    startGame(nom){
        player = createUser(nom);
        fillUser(player.token);
        map = new Map();
        drawPlayerInfo();
        setInterval(document.onkeydown = this.checkKeys, 2000);
        setInterval(function() {fillMap(); actualitzaBruixola(); drawEnemie();},2000);
        
    }

    checkKeys(e){
        this.checkKeys = e || window.event;
        if(e == undefined){
            
        }else{
            
            switch (e.keyCode) {
                case 38 :
                    player.moveForward();
                    console.log(player);
                    break;
                case 40 :
                    player.moveBackwards();
                    console.log(player);
                    break;
                case 37 :
                    player.rotateLeft();
                    drawView();
                    fillMap();
                    actualitzaBruixola();
                    console.log(player);
                    break;
                case 39 :
                    player.rotateRight();
                    drawView();
                    fillMap();
                    actualitzaBruixola();
                    console.log(player);
                    break;
                default:
                    break;
            }
        }
    }

}

//Variables globals del joc
var player;    // Variable que serveix per fer la gestio del player
var map;       // Variable que serveix per fer la gestio del mapa
var gm;        // Variable que serveix per fer la gestio de les tecles i iniciar el joc

/**
 * Summary: Funcio que serveix per inicialitzar el joc
 * Inicialitzem el gameManager i creem la partida
 * Inicialitzem els audios
 */
function startGame(){

    var player = document.getElementById("player"); 
        if (player.value == ""){
             alert("Player name is missing!"); //Alerta per pantalla en cas que es vulgui començar sense posar el nom del jugador 
             player.focus(); //Ens indicarà on ens hem de col·locar en la pàgina
        } else {
            gm = new gameManager();
            gm.startGame(player.value);
            saveToLocal('PartidesTotals',1);
            var start_Audio = new Audio('resources/startSound.wav');
            start_Audio.play();
            var ambientAudio = new Audio('resources/ambient.mp3');
            ambientAudio.volume = 0.5;
            ambientAudio.play();
            ambientAudio.loop = true;  
            $("#startB").hide();
            $("#reviveB").show();
            $("#deleteB").show();
        }
}

/**
 * Summary: Funcio que fa una peticio a la API de forma sincrona per crear un jugador
 * @param {*} name //Nom del jugador 
 */
function createUser(name){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://battlearena.danielamo.info/api/spawn/b89f987e/'+name,false);
    xhr.send();
    var data = JSON.parse(xhr.responseText);
    var player = new Player('','','','','','','','','','');
    player.token = data.token;
    player.delToken = data.code;
    return player;
}
/**
 * Summary: Funcio que fa una peticio a la API de forma sincrona per omplenar un jugador
 * @param {*} token //Token idetificatiu del jugador 
 */
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

/**
 * Summary: Funcio que crida a la API de froma asincrona per eliminarlo 
 */
function deleteUser(){
    removePlayer(player.token,player.delToken)
    .then(function (datums) {

        console.log("Ey, he esborrat el jugador");
        location.reload();
        
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    })
}

function respawnUser(){
    respawnPlayer(player.token)
    .then(function (datums) {
        actualizePlayer();
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    })
}

/**
 * Summary: Funcio que actualitza el jugador de forma asincrona 
 */
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

/**
 * Summary: Funcio que rep les dades de l'API i omplena el jugador amb elles
 * @param {*} data 
 */
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
    if(player.vp <= 0){
        //Detectem si es el primer cop que esta mort
        if(player.state == 'Alive'){
            saveToLocal('MortsTotals',1);
        }
        player.state = 'Dead';
    }else{
        player.state = 'Alive';
    }
    drawPlayerInfo();
}

/**
 * Summary: Funcio que omplena el mapa de forma asincrona amb la informacio procedent de la API
 */
function fillMap(){
    // Reset del mapa
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
            map.cuadricula[i][j] = 0;
        }
    }
    //Crida a la API per omplear el mapa
    getMapInfo(player.token)
    .then(function (datums) {
        var data = JSON.parse(datums);
        // Omplenem l'array d'enemics de la classe map 
        for (let i = 0; i < data.enemies.length; i++) {
          var enemie = new Enemie(data.enemies[i].x,data.enemies[i].y,data.enemies[i].direction,0,0);
          map.enemies.push(enemie);
        }
        //RETOCAR(No hem probat mai un objecte)
        // Omplenem l'array d'objectes de la classe map
        for (let i = 0; i < data.objects.length; i++) {
            var object = new Item('','','','','',data.objects[i].x,data.objects[i].y);
            map.objects.push(object);
        }
        
        //Segons la direccio d'un enemic posem un valor a cada casella
        for (let i = 0; i < map.enemies.length; i++) {
            let rotation = 0;
            let posibleDir = ['O','N','E','S'];
            for (let p = 0; p < posibleDir.length; p++) {
                if(posibleDir[p] == map.enemies[p].dir){
                    rotation = p;
                }
            }
            map.cuadricula[map.enemies[i].x][map.enemies[i].y] = 4 + rotation;
        }
        
        //Si es un objecte es un 2
        for (let i = 0; i < map.objects.length; i++) {
            map.cuadricula[map.objects[i].x][map.objects[i].y] = 2;
        }
  
        map.player[0] = player.x;
        map.player[1] = player.y;
        map.cuadricula[map.player[0]][map.player[1]] = 3;

        //Un cop tenim la informacio necessaria dibuixem el mapa i dibuixem la vista
        drawMap();
        drawView();
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    })
    
}

/**
 * Summary: Dibuixa per pantalla la informacio del jugadr
 */
function drawPlayerInfo(){
    document.getElementById("name").innerHTML = ""+player.name;
    document.getElementById("vida").innerHTML = ""+player.vp;
    document.getElementById("attack").innerHTML = ""+player.atac;
    document.getElementById("defense").innerHTML = ""+player.defense;
    document.getElementById("state").innerHTML = ""+player.state;

    document.getElementById("pt").innerHTML = ""+localStorage.getItem('PartidesTotals');
    document.getElementById("dt").innerHTML = ""+localStorage.getItem('DamageTotal');
    document.getElementById("kt").innerHTML = ""+localStorage.getItem('KillsTotals');
    document.getElementById("mt").innerHTML = ""+localStorage.getItem('MortsTotals');
}

/**
 * Summary: Dibuixa el mapa per pantalla
 */
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
            if(map.cuadricula[i][j] == 2){
                context.beginPath();
                context.lineWidth = "1";
                context.strokeStyle = "yellow";
                context.rect(i*8, j*8, 8, 8);
                context.stroke();
            }
            if(map.cuadricula[i][j] == 3){
                console.log("player");
                let rotation = 0;
                let posibleDir = ['O','N','E','S'];
                for (let p = 0; p < posibleDir.length; p++) {
                    if(posibleDir[p] == player.d){
                        rotation = p;
                    }
                }
                
                context.beginPath();
                if (rotation == 0){
                    context.moveTo(i * 8 + 1, j * 8 + 4);
                    context.lineTo(i * 8 + 7, j * 8 + 1);
                    context.lineTo(i * 8 + 7, j * 8 + 7);
                }

                if (rotation == 1){
                    context.moveTo(i * 8 + 4, j * 8 + 1);
                    context.lineTo(i * 8 + 7, j * 8 + 7);
                    context.lineTo(i * 8 + 1, j * 8 + 7);
                }

                if (rotation == 2){
                    context.moveTo(i * 8 + 7, j * 8 + 4);
                    context.lineTo(i * 8 + 1, j * 8 + 1);
                    context.lineTo(i * 8 + 1, j * 8 + 7);
                }

                if (rotation == 3){
                    context.moveTo(i * 8 + 4, j * 8 + 7);
                    context.lineTo(i * 8 + 7, j * 8 + 1);
                    context.lineTo(i * 8 + 1, j * 8 + 1);
                }

                context.closePath();
                context.lineWidth = 0;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = "#7CFC00";
                context.fill();
            }

            if(map.cuadricula[i][j] == 4){
                //console.log("enemic");
                context.beginPath();
                context.moveTo(i * 8 + 1, j * 8 + 4);
                context.lineTo(i * 8 + 7, j * 8 + 1);
                context.lineTo(i * 8 + 7, j * 8 + 7);
                context.closePath();
                context.lineWidth = 0;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = "#FF0000";
                context.fill();
            }

            if(map.cuadricula[i][j] == 5){
                //console.log("enemic");
                context.beginPath();
                context.moveTo(i * 8 + 4, j * 8 + 1);
                context.lineTo(i * 8 + 7, j * 8 + 7);
                context.lineTo(i * 8 + 1, j * 8 + 7);
                context.closePath();
                context.lineWidth = 0;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = "#FF0000";
                context.fill();
            }

            if(map.cuadricula[i][j] == 6){
                //console.log("enemic");
                context.beginPath();
                context.moveTo(i * 8 + 7, j * 8 + 4);
                context.lineTo(i * 8 + 1, j * 8 + 1);
                context.lineTo(i * 8 + 1, j * 8 + 7);
                context.closePath();
                context.lineWidth = 0;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = "#FF0000";
                context.fill();
            }

            if(map.cuadricula[i][j] == 7){
                //console.log("enemic");
                context.beginPath();
                context.moveTo(i * 8 + 4, j * 8 + 7);
                context.lineTo(i * 8 + 7, j * 8 + 1);
                context.lineTo(i * 8 + 1, j * 8 + 1);
                context.closePath();
                context.lineWidth = 0;
                context.strokeStyle = '#666666';
                context.stroke();
                context.fillStyle = "#FF0000";
                context.fill();
            }
        }
    }
}

/** 
 * Summary: Funcio que serveix per dibuixar un triangle al mapa per referenciar el enemic
*/
function drawTriangle (color, direction, x, y, stroke){

    context.beginPath();
    context.moveTo(x * 8 + 1, y * 8 + 4);
    context.lineTo(x * 8 + 7, y * 8 + 1);
    context.lineTo(x * 8 + 7, y * 8 + 7);
    context.closePath();
    context.lineWidth = 0;
    context.strokeStyle = stroke;
    context.stroke();
    context.fillStyle = color;
    context.fill();

}
/**
 * Summary: Funcio que serveix per dibuixar la vista del jugador segons la seva direccio
 */
function drawView(){
    switch (player.d) {
        case "N":
            console.log("dibuixare el nord");
            var frontX = map.player[0];
            var frontY = map.player[1];
            frontY++;
            var element = map.getPosInfo(frontX,frontY);
            selectImage(element);
            break;
        case "S":
            var frontX = map.player[0];
            var frontY = map.player[1]-1;
            console.log(frontX+" i "+frontY);
            var element = map.getPosInfo(frontX,frontY);
            console.log(element);
            selectImage(element);
            break;
        case "O":
            var frontX = map.player[0]-1;
            var frontY = map.player[1];
            var element = map.getPosInfo(frontX,frontY);
            console.log(element);
            selectImage(element);
            break;
        case "E":
            var frontX = map.player[0];
            frontX++;
            var frontY = map.player[1];
            var element = map.getPosInfo(frontX,frontY);
            selectImage(element);
            break;
        default:
            console.log("Aqui hi ha un problema");
            break;
    }
}
/**
 * Summary: Funcio que serveix per seleccionar la imatga a mostrar segons l'element que tens devant
 * @param {*} element 
 */
function selectImage(element){
    var url = '';
    switch (element) {
        case 0:
            //dibuixa cami
            url = 'cami.jpeg';
            break;
        case 2:
            //dibuixar un objecte
            url = 'objecte.jpeg';
            break;
        case 100:
            //dibuixa paret
            url = 'paret.jpeg';
            break;
        default:
            //en qualsevol altre cas dibuixa enemic
            url = 'enemic.jpeg';
            break;
    }

    drawVisor(pintaVisor, url);
}
/**
 * Summary: Funcio que pinta la imatge al canvas de visor
 * @param {*} url //Nom de la imatge per poder trobarle a la carpeta resources
 */
function pintaVisor(url){
    var canvas = document.getElementById('navigation');
    var context = canvas.getContext('2d');
    var base_image = new Image();
    base_image.src = "resources/"+url;
    base_image.onload = function () {
        context.drawImage(this, 0, 0);
    }
}
/**
 * Summary: Funcio que serveix per actualitzar la bruixola en cas de que el player canvii de direccio
 */
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
        context.drawImage(this, 0, 0,150,150);
    }
}
/**
 * Funcio que serveix per pintar per pantalla la informacio del enemic que tens devant a la consola d'informacio
 */
function drawEnemie(){
    getNearPlayers(player.token)
    .then(function (datums) {
        var data = JSON.parse(datums);
        var enemies = data.enemies;
        var objects = data.objects;
        var pos = getFrontPos();
        
        for (let i = 0; i < enemies.length; i++) {
            if(enemies[i].x == pos[0] && enemies[i].y == pos[1]){
                console.log(enemies[i]);
                document.getElementById("showEnemy").src="resources/my_character-"+enemies[i].image+".png";
                document.getElementById("vidaEnemic").innerHTML = "Ey! tens un enemic devant amb "+enemies[i].vitalpoints+" de vida";
                break;
            }
        }
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    })  
}
/**
 * Summary: Funcio que detecta si tens un objecte devant
 */
function detectObject(){
    getNearPlayers(player.token)
    .then(function (datums) {
        var data = JSON.parse(datums);
        var objects = data.objects;
        var pos = getFrontPos();
        
        for (let i = 0; i < objects.length; i++) {
            if(objects[i].x == pos[0] && objects[i].y == pos[1]){
                return true;
            }
        }
        return false;
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    }) 
}
/**
 * Summary: Funcio que serveix per detectar si has matat a un enemic
 */
function detectKill(){
    getNearPlayers(player.token)
    .then(function (datums) {
        var data = JSON.parse(datums);
        var enemies = data.enemies;
        var pos = getFrontPos();
        
        for (let i = 0; i < enemies.length; i++) {
            if(enemies[i].x == pos[0] && enemies[i].y == pos[1]){
                
                if(enemies[i].vitalpoints <= 0){
                    localStorage.setItem('KillsTotals',1);
                    console.log('Has matat');
                    break;
                }
                
            }
        }
    })
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
    }) 
}
/**
 * Summary: Funcio que retorna la posicio que el jugador te devant segons la seva direccio
 */
function getFrontPos(){
    var pos = [];
    switch (player.d) {
        case 'N':
            pos[0] = parseInt(player.x);
            pos[1] = parseInt(player.y);
            pos[1]++;
            break;
        case 'S':
            pos[0] = parseInt(player.x);
            pos[1] = player.y-1;
            break;
        case 'O':
            pos[0] = player.x-1;
            pos[1] = parseInt(player.y);
            break;
        case 'E':
            pos[0] = parseInt(player.x);
            pos[0]++;
            pos[1] = parseInt(player.y);
            break;
        default:
            break;
    }
    return pos;
}

function drawVisor(callback, url){

    callback(url);

}

/**
 * Summary: Funcio que serveix per guardar en local informacio del jugador
 * @param {*} key 
 * @param {*} item 
 */
function saveToLocal(key,item){
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key,item);
    }else{
        var value = localStorage.getItem(key);
        var num = parseInt(value);
        num += item;
        localStorage.setItem(key,num);
    }
    console.log(value);
}
/**
 * Summary: Funcio que actualitza el joc de forma periodica
 */
/**
function actualitzaInfo(){
    fillMap();
    actualitzaBruixola();
    drawEnemie();
    //actualizePlayer();
}
*/

/**
 * Summary: Funcio que amaga elements el iniciar el joc
 */
window.onload = function() {
    $("#startB").show();
    $("#reviveB").hide();
    $("#deleteB").hide();
};

