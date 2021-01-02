function spawnPlayer(name) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/spawn/b89f987e/'+name);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

function removePlayer(playerToken,playerCode) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/remove/b89f987e/'+playerToken+'/'+playerCode);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

function respawnPlayer(playerToken) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/respawn/b89f987e/'+playerToken);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

function getNearPlayers(playerToken) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/playersobjects/b89f987e/'+playerToken);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

function getMapInfo(playerToken) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/map/b89f987e/'+playerToken);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}


function getPlayerInfo(playerToken) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/player/b89f987e/'+playerToken);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

function movePlayer(playerToken,direction) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/move/b89f987e/'+playerToken+'/'+direction);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}


function attack(playerToken,direction) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://battlearena.danielamo.info/api/attack/b89f987e/'+playerToken+'/'+direction);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

function craft(playerToken,nom,url,attack,defense) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://battlearena.danielamo.info/api/craft/b89f987e/'+playerToken);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(JSON.stringify({ "name": nom, "image": url, "attack": attack, "defense": defense }));
    });
}
function crafter(token,nom,atac,defensa)
{
    var xhr = new XMLHttpRequest();
    var url = "https://www.google.com/search?q=wool+minecraft&rlz=1C1CHBF_esES921ES921&sxsrf=ALeKk02BIu4TCH7f5AD4rH2HJBoLjKqljA:1609416797700&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjtsZbkmPjtAhWiQUEAHfiaARIQ_AUoAXoECAEQAw&biw=1280&bih=578#imgrc=0hLE1pMuBt6CNM";
    xhr.open('POST', 'http://battlearena.danielamo.info/api/craft/b89f987e/'+token,false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "name": nom, "image": url, "attack": atac, "defense": defensa }));
    return xhr.status;
} 

function pickup(playerToken,objectToken) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://battlearena.danielamo.info/api/pickup/b89f987e/'+playerToken+'/'+objectToken);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

