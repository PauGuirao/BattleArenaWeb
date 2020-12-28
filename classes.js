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
        return this;
    }

    moveBackwards(){
        var posibleDir = ['N','E','S','O','N','E'];
        for (let i = 0; i < posibleDir.length; i++) {
            if(posibleDir[i] == this.d){
                this.d = posibleDir[i+2];
            }
        }
        movePlayer(this.token,this.d)
        .then(function (datums) {
        })
        .catch(function (err) {
            console.error('Augh, there was an error!', err.statusText);
        })
        actualizePlayer();
        return this;
    }

    rotateRight(){
        var posibleDir = ['N','E','S','O','N'];
        for (let i = 0; i < posibleDir.length; i++) {
            if(posibleDir[i] == this.d){
                this.d = posibleDir[i+1];
            }
        }
        return this;
    }

    rotateLeft(){
        var posibleDir = ['N','O','S','E','N'];
        for (let i = 0; i < posibleDir.length; i++) {
            if(posibleDir[i] == this.d){
                console.log(this.d);
                this.d = posibleDir[i+1];
                break;
            }
        }
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
    constructor(player){
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

class gameUI{

    constructor(){
    }
  
    drawMap(map){
        let s = '<div class = "grid-container"> ';
        console.log("Player position: "+map.player[0]+","+map.player[1]);
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let x = parseInt(map.player[0]) + i - 4;
                let y = parseInt(map.player[1]) + j - 4;
                console.log("Pos: "+x + "," + y);
                if(x >= 0 && y >= 0){
                    if(map.cuadricula[x][y] == 0){
                        s += '<div class="grid-item"></div>';
                    }
                    if(map.cuadricula[x][y] == 1){
                        s += '<div class="grid-enemy"></div>';
                    }
                    if(map.cuadricula[x][y] == 2){
                        s += '<div class="grid-object"></div>';
                    }
                    if(map.cuadricula[x][y] == 3){
                        s += '<div class="grid-player"></div>';
                    }
                }else{
                    s += '<div class="grid-wall"></div>';
                }
            }
        }
        s += '</div>';
        document.getElementById("body").innerHTML = s;
    }
  

    drawView(player,map){
        switch (player.d) {
            case "N":
                var frontX = map.player[0];
                var frontY = map.player[1]+1;
                var element = map.getPosInfo(frontX,frontY);
                console.log(element);
                this.selectImage(element);
                break;
            case "S":
                var frontX = map.player[0];
                var frontY = map.player[1]-1;
                var element = map.getPosInfo(frontX,frontY);
                console.log(element);
                this.selectImage(element);
                break;
            case "O":
                var frontX = map.player[0]-1;
                var frontY = map.player[1];
                var element = map.getPosInfo(frontX,frontY);
                console.log(element);
                this.selectImage(element);
                break;
            case "E":
                var frontX = map.player[0]+1;
                var frontY = map.player[1];
                var element = map.getPosInfo(frontX,frontY);
                console.log(element);
                this.selectImage(element);
                break;
            default:
                break;
        }
    }
  
  
    selectImage(element){
        switch (element) {
            case 0:
                console.log("CAMI");
                break;
            case 1:
                //dibuixar un enemic
                console.log("ENEMIC");
                break;
            case 2:
                //dibuixar un objecte
                console.log("OBJECTE");
                break;
            default:
                break;
        }
    }

}   