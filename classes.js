class PlayerPepe{

    constructor(token, name, x, y, d, attack, defense, vp, image, object){

        this.token = token;
        this.name = name;
        this.x = x;
        this.y = y;
        this.d = d;
        this.attack = attack;
        this.defense = defense;
        this.vp = vp;
        this.image = image;
        this.object = object;

    }

    attack(other){

        if(this.attack - other.defense >= 0){
        
            other.vp -= this.attack - other.defense;

            return this.attack - other.defense;
        
        }else{

            return 0;

        }

    }

    moveForward(){

        moveX = this.x + Math.cos(this.d);
        moveY = this.y + Math.sin(this.d);
        
        if(moveX > 40 || moveX < 0){

            this.x = moveX;

        }

        if(moveY > 40 || moveY < 0){

            this.y = moveY;

        }

    }

    moveBackwards(){

        moveX = this.x - Math.cos(this.d);
        moveY = this.y - Math.sin(this.d);
        
        if(moveX > 40 || moveX < 0){

            this.x = moveX;

        }

        if(moveY > 40 || moveY < 0){

            this.y = moveY;

        }

    }

    rotateRight(){

        this.d = this.d - Math.PI/2

    }

    rotateLeft(){

        this.d = this.d + Math.PI/2

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

