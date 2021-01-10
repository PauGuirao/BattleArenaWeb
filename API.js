/** Summary: Crea una instància del jugador a un punt aleatori del mapa a partir d'un nom escollit pel jugador, utilitzant una crida de l'API.
 * @param {*} name: nom que el jugador desitja.
 */

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

/** Summary: Elimina el jugador actual a partir d'una crida de l'API.
 * @param {*} playerToken: ID del jugador.
 * @param {*} playerCode: Codi de seguretat del jugador.
 */

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

/** Summary: Reviu al jugador actual, movent-lo a una posicio aleatoria, tot utilitzant l'API.
 * @param {*} playerToken: ID del jugador.
 */

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

/** Summary: Retorna els jugadors i els objectes que es troben al costat del jugador, juntament amb tota la seva informacio disponible desde l'API.
 * @param {*} playerToken: ID del jugador.
 */

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

/** Summary: Retorna la posicio de tots els enemics i objectes que hi ha el mapa a partir de la informacio disponible a l'API.
 * @param {*} playerToken: ID del jugador.
 */

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

/** Summary: Permet obtenir la informacio disponible a l'API del jugador actiu.
 * @param {*} playerToken: ID del jugador.
 */

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

/** Summary: Mou el jugador i actualitza la seva posició a l'API.
 * @param {*} playerToken: ID del jugador.
 * @param {*} direction: Direccio en la que es vol moure el jugador. Pot ser N, S, E i O.
 */

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

/** Summary: Ataca a un enemic que es troba davant del jugador.
 * @param {*} playerToken: ID del jugador.
 * @param {*} direction: Direccio en la que vol atacar el jugador. Pot ser N, S, E i O.
 */

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

/** Summary: Penja a l'API un nou objecte.
 * @param {*} playerToken: ID del jugador.
 * @param {*} nom: Nom de l'objecte.
 * @param {*} url: URL de la imatge de l'objecte.
 * @param {*} atac: Atac de l'objecte a crear.
 * @param {*} defensa: Defense de l'objecte a crear.
 */

function craft(playerToken,nom,url,attack,defense) {
    postData('http://battlearena.danielamo.info/api/craft/b89f987e/'+playerToken, { name: 'Llana', image: 'https://minecraft.gamepedia.com/File:White_Wool_JE2_BE2.png', attack: 10, defense: 10 })
    .then(data => {
      console.log('Hola');
    });
}

/** Summary: Funcio asyncrona que permet penjar informacio a l'API a partir d'un fetch.
 * @param {*} url: URL a on es vol penjar la informacio.
 * @param {*} data: Dades que es volen penjar.
 */

async function postData(url = '', data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  //return response.json(); // parses JSON response into native JavaScript objects
}

/** Summary: Recull un objecte que es trobi al terra i deixa anar el vell si en tenia un equipat.
 * @param {*} playerToken: ID del jugador.
 * @param {*} objectToken: ID de l'objecte a recollir.
 */

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
