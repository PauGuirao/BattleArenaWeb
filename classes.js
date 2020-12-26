

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

    constructor(token, name, attack, defense, image){

        this.token = token;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.image = image;

    }

}



